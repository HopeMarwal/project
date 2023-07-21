// React
import { useState } from 'react'
// Styles
import close from '../../assets/icons/close.svg'
import '../../assets/styles/main/accordion.scss'

export default function Accordion({ data, title }) {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
      <div className='accordion'>

        {/* Accordion header */}
        <div className="accordion_header" >
          <h6 onClick={() => setIsOpen(prev => !prev)}>{ title }</h6>

          <button onClick={() => setIsOpen(false)}>
            <img src={close} alt='close accordion object' />
          </button>
        </div>

        <div className='border-bt'></div>

        {/* Accordion hidden part */}
        <div className={`${isOpen && 'active'} accordion_body-wrapper`}>
          <div className='accordion_body'>
            { data.map((item, index) => <p key={index}>{item}</p>) }
          </div>
        </div>
      </div>
  )
}
