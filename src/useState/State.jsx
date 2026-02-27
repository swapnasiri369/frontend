import React,{useState}from'react'; 
const State = () => {
    const[count,setCount]=useState(0)
    

    function click(){
        setCount (count+1)
    } 
  return (
    <div>
    <p>{count}</p>
    <button onClick={click}>click</button>
    </div>
  )
}

export default State
