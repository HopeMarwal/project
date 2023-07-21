//Styles
import '../../assets/styles/embla.css'
import '../../assets/styles/testimonials.scss'
//react Hooks
import { useEffect, useState } from "react"
//Components
import TestimonialCard from "./testimonials/TestimonialCard.jsx"
import Carousel from "./testimonials/Carousel.tsx";

export default function Testimonials({ data }) {
  const [dataArray, setData] = useState(null)

  useEffect(() => {
    // transform data into array by 4 items to display on carousel
    setData([ data.slice(0,4), data.slice(4,8), data.slice(8,) ])
  }, [data])

  return (
    <section className='bg-lgray'>
      <div className="testimonials">
        <h3>Recenziile clientilor</h3>

        {/* Every carousel slide display 4 TestimonialCard(s) */}
        <Carousel>
          {dataArray?.map((item, index) => (
            <div key={index} className="testimonials_wrapper">
              {item.map((card) => (
                <TestimonialCard key={card.id} data={card} />
              ))}
            </div>
            ))
          }
        </Carousel>
      </div>
        
    </section>
  )
}
