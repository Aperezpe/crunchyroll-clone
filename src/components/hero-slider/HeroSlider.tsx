import CustomButton from "../custom-button/CustomButton"
import BookMarkIcon from "../../assets/bookmark-icon.svg?react"
import PlayIcon from "../../assets/play-icon.svg?react"
import { Movie } from "../../models/movie"
import { useEffect, useState } from "react"
import './HeroSlider.scss'

type HeroSliderProps = {
  movies: Movie[]
}

// TODO: Las imagenes se tardan en cargar si se agarran una por una.
// Al inisializar el componente, cargar todas las imagenes en el cache somehow
const HeroSlider = (props: HeroSliderProps) => {

  const { movies } = props
  // const [currentMovie, setCurrentMovie] = useState<Movie>(movies[0])
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0)
  
  useEffect(() => {

    setTimeout(() => {
      setCurrentMovieIndex((currentMovieIndex +  1) % movies.length)
    }, 10000)

  }, [currentMovieIndex, movies.length])



  return (
    <div>
      <div style={{backgroundImage: `url(${movies[currentMovieIndex].imgUrl})`}} className={`
        h-[35rem]
        w-full 
        relative
        bg-cover bg-center bg-no-repeat
        after:block after:absolute after:bg-gradient-to-t after:from-black after:w-full after:h-full after:z-0
        flex flex-col items-center justify-end`}>
        <img 
          className='px-28 py-4 z-10' 
          src={movies[currentMovieIndex].titleImgUrl} 
        />
        <div id='sub-dub-categories' className="text-slate-400 z-10 text-sm">
          {movies[currentMovieIndex].sub && <span>Sub |</span>} {movies[currentMovieIndex].dub && <span>Dub *</span>} {movies[currentMovieIndex].genres}
        </div>
        <div className='flex w-full px-4 py-4 z-10'>
          <CustomButton
            icon={
              <span className="pr-1">
                <PlayIcon fill="black" height="24px" className="bg-red"/>
              </span>
            }
            grow>Start Watching S1 E1</CustomButton>
          <CustomButton
            outline 
            icon={<BookMarkIcon fill="var(--crunchy-orange)" height="24px"/>}
          />
        </div>
        <div id='progress-indicator' className="pt-4 pb-10 text-white z-10 flex justify-center items-center">

          {movies.map((movie) => 
            <span key={movie.id} className={`block relative h-2 ${movie == movies[currentMovieIndex] ? 'w-12' : 'w-6'} transition-all rounded-full bg-pill-color z-10 mx-1 overflow-hidden 
            ${movie == movies[currentMovieIndex] && 'w-12 after:block after:absolute after:left-[-10%] after:h-full currentPillAnimation after:bg-crunchy-orange after:rounded-full'}`}/>
          )}
          
          
          
          {/* Current element will be the one with w-12. And make the with grow from 10% to 110% in 10s */}
          {/* <span className="
            block relative h-2 w-12 rounded-full bg-pill-color z-10 mx-1 overflow-hidden
            after:block after:absolute after:left-[-10%] after:h-full after:w-[20%] after:bg-crunchy-orange after:rounded-full"
          /> */}
        </div>
      </div>
    </div>

  )
}

export default HeroSlider