import { useEffect, useState } from 'react'
// Style
import '../../assets/styles/main/rca.scss'
// Components
import ShowPrice from './ShowPrice'
import Accordion from './Accordion'
import Checkbox from '../form/Checkbox'
import Radio from '../form/Radio'
import Select from '../form/Select'
import ButtonsControl from './ButtonsControl'


export default function Rca({ data, step, setStep, setTotalSteps }) {

  const [ showPrice, setShowPrice ] = useState(false)
  const [formData, setFormData] = useState({
    imnatreculat: false,
    posesor: '',
    domiciliu: '',
    type: '',
    numLoc: '',
    numPerson: '',
    stagiul: '',
    pensionar: '',
    contractRca: '',
    remorca: '',
  })

  // Set steps to progress bar
  useEffect(() => {
    let arr = []
    
    // Create step arr
    for(let i = 0; i < data.progress.length; i++) {
      arr.push( i + 1 )
    }
    setStep(1)
    setTotalSteps(arr)

    // Clean up
    return(() => {
      setTotalSteps([])
    })
    // eslint-disable-next-line
  }, [data.progress.length])

  const handleChangeFormValues = (prop, value) => {
    setFormData({...formData, [prop]: value})
  }


  return (
  <div className='container rca'>
    <div className='w-50'>
      <h3>{data.progress[step-1].title}</h3>

      {/* Form container displays based on current step value*/}
      <form action="/">
        {step === 1 && 
          <div className='thirst'>
            {/* Inmatrecalat  */}
            <p className='title'>{data.progress[0].props.imnatreculat.title}</p>
            <div className='custom-checkbox_wrap'>
              {
                data.progress[0].props.imnatreculat.values.map((item) => (
                  <Checkbox
                    key={item}
                    checked={formData.imnatreculat}
                    item={item}
                    handleChange={() => setFormData({...formData, imnatreculat: !formData.imnatreculat})}
                  />
                ))
              }
            </div>
            
            {/* Posesor */}
            <p className='title'>{data.progress[0].props.posesor.title}</p>
            <div className='custom-checkbox_wrap'>
              {
                data.progress[0].props.posesor.values.map((item) => (
                  <Radio
                    key={item}
                    name='posesor'
                    checked={formData.posesor === item}
                    item={item}
                    handleChange={() => handleChangeFormValues('posesor', item)}
                    classTitle='custom-checkbox'
                    img={false}
                    span
                  />
                ))
              }
            </div>
            
            {/* Domiciliu */}
            <p className="title">{data.progress[0].props.domiciliu.title}</p>
            <input
              type="text"
              placeholder='Alte localitati'
              value={formData.domiciliu}
              onChange={(e) => setFormData({...formData, domiciliu: e.target.value})}
            />
          </div>
        }
        {step === 2 && 
          <div className='second'>
            {/* Map over all types of vehicles */}

            {data.progress[1].props.map((item) => (
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

        {step === 3 && 
          <div className='third'>
            {/* Locuri */}
            <Select
              title={data.progress[2].props[0].name}
              value={formData.numLoc || 'Selecteaza o optiune'}
              mapItems={data.progress[2].props[0].options}
              prop='numLoc'
              handleChange={handleChangeFormValues}
            />

            {/* Persoane */}
            <Select
              title={data.progress[2].props[1].name}
              value={formData.numPerson || 'Selecteaza o optiune'}
              mapItems={data.progress[2].props[1].options}
              prop='numPerson'
              handleChange={handleChangeFormValues}
            />

            {/* Stage */}
            <Select
              title={data.progress[2].props[2].name}
              value={formData.stagiul || 'Selecteaza o optiune'}
              mapItems={data.progress[2].props[2].options}
              prop='stagiul'
              handleChange={handleChangeFormValues}
            />
          </div>
        }
        {step === 4 && 
          <div className="forth">

            {/* Sunteti pensionar sau aveti grad de invaliditate? */}
            <p className='title'>{data.progress[3].props[0].name}</p>
            <div className='custom-checkbox_wrap'>
              {
                data.progress[3].props[0].options.map((item) => (
                  <Radio
                    key={item}
                    name='pensionar'
                    checked={formData.pensionar === item}
                    item={item}
                    handleChange={() => handleChangeFormValues('pensionar', item)}
                    classTitle='custom-checkbox'
                    img={false}
                    span
                  />
                ))
              }
            </div>

            {/* Aţi mai încheiat contract de asigurare RCA?? */}
            <p className='title'>{data.progress[3].props[1].name}</p>
            <div className='custom-checkbox_wrap'>
              {
                data.progress[3].props[1].options.map((item) => (
                  <Radio
                    key={item}
                    name='contract'
                    checked={formData.contractRca === item}
                    item={item}
                    handleChange={() => handleChangeFormValues('contractRca', item)}
                    classTitle='custom-checkbox'
                    img={false}
                    span
                  />
                ))
              }
            </div>

            {/* Asigurare pentru remorci */}
            <p className='title'>{data.progress[3].props[2].name}</p>
            <div className='custom-checkbox_wrap'>
              {
                data.progress[3].props[2].options.map((item) => (
                  <Radio
                    key={item}
                    name='remorca'
                    checked={formData.remorca === item}
                    item={item}
                    handleChange={() => handleChangeFormValues('remorca', item)}
                    classTitle='custom-checkbox'
                    img={false}
                    span
                  />
                ))
              }
            </div>

            {/* Show price */}
            {showPrice && <ShowPrice total='1056' /> }

          </div>
        }

      </form>

      <ButtonsControl
        prevDis={step === 1}
        nextDis={ (step === 1 && (!formData.imnatreculat || !formData.posesor || !formData.domiciliu )) || (step === 2 && !formData.type ) || (step === 3 && (!formData.numLoc || !formData.numPerson || !formData.stagiul )) || (step === 4 && (!formData.pensionar || !formData.contractRca || !formData.remorca ))}
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
