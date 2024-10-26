import { useState, useEffect } from "react"

// cd my-react-app && npm install && npm run dev
function Canvas(props){
  const id = props.ID

  // current array and update array(picture)
  const ratio = 250
  const [canvasWidth, setCanvasWidth] = useState(ratio)
  const [canvasHeight, setCanvasHeight] = useState(ratio)

  const [canvasGridWidth, setCanvasGridWidth] = useState(ratio/10)
  const [canvasGridHeight, setCanvasGridHeight] = useState(ratio/10)
  

  const [canvasLoad, setCanvasLoad] = useState(false)
  const [currentImage, setCurrentImage] = useState(generateGridArray())
  const [currentPixelScale, setCurrentPixelScale] = useState(10)
  const [colorSelective, setColorSelective] = useState(
    {
      c0: 'rgba(255, 255, 255, 1)',
      c1: 'rgba(0,0,0,1)'

  })

  function changeColorSelection(newColorSelection){
    setColorSelective(newColorSelection)

  }

  const [currentColor, setCurrentColor] = useState(1)
  function changeCurrentColor(int){
    setCurrentColor(int)
  }
  


  function pexel (x, y, w, h, color = 0, stroke = 'black'){
    const canvas = document.getElementById(id)
    const ctx = canvas.getContext("2d")
    ctx.beginPath(); // Start a new path
    ctx.fillStyle = colorSelective['c'+`${color}`]
    ctx.strokeStyle = stroke
    ctx.rect(x, y, w, h); // Add a rectangle to the current path
    ctx.fill(); // Render the path
    ctx.stroke()
    ctx.closePath()

  }

  function generateGridArray (){
    var image = []
    for(var x = 0; x < canvasGridWidth; x++){
      var currentLine = []
      for(var y = 0; y < canvasGridHeight; y++ ){
        currentLine.push(0)
        
      }
      
      image.push(currentLine)
      
    }
    return image
   
  }
  function generateimage(){
    const image = currentImage
    
    for (let y = 0; y < image.length; y++) {
      for (let x = 0; x < image[y].length; x++) {
        pexel(x*currentPixelScale, y*currentPixelScale, currentPixelScale, currentPixelScale, image[x][y])
        
      }
      
    }

  }

  function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let currentRect = {
      x: Math.round((x-1.1)/ 10) ,
      y: Math.round((y-1.1)/ 10) 
    }
    

    console.log("Coordinate x: " + currentRect.x,
      "Coordinate y: " + currentRect.y);

    return currentRect 
  }
  // pencil
  function pencil(position, color){
    const {x, y} = position
    //console.log(x ,y)
    let newArray = Array(...currentImage)
    newArray[x][y] = color
    //console.log(newArray)
    setCurrentImage(newArray)
  }

  function mouseDetection(){
  
  let canvasElem = document.getElementById(id)
  let mouseOnCanvas = false
  let mouseHeld = false
  
  canvasElem.addEventListener("mouseenter", function (e) {
    mouseOnCanvas = true
  }); 
  canvasElem.addEventListener("mouseexit", function (e) {
    mouseOnCanvas = false
  }); 

  canvasElem.addEventListener("mousedown", function (e) {
    if (mouseOnCanvas) mouseHeld = true
    const position = getMousePosition(canvasElem, e);
    pencil(position, currentColor)
    console.log('d')
  }); 

  canvasElem.addEventListener("mouseup", function (e) {
    if (mouseOnCanvas) mouseHeld = false
    console.log('u')
  }); 

  canvasElem.addEventListener("mousemove", function (e) {
    if (mouseHeld == true){
      const position = getMousePosition(canvasElem, e);
      pencil(position, currentColor)
      
    }
  }); 

  

  }
  
  function changeCanvasStatus(){
    setCanvasLoad(true)
  }

  useEffect(()=>{
  mouseDetection()

  }, [canvasLoad])

  useEffect(()=>{
    generateimage()
    

  }, [currentImage])
  

  
  return(<>
  <canvas id={id} onLoad={()=>changeCanvasStatus()} width={canvasWidth} height={canvasHeight} style={{backgroundColor:'rgb(100, 100, 50)', cursor: 'crosshair' }}></canvas>
  
  </>)

}



function Panels (props){
  const wid = props.wid
  const hiet = props.hiet
  const bg = props.bg
  return (
    <> <div style={{background:bg, width: wid, height: hiet, borderRadius:'5px'}} ></div></>
  )

}

function AnimationFrame (){
  return <>
    <Panels wid={30} hiet={30} bg='red'/>
  </>


}

function Layer(){
  return <>
    <Panels wid={30} hiet={30} bg='red'/>
  </>

}
 
// cd my-react-app && npm install && npm run dev
function App() {
  const [currentColor, setCurrentColor] = useState()
  // color array , add and remove colors 
  
  
  
  
  function changeColor(color){
    setCurrentColor(color)

  }
  function Swatch(props){
    const bg = props.bg
    return(<>
    <div onClick={()=> changeColor(bg)} style={{width: 10, height: 10, background: bg}}></div>
    
    </>)
  
  }

  


  return (
    <>
    <div>
    
      <div id="top"> 
        <div id="menu">
          
            <select name="file" id="file">
              <option value="file">file</option>

            </select>

          
          <select name="edit">
            <option value="edit">edit</option>
          </select>
          
          <select name="preference">
            <option value="preference">preference</option>
          </select>

        </div>
        <div id="animations">
          {/*animtions */}
          <AnimationFrame/>
        </div>

      </div>
      <div id="middle">
        <div id="tool-bar">
          <Panels wid={100} hiet={300} bg='green'/>

        </div>

        <div id="canvas-space">
          <Canvas ID="1"/>
          
        </div>
        <div id="color-palete" style={{width: 100, height: 300, background:'green', borderRadius:'5px'}}> 
        <div id="colors">
          <Swatch/>


        </div>
        <div id="color picker"></div>
        </div>

      </div>

      <div id="bottom">
        <div id="layers">
          <Layer/>


        </div>
        <div id="ads "></div>
      </div>

    </div>
    
    
    </>
  )
}

export default App
