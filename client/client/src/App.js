import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

async function register(email, password) {
  const response = await fetch('http://localhost:4000/register', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem("token", token)
    return
  }

  return response.text()
}

// function myAlert (text){
//   alert(text)
// }

async function login(email, password) {
  const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
  const { token } = await response.json();
  localStorage.setItem("token", token)
  console.log("logged in successfuly!!")
}



function App() {

  const textRef = useRef();
  const passRef = useRef();
  const [stateText, setStateText] = useState("");
  const [loudOrNot, setLoudOrNot] = useState('')

  async function add_me() {
    setLoudOrNot("louding...")
    setLoudOrNot(await register(textRef.current.value, passRef.current.value))
    
  }

  async function log_in() {
    setLoudOrNot("louding...")
    setLoudOrNot(await login(textRef.current.value, passRef.current.value))
    
  }

  /* return (
     <div className= "App">
       <h1>welcome!</h1>
       <input type="text" value={stateText} onChange={()=>myAlert(stateText)} name="text1" />
       <input type="password" name="password1"/>
       <input type="button" name="addMe" value="add me" onClick= {() => { alert(textRef.current.value);}} />
     </div>
   );*/

  return (
    <div className="App">
      <h1>welcome!</h1>
      <h5>Enter your email:</h5>
      <input ref={textRef} type="text" />
      <h5>Enter your password:</h5>
      <input ref={passRef} type="password" />
      <div>
        <input value="add me" type="Submit" onClick={add_me} />
      </div>
      <div>
        <input value="I have user" type="Submit" onClick={log_in} />
      </div>
      <div>
        <span value={loudOrNot}>{loudOrNot}</span>
      </div>
    </div>
  );

}
export default App;
