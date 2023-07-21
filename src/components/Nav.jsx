//React
import { useState } from 'react'
//Style
import '../assets/styles/nav.scss'
//Components
import Modal from './nav/Modal'
import NavMenu from './nav/NavMenu'

export default function Nav({ navData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalFlag, setModalFlag] = useState('')

  //Auth session 
  const session = null
  
  const handleModal = (flag) => {
    setModalFlag(flag)
    setIsModalOpen(true)
  }

  return (
    <nav>
      <div className='burger-btn'>
        <button onClick={() => setIsMenuOpen(true)}>
          <img src={navData?.burgerBtn} alt='open menu button'/>
        </button>
      </div>

      {/* Menu */}
        <NavMenu 
          navData={navData}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

      {/* Nav Bar */}
      <div className="logo">
        <a href="/">
          <img src={navData?.logoBtn} alt='minicode logo' />
        </a>
      </div>

      <div className="line"></div>
      <h3> {navData?.heading} </h3>
      <div className="line"></div>

      {/* If logged in display log out btn*/}
      {session ? '' :
        <div className='not-loggedin'>

          <div className='btn-log-wrapper' onClick={() => handleModal('singIn')}>
            <img src={navData?.singIn.icon} alt='logare' />
            <p>{navData?.singIn.text}</p>
          </div>

          <div className='btn-log-wrapper' onClick={() => handleModal('singUp')}>
            <img src={navData?.singUp.icon} alt='logare' />
            <p>{navData?.singUp.text}</p>
          </div>
        </div>
      }
      {isModalOpen && 
        <Modal
          flag={modalFlag}
          setIsModalOpen={setIsModalOpen}
          setModalFlag={setModalFlag}
        />
      }
    </nav>
  )
}
