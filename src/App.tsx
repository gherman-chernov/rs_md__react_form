
import { useState } from 'react';
import './App.css'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import CommentSection from './components/CommentsSection/CommentsSection';

function App() {
  const isAuthorized = true;
  const [isRegistered, setIsRegistered] = useState(false);
  const submitHandler = (e: FormData) => {
    console.log(Object.fromEntries(e))
    setIsRegistered(!isRegistered)
  }
  if (isAuthorized) return <CommentSection />

  return isRegistered ?
      <Signin onSubmit={submitHandler} />
   : <Signup onSubmit={submitHandler} />
}

export default App
