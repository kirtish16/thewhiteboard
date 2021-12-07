const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const eraserEl = document.getElementById("eraser");
const canvasHeightEl = document.getElementById("canvasHeight");
const canvasWidthEl = document.getElementById("canvasWidth");

const ctx = canvas.getContext("2d");

let size = 10 ;
let isPressed = false ;
let isEraser = false;
// colorEl.value = "#000";

let color = colorEl.value;
let x , y ; 


canvas.addEventListener("mousedown",(e) =>{
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});

document.addEventListener("mouseup",(e) =>{
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove",(e) => {
    if(isPressed)
    {
        if(isEraser){
            color = "white";
            const x2 = e.offsetX;
            const y2 = e.offsetY;
            drawCircle(x2,y2);
            drawLine(x,y,x2,y2);
            x = x2 ; y = y2 ; 
        }
        else{
            color = colorEl.value;
            const x2 = e.offsetX;
            const y2 = e.offsetY;
            drawCircle(x2,y2);
            drawLine(x,y,x2,y2);
            x = x2 ; y = y2 ; 
        }
    }
    
});

function drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(x,y,size,0,Math.PI * 2 );
    ctx.fillStyle = color ;
    ctx.fill();
}

function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = color; 
    ctx.lineWidth = size * 2 ; 
    ctx.stroke();
}

function updateSizeOnScreen(){
    // sizeEl.innerText = size;
    sizeEl.value= size;
}

increaseBtn.addEventListener("click",()=>{
    size += 1 ;
    if(size > 50){
        size = 50 ; 
    }
    updateSizeOnScreen();
});

decreaseBtn.addEventListener("click",()=>{
    size -= 1 ;
    if(size < 1){
        size = 1 ; 
    }
    updateSizeOnScreen();
});

colorEl.addEventListener("click",(e) => {
(color = e.target.value);
isEraser = false;
});

clearEl.addEventListener("click",()=> 
    ctx.clearRect(0,0,canvas.width,canvas.height)
);

sizeEl.addEventListener("change",()=>
    size = sizeEl.value
);

eraserEl.addEventListener("click",()=>{
    isEraser = !isEraser
    if(isEraser)
        eraserEl.style.backgroundColor = "grey";
    else 
        eraserEl.style.backgroundColor = "white";

});

canvasHeightEl.addEventListener("change",()=>{
    const canvasSize = canvasHeightEl.value;
    var canvHeight = 400 ;
    if(canvasSize == "screen")
    {
        canvHeight = screen.height;
    }
    else 
    {
        canvHeight = canvasSize;
    }

    canvas.height = canvHeight;

});

canvasWidthEl.addEventListener("change",()=>{
    const canvasSize = canvasWidthEl.value;
    var canvasWidth = 400 ;
    if(canvasSize == "screen")
    {
        canvasWidth = screen.width;
    }
    else 
    {
        canvasWidth = canvasSize;
    }

    canvas.width = canvasWidth;

});