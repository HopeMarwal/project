// Components
import Home from './main/Home'
import ContactUs from './main/ContactUs'
import Oferta from './main/Oferta'
import Testimonials from './main/Testimonials'
import Loading from './Loading'
// React
import { useEffect, useState } from 'react'

export default function Main() {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ homeData, setHomeData] = useState(null)
  const [ contentData, setContentData] = useState(null)

  // Fetch data on mounted
  useEffect(() => {
    setIsLoading(true)
    const homeDataFetch = async () => {
      //Fetch casco, icons, categories
      const res = await (
        await fetch("https://my-json-server.typicode.com/HopeMarwal/store_ecommerce/main")
      ).json();
        
      //fetch rca and green card
      const ress = await (
        await fetch("https://my-json-server.typicode.com/HopeMarwal/fake_api/main")
      ).json();

      // set state when the data received
      setHomeData({
        rca: ress.rca,
        greenCard: ress.greenCard,
        casco: res.casco, 
        icons: res.icons, 
        categories: res.categories
      });
    };
    const fetchContentData = async () => {
      const res = await (
        await fetch("https://my-json-server.typicode.com/HopeMarwal/next_learn_app/db")
      ).json();

      // set contact data when the data received
      setContentData(res)
    }

    homeDataFetch();
    fetchContentData();
    setIsLoading(false)

  }, [])

  // Return loading component while data is loading
  if(isLoading) return <Loading />

  return (
    <main>
      {homeData && <Home data={homeData} /> }
      {contentData && <>
        <ContactUs data={contentData.contactUs} />
        <Oferta data={contentData.oferte} />
        <Testimonials data={contentData.testimonials} />
      </>
      }
      
    </main>
  )
}
