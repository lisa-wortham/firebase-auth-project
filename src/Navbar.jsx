import { useState, useEffect } from 'react'
import { auth } from './firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'


  function Navbar() {
    const [showModal, setShowModal] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showDropdown, setShowDropdown] =useState(false)
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user)
        setLoading(false)
      })
      return () => unsubscribe()
    }, [])
    const handleAuth = async () => {
      try {
        if (isRegister) {
          await createUserWithEmailAndPassword(
            auth, email, password
          )
        } else {
          await signInWithEmailAndPassword(
            auth, email, password
          )
        }
        setShowModal(false)
        setEmail('')
        setPassword('')
      } catch (error){
        alert(error.message)
      }
      
    }
  return (
    <nav className="navbar">
      <div className="logo">
        Frontend Simplified
      </div>

      <div className="nav__buttons">
        {loading ? (
          <div className="skeleton"></div>
        ) : user ? (
          <div className="user__menu">
          <button className="user__btn" onClick={() =>setShowDropdown(!showDropdown)}>
            {user.email.charAt(0).toUpperCase()}
          </button>
          {showDropdown &&(
            <div className="dropdown">
          <button onClick={async () => {
          await signOut(auth)
          setShowDropdown(false)
          }}>
          Logout
          </button>
          </div>
          )}
          </div>
          ) : (
            <>
            
      <button className="login__btn" onClick={() => {
          setIsRegister(false)
          setShowModal(true)
      }}
      >Login</button> 

      <button className="register__btn" onClick={() =>{
        setIsRegister(true)
        setShowModal(true)
      }}>Register</button>
      </>
          )}
      </div>
      {showModal && (
        <div className="modal__overlay">
          <div className="modal">

            <button className="modal__close" 
            onClick={() => setShowModal(false)}>
              x 
              </button> 

              <h2>
                {isRegister ? "Create your account" : "Login to your account"}</h2>  

              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

              <input type="password" placeholder="Password"  value={password}
              onChange={(e) => setPassword(e.target.value)}/>

              <button className="modal__btn" onClick={handleAuth}>
                {isRegister ? "Register" : "Login"}
              </button>
          </div>
        </div>
      )}
    </nav>
  )
}
export default Navbar