import { useState } from 'react';
import './Signup.css'
import axios from 'axios';


function Signup(){
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[mobile,setMobile]=useState("")
    const[password,setPassword]=useState("")

    async function getData(e){
        e.preventDefault ()
        const res=await axios.post("http://localhost:5000/signup",{name,email,mobile,password})
        console.log(res);
    }

  return (
     
    <form onSubmit={getData}>
        <input type="text" onChange={(e)=>setName(e.target.value)}/>
        <input type="email" onChange={(e)=>setEmail(e.target.value)}/>
        <input type="mobile" onChange={(e)=>setMobile(e.target.value)}/>
        <input type="password" onChange={(e)=>setPassword(e.target.value)}/>

        <button type='submit'>submit</button>
    </form>
  );
}

export default Signup;
