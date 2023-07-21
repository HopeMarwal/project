import { useEffect, useState } from 'react'
import '../../assets/styles/main/rca.scss'
import ShowPrice from './ShowPrice'
import Accordion from './Accordion'
import Radio from '../form/Radio'
import ButtonsControl from './ButtonsControl'


export default function GreenCard({data, step, setStep, setTotalSteps}) {
  const [ showPrice, setShowPrice ] = useState(false)
  const [ formData, setFormData ] = useState({
    type: '',
    zona: '',
    valabil: ''
  })

  // Set steps to progress bar
  useEffect(() => {
    let arr = []

    for(let i = 0; i < data.progress.length; i++) {
      arr.push( i + 1 )
    }

    setStep(1)
    setTotalSteps(arr)

    return(() => {
      setTotalSteps([])
    })
    // eslint-disable-next-line 
  }, [data.progress.length])

  const handleChangeFormValues = (prop, value) => {
    setFormData({...formData, [prop]: value})
  }

  return (
    <div className='container green-card'>
    <div className='w-50'>
      <h3>{data.progress[step-1].title}</h3>
    <form action="/">
      {step === 1 && 
        <div className='first'>
          {/* Map over all types of vehicles */}

          {data.progress[0].props.map((item) => (
            <Radio
              key={item.id}
              checked={formData.type === item.title}
              item={item.title}
              name='type'
              span={false}
              img={item.icon}
              handleChange={() => handleChangeFormValues('type', item.title)}
              classTitle={`${formData.type === item.title && 'selected'} custom-radio`}
            />
          ))}
        </div>
      }
      {
        step === 2 && 
        <div className='second'>
          <p className='title'>{data.progress[1].props.zona.title}</p>
          <div className='custom-checkbox_wrap'>
            {
              data.progress[1].props.zona.values.map((item) => (
                <Radio
                  key={item}
                  name='zona'
                  checked={formData.zona === item}
                  item={item}
                  handleChange={() => handleChangeFormValues('zona', item)}
                  classTitle='custom-checkbox'
                  img={false}
                  span
                />
              ))
            }
          </div>

          <p className="title">{data.progress[1].props.valid.title}</p>
          <div className="radio">
            {data.progress[1].props.valid.values.map((item) => (
              <Radio
                key={item.id}
                checked={formData.valabil === item}
                item={item}
                name='valabil'
                img={false}
                span={false}
                handleChange={() => handleChangeFormValues('valabil', item)}
                classTitle={`${formData.year === item && 'selected'}`}
                line
              />
            ))}
          </div>
          
          {/* Show price */}
          {showPrice && <ShowPrice total='267' /> }

        </div>
      }

    </form>

    <ButtonsControl
      prevDis={step === 1}
      nextDis={ (step === 1 && !formData.type ) || (step === 2 && (!formData.zona || !formData.valabil) ) }
      step={step}
      totalSteps={data.progress.length}
      setStep={setStep}
      setShowPrice={setShowPrice}
    />
    </div>

    <div className="w-50 mt-70">
      <Accordion data={data.object} title='Obiectul asigurării'/>
      <Accordion data={data.riscs} title='Riscuri și obligațiuni'/>
    </div>

    

  </div>
  )
}
