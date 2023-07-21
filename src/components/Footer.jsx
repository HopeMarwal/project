import '../assets/styles/footer.scss'

export default function Footer({ footerData }) {
  return (
    <footer>
      <div className='footer-container'>

        {/* Logo container */}
        <div className='flex logo'>
          <img src={footerData?.footerLogo} alt="footer minicode logo" />
          <p>{footerData?.desc}</p>
          <button className="btn btn-outline">
            Comandă apel
          </button>
        </div>

        {/* Companie container */}
        <div className="flex companie">
          <h5>Companie</h5>
          <ul>
            {footerData?.companie.map((item) => (
              <li key={item.id}>
                <a href={item.link}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts container */}
        <div className="flex contact">
          <h5>Contacts</h5>

          <div className="contact_container">
            <a href={`tel:${footerData?.contacts.phone_1}`}>
              {footerData?.contacts.phone_1}
            </a>
            <a href={`tel:${footerData?.contacts.phone_2}`}>
              {footerData?.contacts.phone_2}
            </a>
            <p>{footerData?.contacts.address}</p>
          </div>

        </div>

        {/* Social container */}
        <div className="flex social">
          <h5>Social Media</h5>
          <div className='social_container'>
            { footerData?.socials.map((el) => (
              <a href={el.link} key={el.id}>
                <img src={el.icon} alt={el.link} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
