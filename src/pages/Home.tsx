import Navbar from '../components/navbar/Navbar'
import HeroSlider from '../components/hero-slider/HeroSlider'
import { CrunchyRollElement } from '../models/movie';
import { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner'
import { CrunchyRollService } from '../services/crunchy-roll-repo';

function Home() {

  const [slideShowElements, setSlideShowElements] = useState<CrunchyRollElement[]>()
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false)

  useEffect(() => {
    const fetchSlideShowElements = async () => {
      const crunchyRollService: CrunchyRollService = new CrunchyRollService()
      try { 
        const response = await crunchyRollService.getSlideShowData()
        await new Promise(r => setTimeout(r, 500)) // TODO: delete, only for dev
        setSlideShowElements(response.parsedBody)
      } catch(error) {
        console.log(error)
      }
    }

    // Pre-load images before showing to user, so that each slide element shows without delay
    const loadImages = async () => {
      const imagePromises: Promise<void>[] = []
      if (slideShowElements) {
        for (const movie of slideShowElements) {
          const images = new Promise<void>((resolve) => {
            const img = new Image();
            img.src = movie.imgUrl;
            img.src = movie.titleImgUrl;
            img.onload = () => resolve();
          });
      
          imagePromises.push(images);
        }
      }
  
      try {
        await new Promise(r => setTimeout(r, 1000))
        await Promise.all(imagePromises)
        setIsImgLoaded(true)
      } catch (error) {
        console.log(error)
      }
  
    }
    
    if (slideShowElements === undefined) {
      fetchSlideShowElements()
    } else {
      loadImages()
    }
    
  }, [slideShowElements])

  return (
    <div className='flex flex-col'>
      <Navbar />
      <main className='mt-15 h-screen'>
      {slideShowElements ? // First load all data
        // Then load all images for each section
        <>
          <section>
            <HeroSlider isImgLoaded={isImgLoaded} movies={slideShowElements} /> : 
          </section>
        </> : 
        <div className='h-full flex items-center justify-center'>
          <Oval
          width={50}
          color='#f47521'
          secondaryColor='#f47521'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
          ariaLabel='oval-loading'
          strokeWidth={4}
          strokeWidthSecondary={4}
          />
        </div>
        
      }
      </main>
    </div>
  );
}

export default Home