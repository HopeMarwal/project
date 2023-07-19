import { useEffect, useState } from 'react'
import '../../assets/styles/main/casco.scss'
import close from '../../assets/icons/close.svg'

export default function Casco ({ data }) {

    const [step, setSteps] = useState(1)
    const [isObjOpen, setIsObjOpen] = useState(true)
    const [isRiskOpen, setIsRiskOpen] = useState(false)
    const [ isMarcaOpen, setIsMarkaOpen ] = useState(false)
    const [ isModelOpen, setIsModelOpen ] = useState(false)
    const [ itemsModelMap, setItemsModal] = useState([])

    const [formData, setFormData] = useState({
      type: '',
      marca: '',
      model: '',
      year: '',
      marketPrice: '',
      territory: '',
      franshise: ''
    })

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
    }, [formData.marca])
  
    const handleChangeStep = (direc) => {
      if(direc === 'back') {
        setSteps(prev => prev - 1)
      } else {
        if(step < data.progress.length) {
          setSteps(prev => prev + 1)
        }
        
      }
    }

    const handleSelectMarca = (e) => {
      e.preventDefault()
      
      setFormData({...formData, marca: e.target.value, model: ''})
      setIsMarkaOpen(false)
      
    }

    const handleSelectModel = (e) => {
      e.preventDefault()
      setFormData({...formData, model: e.target.value})
      setIsModelOpen(false)
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
                <label
                  key={item.id}
                  className={`${formData.type === item.title && 'selected'}`}
                >
                  {/* Hidden input */}
                  <input
                    type="radio"
                    name="type"
                    value={item.title}
                    checked={formData.type === item.title}
                    onChange={() => setFormData({...formData, type: item.title})}
                  />
                  <img src={item.icon} alt={item.title}/>
                  <p>{item.title}</p>
              </label>
              ))}
            </div>
          }
          {step === 2 && 
            <div className='second'>
              {/* Obiecte */}
              <div className='custom_select'>
                <p>Marca</p>
                <input
                  onClick={() => setIsMarkaOpen(prev => !prev)}
                  type="text"
                  value={formData.marca.toLocaleUpperCase() || 'Introduceți marca'}
                  readOnly
                />
                <div className={`${isMarcaOpen && 'open'} dropdown`}>
                  {
                    data.progress[1].props.marca.map((marca) => (
                      <button
                        key={marca.id}
                        value={marca.name}
                        onClick={(e) => handleSelectMarca(e)}
                      >
                        {marca.name}
                      </button>
                    ))
                  }
                </div>
                
              </div>

              {/* Riscuri */}
              <div className='custom_select'>
                <p>Marca</p>
                <input
                  onClick={() => setIsModelOpen(prev => !prev)}
                  disabled={formData.marca.length === 0}
                  type="text"
                  value={formData.model.toLocaleUpperCase() || 'Introduceți model'}
                  readOnly
                />
                <div className={`${isModelOpen && 'open'} dropdown`}>
                  {
                    itemsModelMap.map((item) => (
                      <button
                        key={item}
                        value={item}
                        onClick={(e) => handleSelectModel(e)}
                      >
                        {item}
                      </button>
                    ))
                  }
                </div>
                
              </div>
              
              {/* Map radio buttons to select year */}
              <div className="radio">
              {data.progress[1].props.years.map((item) => (
                <label
                  key={item}
                  className={`${formData.year === item && 'selected'}`}
                >
                  <input
                    type="radio"
                    name="year"
                    value={item}
                    checked={formData.year === item}
                    onChange={() => setFormData({...formData, year: item})}
                  />
                  <div className='line'></div>
                  <p>{item}</p>
              </label>
              ))}
              </div>
            </div>
          }

        </form>
        <div className='step-btns'>
          <button
            className='btn btn-outline'
            onClick={() => handleChangeStep('back')}
            disabled={step === 1}
          >
            Inapoi
          </button>
          <button
            className='btn'
            onClick={() => handleChangeStep('forward')}
          >
            Înainte
          </button>
        </div>
        </div>
        <div className='w-50'>

          <div className='accordion obj'>

            <div className="accordion_header" >
              <h6 onClick={() => setIsObjOpen(prev => !prev)}>Obiectul asigurării</h6>
              <button onClick={() => setIsObjOpen(false)}>
                <img src={close} alt='close accordion object' />
              </button>
            </div>

            <div className='border-bt'></div>

            <div className={`${isObjOpen && 'active'} accordion_body-wrapper`}>
              <div className='accordion_body'>
                {
                  data.object.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))
                }
              </div>
            </div>
          </div>

          <div className='accordion risk'>

            <div className="accordion_header" >
              <h6 onClick={() => setIsRiskOpen(prev => !prev)}>Riscuri și obligațiuni</h6>
              <button onClick={() => setIsRiskOpen(false)}>
                <img src={close} alt='close accordion object' />
              </button>
            </div>

            <div className='border-bt'></div>

            <div className={`${isRiskOpen && 'active'} accordion_body-wrapper`}>
              <div className='accordion_body'>
                {
                  data?.riscs.map((item, index) => (
                    <>
                    <p key={index}>{item.title}</p>
                    <ul>
                      {item.list && item.list.map((li) => (
                        <li key={li}><p>{li}</p></li>
                      ))
                      }
                    </ul>
                    
                    </>
                    
                  ))
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }