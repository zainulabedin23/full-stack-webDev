$(function () {
   

    var paint = false;// paintingg erasing or not
    var paint_erase = "paint";// painting or erasing
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");// get canbas and context
    var container = $("#container");// get the canvas container
    // mouse positon
    var mouse = { x: 0, y: 0 };


    // onload load saved work from localstorage
if(    localStorage.getItem("imgcanvas")!=null){
    var img=new Image();
    img.onload=function(){
        ctx.drawImage(img,0,0);
    }
    img.src=localStorage.getItem("imgcanvas");
};
    // set drawing parameter(linewidth,linejoin,linecap)
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.linecap = "round";


    // click inside container
    container.mousedown(function (e) {
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y);
    });
    // move the mousw while holding mouse key
    container.mousemove(function (e) {

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if (paint == true) {
            if (paint_erase == "paint") {
                //get color input   
                ctx.strokeStyle = $("#paintColor").val();
            } else {
                //white color 
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    })
    // mouse up->we are not painting erasing anymore
    container.mouseup(function () {
        paint = false;

    });
    // if we leav the container we are not paintingerasing anymose
    container.mouseleave(function () {
        paint = false;

    });
    // click on reset button
    $("#reset").click(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    paint_erase="paint";
    $("#erase").removeClass("eraseMode");
    })
    // click on save button
  $("#save").click(function(){
    if(typeof(localStorage)!=null){
        localStorage.setItem("imgcanvas",canvas.toDataURL());
        window.alert(localStorage.getItem("imgcanvas"));
            }else{
                window.alert("your browser does not support local storage")
            }
  });
    // click on the erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";   
        }else{
            paint_erase = "paint";   
        }
        $(this).toggleClass("eraseMode");
    });
    // change color input
    // change linewidth using slider
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function (event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth=ui.value;
        }
    });

})
// declare variables

