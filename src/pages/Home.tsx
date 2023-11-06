import Navbar from '../components/navbar/Navbar'
import HeroSlider from '../components/hero-slider/HeroSlider'
import { Movie } from '../models/movie';
import { useEffect, useState } from 'react';

function Home() {

  const [slideShowMovies, setSlideShowMovies] = useState<Movie[] | undefined>()
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false)

  const fetchSlideShowMovies = async () => {
    return fetch('http://localhost:3000/slideShowMovies') 
      .then(res => res.json())
      .then(d => setSlideShowMovies(d))
  }



  useEffect(() => {
    const loadImages = async () => {
      for (const movie of slideShowMovies as Movie[]) {
        (new Image()).src = movie.imgUrl;
        (new Image()).src = movie.titleImgUrl;
      }
    }

    if (!slideShowMovies) {
      fetchSlideShowMovies()
    } else {
      loadImages()
      setIsImgLoaded(true)
    }
    
  }, [slideShowMovies])

  return (
    <div className='flex flex-col'>
      <div className='h-15'><Navbar/></div>
      {slideShowMovies && isImgLoaded ? <HeroSlider movies={slideShowMovies}/> : <div>Loading...</div>}
    </div>
  )
}

export default Home