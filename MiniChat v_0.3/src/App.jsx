import Home from "./Home";
import Navbar from "./Navbar";
import Chat from "./Chat";
import Search from "./Search";
import FindAll from "./FindAll";
import ToggleTextArea from "./textArea";
import { Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { auth, app } from './firebase';
const db = getFirestore(app)

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()

    try {

      await signInWithPopup(auth, provider)


    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {user ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/search" element={<Search />} />
            <Route path="/text/:id" element={<ToggleTextArea />} />
            <Route path="/findall" element={<FindAll />} />
          </Routes>
        </div>
      ) :
        <button onClick={handleGoogleLogin}>Login with Google</button>
      }
    </div>
  )
}

export default App
