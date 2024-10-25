import { useState, useEffect } from "react"

function Canvas(props){
  // current array and update array(picture)
  const ratio = 250
  const [canvasWidth, setCanvasWidth] = useState(ratio)
  const [canvasHeight, setCanvasHeight] = useState(ratio)

  const [canvasGridWidth, setCanvasGridWidth] = useState(ratio/10)
  const [canvasGridHeight, setCanvasGridHeight] = useState(ratio/10)
  

  const [canvasLoad, setCanvasLoad] = useState(false)
  const [currentImage, setCurrentImage] = useState(generateGridArray())
  const [currentPixelScale, setCurrentPixelScale] = useState(10)
  const [colorSelective, setColorSelective] = useState({
      c0: 'rgba(255, 255, 255, 1)'

  })
  function pexel (x, y, w, h, color=0, stroke = 'black'){
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
    const image = generateGridArray()
    
    for (let y = 0; y < image.length; y++) {
      for (let x = 0; x < image[y].length; x++) {
        console.log(image[y])
        pexel(x*currentPixelScale, y*currentPixelScale, currentPixelScale, currentPixelScale, 0)
        
      }
      
    }

  }


  const id = props.ID
  function changeCanvasStatus(){
    setCanvasLoad(true)
  }

  useEffect(()=>{
    

  }, [canvasLoad])

  useEffect(()=>{
   
    generateimage()

  }, [])
  

  
  return(<>
  <canvas id={id} onLoad={()=>changeCanvasStatus()} width={canvasWidth} height={canvasHeight} style={{backgroundColor:'rgb(100, 100, 50)'}}></canvas>
  
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
