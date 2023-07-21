import { useState } from "react"
import close from '../../assets/icons/close.svg'

export default function Modal({ flag, setIsModalOpen, setModalFlag }) {
  return (
  <div className="modelWrapper">
    { flag === 'singIn' 
    ? <SingIn 
        setModalFlag={setModalFlag}
        setIsModalOpen={setIsModalOpen}
    /> 
    : <SingUp
        setModalFlag={setModalFlag}
        setIsModalOpen={setIsModalOpen}
      />
    }

  </div>
  )
}

// SignIn component
const SingIn = ({ setModalFlag, setIsModalOpen }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    //Do login auth 
  }
  
  return (
    <div className="modal">

      <div className="modal-header">
        <h3>Logheaza-te</h3>
        <button onClick={() => setIsModalOpen(false)}>
          <img src={close} alt='close modal'/>
        </button>
      </div>

      {/* Click to move to SingUp component */}
      <div className="modal-body">
        <span>Nu ai un cont?</span> {` `}
        <button onClick={() => setModalFlag('singUp')}>
          Inregisteaza-te
        </button>
      </div>

      <form action="/" onSubmit={(e) => handleSubmit(e)}>
        {/* Email */}
        <input
          placeholder="Email"
          required
          type="email"
          value={loginData.email}
          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
        />
        {/* Password */}
        <input
          placeholder="Parola"
          required
          minLength={8}
          type="password" 
          value={loginData.password}
          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
        />

        <a href="/">Ai uitat parola?</a>

        <button className="btn btn-login">
          Logare
        </button>
      </form>
      
      
    </div>
  )
}

// SignUp component
const SingUp = ({ setModalFlag, setIsModalOpen }) => {
  const [regData, setRegData] = useState({
    email: '',
    password: '',
    confirmPass: '',
    terms: true
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    //Do login auth 
  }
  
  return (
    <div className="modal">

      <div className="modal-header">
        <h3>Înregistreaza-te</h3>
        <button onClick={() => setIsModalOpen(false)}>
          <img src={close} alt='close modal'/>
        </button>
      </div>

      {/* Click on btn to move to SingIn component */}
      <div className="modal-body">
        <span>Deja ai un cont?</span> {` `}
        <button onClick={() => setModalFlag('singIn')}>
          Logheaza-te
        </button>
      </div>

      <form action="/" onSubmit={(e) => handleSubmit(e)}>
        {/* Email */}
        <input
          placeholder="Email"
          required
          type="email"
          value={regData.email}
          onChange={(e) => setRegData({...regData, email: e.target.value})}
        />

        {/* Password */}
        <input
          placeholder="Parola"
          required
          minLength={8}
          type="password" 
          value={regData.password}
          onChange={(e) => setRegData({...regData, password: e.target.value})}
        />

        {/* Confirm Password */}
        <input
          placeholder="Confirmă parola"
          required
          minLength={8}
          type="password" 
          value={regData.confirmPass}
          onChange={(e) => setRegData({...regData, confirmPass: e.target.value})}
        />    

        {/* Terms */}
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={regData.terms}
            onChange={() => setRegData({...regData, terms: !regData.terms})}
          />
          <span></span>
          <p>Sunt de acord cu <a href='/'>Termenii și condițiile</a> site-ului</p>
        </label>
        
        <button className="btn btn-login">
          Înregistrare
        </button>
      </form>
      
    </div>
  )


}