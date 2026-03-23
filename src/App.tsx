
import { useState } from 'react';
import './App.css'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const submitHandler = (e: FormData) => {
    console.log(Object.fromEntries(e))
    setIsRegistered(!isRegistered)
  }

  return isRegistered ?
      <Signin onSubmit={submitHandler} />
   : <Signup onSubmit={submitHandler} />
}

export default App
