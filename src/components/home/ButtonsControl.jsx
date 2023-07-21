import { useState } from "react"

export default function ButtonsControl(props) {
  const {step, totalSteps, prevDis, nextDis, setStep, setShowPrice } = props

  const [ forwardBtn, setForwardBtn ] = useState('Inainte')

  const handleChangeStep = (direc) => {
    if(direc === 'back') {
      setStep(prev => prev - 1)
      setForwardBtn('Inainte')
    } else {
      switch (true) {
        case (forwardBtn === 'Comandă și achită online'):
          break;
        case (forwardBtn === 'Vezi costul'):
          setShowPrice(true)
          setForwardBtn('Comandă și achită online')
          break;
        case (step === totalSteps - 1):
          setStep(prev => prev + 1)
          setForwardBtn('Vezi costul')
          break;
        case (step < totalSteps):
          setStep(prev => prev + 1)
          break;
        default: return

      }
    }
  }

  return (
    <div className='step-btns'>
      <button
        className='btn btn-outline'
        onClick={() => handleChangeStep('back')}
        disabled={prevDis}
      >
        Inapoi
      </button>
      <button
        disabled = {nextDis}
        className='btn'
        onClick={() => handleChangeStep('forward')}
      >
        {forwardBtn}
      </button>
    </div>
  )
}
