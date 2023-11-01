import Navbar from '../components/navbar/Navbar'
import HeroSlider from '../components/hero-slider/HeroSlider'
import { Movie } from '../models/movie';
import { useEffect, useState } from 'react';

function Home() {

  const [slideShowMovies, setSlideShowMovies] = useState<Movie[]>()

  const fetchSlideShowMovies = async () => {
    return fetch('http://localhost:3000/slideShowMovies') 
      .then(res => res.json())
      .then(d => setSlideShowMovies(d))
  }

  useEffect(() => {
    fetchSlideShowMovies()
  }, [])

  return (
    <div className='flex flex-col'>
      <div className='h-15'><Navbar/></div>
      {slideShowMovies ? <HeroSlider movies={slideShowMovies}/> : <div>Loading...</div>}
    </div>
  )
}

export default Home