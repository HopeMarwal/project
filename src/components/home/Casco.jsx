// React
import { useEffect, useState } from 'react'
// Style
import '../../assets/styles/main/casco.scss'
// Components
import ShowPrice from './ShowPrice'
import Accordion from './Accordion'
import Radio from '../form/Radio'
import Select from '../form/Select'
import ButtonsControl from './ButtonsControl'

export default function Casco ({ data, step, setStep, setTotalSteps }) {

    const [ itemsModelMap, setItemsModal] = useState([])
    const [ showPrice, setShowPrice ] = useState(false)
    const [formData, setFormData] = useState({
      type: '',
      marca: '',
      model: '',
      year: '',
      marketPrice: 0,
      territory: '',
      franshise: ''
    })

    // Set step value when mounted
    useEffect(() => {
      let stepArr = []
      for(let i = 0; i < data.progress.length; i++) {
        stepArr.push( i + 1 )
      }
      setStep(1)
      setTotalSteps(stepArr)

      return(() => {
        setTotalSteps([])
      })
      // eslint-disable-next-line 
    }, [data.progress.length])

    // Change select models options based on marca value
    useEffect(() => {
      
      let newItems  = []
      switch(formData.marca.toLocaleLowerCase()) {
        case 'alfa romeo': newItems = data.progress[1].props.marca[0].models
          break;
        case 'bentley': newItems = data.progress[1].props.marca[1].models
          break;
        case 'bmw':newItems = data.progress[1].props.marca[2].models
          break;
        case 'chevrolet': newItems = data.progress[1].props.marca[3].models
          break;
        default: newItems = []
          break;
    } 
    setItemsModal(newItems)
    }, [formData.marca, data.progress])
  
    const handleChangeFormValues = (prop, value) => {
      setFormData({...formData, [prop]: value})
    }

    const handleSelectMarca = (prop, value) => {
      setFormData({...formData, marca: value, model: ''})
    }
    
    return (
      <div className='container'>
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
            {step === 2 && 
              <div className='second'>
                {/* Marca */}
                <Select
                  title='Marca'
                  value={formData.marca.toLocaleUpperCase() || 'Introduceți marca'}
                  mapItems={data.progress[1].props.marca}
                  prop='marca'
                  handleChange={handleSelectMarca}
                />

                {/* Models */}
                <Select
                  title='Model'
                  value={formData.model.toLocaleUpperCase() || 'Introduceți model'}
                  mapItems={itemsModelMap}
                  prop='model'
                  handleChange={handleChangeFormValues}
                />
                
                {/* Map radio buttons to select year */}
                <p className="title">Anul producerii</p>
                <div className="radio">
                
                {data.progress[1].props.years.map((item) => (
                  <Radio
                    key={item.id}
                    checked={formData.year === item}
                    item={item}
                    name='year'
                    img={false}
                    span={false}
                    handleChange={() => handleChangeFormValues('year', item)}
                    classTitle={`${formData.year === item && 'selected'}`}
                    line
                  />
                ))}
                </div>
              </div>
            }
            {
              step === 3 && 
              <div className='third'>
                {/* Valoarea de piață */}
                <label>
                  <p className='title'>Valoarea de piață ( € )</p>
                  <input
                    type='text'
                    value={formData.marketPrice}
                    onChange={(e) => setFormData({...formData, marketPrice: e.target.value})}
                  />
                </label>

                {/* Teritoriul de acoperire CASCO */}
                <p className='title'>Teritoriul de acoperire CASCO</p>
                <div className='custom-checkbox_wrap'>
                  {
                    data.progress[2].props.territory.map((item) => (
                      <Radio
                        key={item}
                        name='territory'
                        checked={formData.territory === item}
                        item={item}
                        handleChange={() => handleChangeFormValues('territory', item)}
                        classTitle='custom-checkbox'
                        img={false}
                        span
                      />
                    
                    ))
                  }
                </div>
                  
                {/* Franșiza */}
                <p className="title">Franșiza</p>
                <div className='custom-checkbox_wrap'>
                  {
                    data.progress[2].props.franchise.map((item) => (
                      <Radio
                        key={item}
                        name='franshise'
                        checked={formData.franshise === item}
                        item={item}
                        handleChange={() => handleChangeFormValues('franshise', item)}
                        classTitle='custom-checkbox'
                        img={false}
                        span
                      />
                    ))
                  }
                </div>

                {/* Show price */}
                {showPrice && <ShowPrice total='569' /> }
                
              </div>
            }

          </form>

          <ButtonsControl
            prevDis={step === 1}
            nextDis={ (step === 1 && !formData.type) || (step === 2 && (!formData.marca || !formData.model || !formData.year)) || (step === 3 && (!formData.marketPrice || !formData.territory || !formData.franshise ))}
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