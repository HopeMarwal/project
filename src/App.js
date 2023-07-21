// Style
import './assets/fonts/root/stylesheet.css'
import './assets/styles/global.scss';
// Components
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import Loading from './components/Loading';
// React
import { useEffect, useState } from 'react';

function App() {
  const [ isLoading, setIsLoading ] = useState(false)
  const [navData, setNavData] = useState(null)
  const [footerData, setFooterData] = useState(null)

  useEffect(() => {

    // Fetch data from DB
    const dataFetch = async () => {
      setIsLoading(true)

      const data = await (
        await fetch(
          "https://my-json-server.typicode.com/HopeMarwal/project_test/db"
        )
      ).json();

      //Handle try/catch block to display errors occured if fetch

      // set state when the data received
      setNavData(data.nav);
      setFooterData(data.footer);
      
    };

    dataFetch();
    setIsLoading(false)
     
    return(() => {
      //handle clean up abortController
    })
}, [])


  // Return loading page when data is loading
  if(isLoading) return <Loading />


  return (
    <div className="App">
      {navData && <Nav navData={navData} />}
      <Main />
      {footerData && <Footer footerData={footerData} /> }
    </div>
  );
}

export default App;
