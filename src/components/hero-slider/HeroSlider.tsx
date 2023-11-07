import CustomButton from "../shared/custom-button/CustomButton"
import BookMarkIcon from "../../assets/bookmark-icon.svg?react"
import PlayIcon from "../../assets/play-icon.svg?react"
import { CrunchyRollElement } from "../../models/movie"
import { useEffect, useState } from "react"
import './HeroSlider.scss'
import LoadingElement from "../shared/loading-element/LoadingElement"

type HeroSliderProps = {
  movies: CrunchyRollElement[];
  isImgLoaded: boolean;
}

// TODO: Las imagenes se tardan en cargar si se agarran una por una.
// Al inisializar el componente, cargar todas las imagenes en el cache somehow
const HeroSlider = (props: HeroSliderProps) => {

  const { movies, isImgLoaded } = props
  // const [currentMovie, setCurrentMovie] = useState<Movie>(movies[0])
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0)
  
  useEffect(() => {

    setTimeout(() => {
      setCurrentMovieIndex((currentMovieIndex +  1) % movies.length)
    }, 10000)

  }, [currentMovieIndex, movies.length])

  return (
    <div>
      <div 
        style={isImgLoaded ? {backgroundImage: `url(${movies[currentMovieIndex].imgUrl})`}: {}} 
        className={`
        h-[35rem]
        w-full
        relative
        bg-loading-bg-color
        bg-cover bg-center bg-no-repeat
        after:block after:absolute after:bg-gradient-to-t after:from-black after:w-full after:h-full after:z-0
        flex flex-col items-center justify-end`}>
        {!isImgLoaded 
          ? <LoadingElement className='h-20 w-56' />
          : <img 
            className='px-28 my-4 z-10'
            src={movies[currentMovieIndex].titleImgUrl} 
          />
        }
        {!isImgLoaded 
          ? <LoadingElement className='h-4 w-[76%] mt-4' />
          : <div id='sub-dub-categories' className="text-slate-400 z-10 text-sm">
            {movies[currentMovieIndex].sub && <span>Sub |</span>} {movies[currentMovieIndex].dub && <span>Dub *</span>} {movies[currentMovieIndex].genres}
          </div>
        }
        
        <div className='flex w-full px-4 my-4 z-10'>
          {!isImgLoaded 
            ? <LoadingElement className='h-[42px] flex-grow' />
            :  <><CustomButton
              grow
              icon={
                <span className="pr-1">
                  <PlayIcon fill="black" height="24px" className="bg-red"/>
                </span>
              }
              >Start Watching S1 E1</CustomButton>
              <CustomButton
                outline 
                icon={<BookMarkIcon fill="var(--crunchy-orange)" height="24px"/>}
              /></>
            }
          </div>
          
          

        <div id='progress-indicator' className="pt-4 pb-10 text-white z-10 flex justify-center items-center">
          {isImgLoaded 
            ? movies.map((movie) => 
              <span key={movie.id} 
                className={`block relative h-2 ${movie == movies[currentMovieIndex] ? 'w-12' : 'w-6'} transition-all rounded-full bg-pill-color z-10 mx-1 overflow-hidden 
                ${movie == movies[currentMovieIndex] && 'w-12 after:block after:absolute after:left-[-10%] after:h-full currentPillAnimation after:bg-crunchy-orange after:rounded-full'}`}/>) 
            : [...Array(4)].map((_, i) => 
              <span key={i} className={`block relative h-2 ${i == 0 ? 'w-12' : 'w-6'} rounded-full bg-loading-element z-10 mx-1`}/>)}
        </div>
      </div>
    </div>

  )
}

export default HeroSlider