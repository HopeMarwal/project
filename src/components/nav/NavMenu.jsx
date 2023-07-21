export default function NavMenu({ navData, setIsMenuOpen, isMenuOpen }) {
  return (
    <div className={`${isMenuOpen && 'open'} menu`}>
      
      {/* Header */}
      <div className='menu-header'>
        <button onClick={() => setIsMenuOpen(false)}>
          <img src={navData?.closeBtn} alt='close menu button' />
        </button>
        <h2>Menu</h2>
      </div>

      {/* Body */}
      <ul className="menu-body">
        {navData?.menu.map((item) => (
          // Enable router to push link 
          <li
            className='menu_item'
            key={item.id}
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={item.img} alt={item.text} />
            <p>{item.text}</p>
          </li>
          ))
        }
      </ul>

      <div className="lang">
        <img src={navData.lang.icon} alt="language_icon" />
        {navData.lang.langs.map((lg) => (
          <p key={lg}>{lg}</p>
        ))}
        
      </div>

      {/* Footer */}
      <div className='menu-footer'>
        {
          navData?.contacts.map((item) => (
            <div key={item.value}>
              <img src={item.icon} alt='contact' />
              <p>{item.value}</p>
            </div>
          ))
        }
      </div>

    </div>
  )
}
