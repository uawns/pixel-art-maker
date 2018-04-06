// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()



jQuery(document).ready(function() {
      //elements 

    const pixelCanvas = $("#pixelCanvas");
    const colorPicker = $("#colorPicker");
    const hexBox =$("#input-color-hexvalue");
    const hexR = $("#range-r");
    const hexG = $("#range-g");
    const hexB = $("#range-b");
    const rangeR = $("#slide-range-r");
    const rangeG = $("#slide-range-g");
    const rangeB = $("#slide-range-b");
    const r= "r";
    const g= "g";
    const b= "b";


    //values
    const defaultCanvasColor = "#ffffff";
    const defaultBrushColor = "#000000";
    hexBox.val(defaultBrushColor);
    let color = colorPicker.val();
    let mouseDown;


// Listen for color
let listenRgbInputs = function () {
    let red = hexR.val();
    let green = hexG.val();
    let blue = hexB.val();
    if(red && green && blue ){
    color = rgb2hex(`rgb(${red},${green},${blue}`);
    reflectColorChange(color);
    }
};

let listenRgbRange = function () {
    let red = rangeR.val();
    let green = rangeG.val();
    let blue = rangeB.val();
    if (red && green && blue) {
        color = rgb2hex(`rgb(${red},${green},${blue}`);
        reflectColorChange(color);
    }
};


colorPicker.on("change",function(){
    color=colorPicker.val();
    reflectColorChange(color);
});

hexBox.on("change input",function(){
    color=hexBox.val();
    reflectColorChange(color);
});

hexR.on("change input",listenRgbInputs);
hexG.on("change input", listenRgbInputs);
hexB.on("change input", listenRgbInputs);
rangeR.on("change input", listenRgbRange);
rangeG.on("change input", listenRgbRange);
rangeB.on("change input", listenRgbRange);

//color picker changes reflects
function reflectColorChange(color){
colorPicker.val(color);
hexBox.val(color);
hexR.val(getRgb(color, r));
hexG.val(getRgb(color, g));
hexB.val(getRgb(color, b));
rangeR.val(getRgb(color, r));
rangeG.val(getRgb(color, g));
rangeB.val(getRgb(color, b));
}


//get individual hex val

function getRgb(hex,key){
    hex=hex.slice(1);
    let bigint =parseInt(hex,16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
if(key=='r'){
    return r
}else if(key == 'g'){
return g
}else if(key == 'b') {
return b
}

}

//create a grid 
    function makeGrid(rw, col) {

       pixelCanvas.empty();
        //	$("#pixelCanvas").prepend(rw);
        for (var i = 1; i <= rw; i++) {

            var row = "<tr id='r" + i + "' class='row'>";
            pixelCanvas.append(row);
            for (var y = 1; y <= col; y++) {
                var cell = "<td id='r" + i + "c" + y + "' class='cell'>";
                $("tr#r" + i).append(cell);
            }
        }

    }
//using default size to make grid
$(".gridSize-btn").on("click",function (e) {
    const gridSize = $(this).children("input").val();
    makeGrid(gridSize,gridSize);
});

    //generate the canvas with custom size
    $("#inputHeight, #inputWidth").on("input", function(e) {
        const rw = $("#inputHeight").val();
        const col = $("#inputWidth").val();
        color = $("#colorPicker").val();

        makeGrid(rw, col);
        console.log("row: " + rw + " col: " + col + " Color: " + color);
        e.preventDefault();
    }); //end of sizePicker


    //convert rgba to hex
//from http://wowmotty.blogspot.com/2017/05/convert-rgba-output-to-hex-color.html
function rgb2hex(orig) {
  let a, isPercent,
    rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = (rgb && rgb[4] || "").trim(),
    hex = rgb ? "#" +
    (rgb[1] | 1 << 8).toString(16).slice(1) +
    (rgb[2] | 1 << 8).toString(16).slice(1) +
    (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
  if (alpha !== "") {
    isPercent = alpha.indexOf("%") > -1;
    a = parseFloat(alpha);
    if (!isPercent && a >= 0 && a <= 1) {
      a = Math.round(255 * a);
    } else if (isPercent && a >= 0 && a <= 100) {
      a = Math.round(255 * a / 100)
    } else {
      a = "";
    }
  }
  if (a) {
    hex += (a | 1 << 8).toString(16).slice(1);
  }
  return hex;
}
// paint with drag 

$(document).mousedown(function(){
 mouseDown =true;
});

$(document).mouseup(function(){
    mouseDown =false;
});

pixelCanvas.on("mouseover",".cell",function(){
if(mouseDown){
   
     let id = $(this).attr("id");
    colorCell(id,color);
} 
});
//to color cell
function colorCell(id, color) {
    $("#" + id).css("background", color);

}
//reset color to default
function resetColor(id) {
    $("#" + id).css("background", "#fff");
};
// detect click on canvas
    pixelCanvas.on("click", ".cell", function() {
        let id = $(this).attr("id");
        let bkColor= rgb2hex($(this).css("background-color"));
        console.log(color+" = "+ bkColor);
        if(bkColor==color){
            resetColor(id);
        }else{
               colorCell(id, color); 
        }
      
    
    });

//save image

$('#saveImage').click(function(){
  html2canvas(pixelCanvas,
  {
    onrendered: function (canvas) {
       const a = document.createElement('a');
      a.href = canvas.toDataURL();
      a.download = 'pixelart.png';
      a.click();
    }
  });
});





}); //end of ready();