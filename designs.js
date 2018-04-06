// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()



jQuery(document).ready(function() {
      //elements 

    const pixelCanvas = $("#pixelCanvas");
    const colorPicker = $("#colorPicker");
    const defaultColor = "#ffffff";
    let color = colorPicker.val();
    let mouseDown;

colorPicker.on("change",function(){
    color=colorPicker.val();
});





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
  var a, isPercent,
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