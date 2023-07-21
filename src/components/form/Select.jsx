import { useState } from "react";
import '../../assets/styles/formEls.scss'

export default function Select({ title, value, mapItems, handleChange, prop }) {

  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    handleChange(prop, e.target.value)
    setIsOptionsOpen(false)
  }
  return (
    <div className='custom_select'>
      <p className='title'>{title}</p>
      <input
        onClick={() => setIsOptionsOpen(prev => !prev)}
        type="text"
        value={value}
        readOnly
      />

      {/* Map select options */}
      <div className={`${isOptionsOpen && 'open'} dropdown`}>
        {
          mapItems.map((item) => {
            // Check if typeOf item is object
            if(item.name) {
              return (
                <button
                  key={item.id}
                  value={item.name}
                  onClick={(e) => handleClick(e)}
                >
                  {item.name}
                </button>
              )
            } else return (
              <button
                key={item}
                value={item}
                onClick={(e) => handleClick(e)}
              >
                {item}
              </button>
            )
            
        })
        }
      </div>
    </div>
  )
}
