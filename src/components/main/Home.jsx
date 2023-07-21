import { useState } from 'react';
// Style
import '../../assets/styles/home.scss'
// Components
import Casco from '../home/Casco';
import Rca from '../home/Rca';
import GreenCard from '../home/GreenCard';

export default function Home({ data }) {

  // Destructing data
  const {rca, casco, greenCard, categories, icons } = data

  const [selectedCategory, setSelectedCategory] = useState('casco')
  const [ steps, setTotalSteps ] = useState([])
  const [ step, setStep ] = useState(1)

  return (
    <section className='home'>
      {/* Sidebar contacts */}
      <aside>
        <div className="contact-bar">
          <div className="contact-bar_item">
            <img src={icons.lang.src} alt={icons.lang.title} />
            <p><span>Рус</span> | Eng</p>
          </div>

          <div className="line"></div>

          <div className="contact-bar_item">
            <img src={icons.phone.src} alt={icons.lang.title} />
            <p>{icons.phone.title}</p>
          </div>

          <div className="line"></div>

          <div className="contact-bar_item">
            <img src={icons.messenger.src} alt={icons.messenger.title} />
            <p>{icons.messenger.title}</p>
          </div>

          <div className="horizontal_line"></div>

          <div className="contact-bar_item">
            <img src={icons.whatsapp.src} alt={icons.whatsapp.title} />
            <p>{icons.whatsapp.title}</p>
          </div>

        </div>
      </aside>

      <div className='wrapper'>

        {/* Gradiented header banner with categories */}
        <div className="header-banner">
          <h3>Alege tipul de asigurare</h3>
          {/* Map over categoriesa */}
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className={`${category.title.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase() && 'selected'}`}
                onClick={() => setSelectedCategory(category.title.toLocaleLowerCase())}
              >
                <span>{category.title}</span>
              </li>))
            }
          </ul>
        </div>
          
        {/* Form assuranse container */}
        <div className='wrapper_category'>
          {casco && selectedCategory === 'casco' && 
            <Casco
              data={casco}
              step={step}
              setStep={setStep}
              setTotalSteps={setTotalSteps}
            />
          }
          {rca && selectedCategory === 'rca' && 
            <Rca
              data={rca}
              step={step}
              setStep={setStep}
              setTotalSteps={setTotalSteps}
            />
          }
          {greenCard && selectedCategory === 'carte verde' && 
            <GreenCard
              data={greenCard}
              step={step}
              setStep={setStep}
              setTotalSteps={setTotalSteps}
            />
          }
        </div>
      </div>

      {/* Progress bar */}
      <aside>
        <div className='progress-bar'>
         
          <div className='step_container'>
            {steps.map((item) => (
              <div key={item} className='step-wrapper'>
                {/* Step count */}
                <div className={`${step >= item && 'completed'} step-style`}>
                  {step > item 
                    ? <div className='check-mark'>L</div>
                    :<div className='step-count'>{item}</div>
                  }
                </div>
                {/* Progress line */}
                <div className={`${step > item  && 'completed'} progress-line`}>
                  <div></div>
                </div>

              </div>))
            }
          </div>
          
        </div>
      </aside>
    </section>
  )
}
