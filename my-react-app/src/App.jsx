import { useState, useEffect } from "react"



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
          <canvas id="canvas" width={300} height={300} style={{backgroundColor:'rgb(10, 0, 20)'}}></canvas>
          <script src="CanvasCode.js">
          console.log("opt")
          </script>
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
