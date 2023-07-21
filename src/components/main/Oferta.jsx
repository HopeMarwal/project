// Components
import OfertaCard from "./OfertaCard"
// Styles
import '../../assets/styles/oferta.scss'
import arrow from '../../assets/icons/arrow.svg'

export default function Oferta({ data }) {

  return (
    <section className='oferta-wrapper'>
      <div className="oferta">

        <div className="oferta_header">
          <h2>Oferte</h2>
          <a href="/">Vezi toate ofertele 
            <img src={arrow} alt="Vezi toate ofertele" />
          </a>
        </div>

        {/* Map over date to OfertaCard component */}
        <div className="oferta_body">
          {data.map((oferta) => <OfertaCard data={oferta} key={oferta.id} />)}
        </div>
        
      </div>
    </section>
  )
}
