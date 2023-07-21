import '../../assets/styles/contactus.scss'

export default function ContactUs({ data }) {
  return (
    <section className='contact-us'>

      {/* Ai nevoie de o consultatie? */}
      <div className="w-50">
        <h3>{data?.title}</h3>
        <p>{data?.desc}</p>
      </div>

      {/* Form input */}
      <div className="w-50">
        <form action="/">
          <div className="form-group">
            <input
              type="text"
              placeholder="Nume/Prenume"
            />
            <input
              type="text"
              placeholder="(+373) __-___-___ "
            />
          </div>
          
          <button className="btn">{data?.btnValue}</button>
        </form>
      </div>

    </section>
  )
}
