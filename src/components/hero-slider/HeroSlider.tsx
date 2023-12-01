import CustomButton from "../shared/custom-button/CustomButton"
import BookMarkIcon from "../../assets/bookmark-icon.svg?react"
import PlayIcon from "../../assets/play-icon.svg?react"
import { CrunchyRollElement } from "../../models/movie"
import { useEffect, useState } from "react"
import LoadingElement from "../shared/loading-element/LoadingElement"
import classnames from 'classnames'

import './HeroSlider.scss'

type HeroSliderProps = {
  movies: CrunchyRollElement[];
  isImgLoaded: boolean;
}

let currentTimeout = 0

// TODO: Las imagenes se tardan en cargar si se agarran una por una.
// Al inisializar el componente, cargar todas las imagenes en el cache somehow
const HeroSlider = (props: HeroSliderProps) => {

  const { movies, isImgLoaded } = props
  // const [currentMovie, setCurrentMovie] = useState<Movie>(movies[0])
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0)
  const [touchStart, setTouchStart] = useState<number>(0)
  const [touchEnd, setTouchEnd] = useState<number>(0)
  
  useEffect(() => {

    clearTimeout(currentTimeout)

    currentTimeout = setTimeout(() => {
      setCurrentMovieIndex((currentMovieIndex +  1) % movies.length)
    }, 10000)


  }, [currentMovieIndex, movies.length])

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // do your stuff here for left swipe
      moveSliderRight();
    }
    
    if (touchStart - touchEnd < -75) {
      // do your stuff here for right swipe
      moveSliderLeft();
    }
  }

  const moveSliderRight = () => {
    setCurrentMovieIndex(currentMovieIndex => (currentMovieIndex + 1) % movies.length)
  }
  
  const moveSliderLeft = () => {
    setCurrentMovieIndex((currentMovieIndex) =>
      currentMovieIndex == 0
        ? movies.length - 1
        : (currentMovieIndex - 1) % movies.length
    );
  };

  const playIcon = <PlayIcon fill="black" height="24px" className="bg-red pr-1"/>
  const bookmarkIcon = <BookMarkIcon fill="var(--crunchy-orange)" height="24px"/>

  // Handles the fade transition when an element shows or hides
  const visibilityTransitionClass = (classNames: string, i: number) => classnames(classNames, {
    'visibleEl': i == currentMovieIndex,
    'hiddenEl': i != currentMovieIndex
  })

  return (
    <div 
      onTouchStart={e => handleTouchStart(e)} 
      onTouchMove={e => handleTouchMove(e)}
      onTouchEnd={handleTouchEnd}>
      <div 
        className={`
        h-[35rem]
        w-full
        relative
        after:absolute after:bg-gradient-to-t after:from-black after:w-full after:h-full
        flex flex-col items-center justify-end`}>

        {/* Background Image */}
        {movies.map((movie, index) => 
          isImgLoaded && <img
            key={index} 
            className={
              visibilityTransitionClass('h-full w-full absolute bg-cover ', index)
            }
            src={`${movie.imgUrl}`}>  
          </img>
        )}

        {/* Image Title */}
        {movies.map((movie, index) => 
          index == currentMovieIndex && 
          <LoadingElement 
            key={index}
            loading={!isImgLoaded} 
            width="w-60" height="h-24" 
            className="z-10 mb-4 absolute bottom-40">
            <img 
              className={
                visibilityTransitionClass(
                  'w-60 bg-cover bg-no-repeat bg-center z-10 mb-4 absolute bottom-40', index
                )
              }
              src={`${movie.titleImgUrl}`}>  
            </img>
          </LoadingElement>
        )}


        {/* Details */}
        {movies.map((movie, index) => 
         
            <LoadingElement
              loading={!isImgLoaded} 
              width="w-[76%]" height="h-4" 
              className="z-10 absolute bottom-36"
            >
              <div className={
                visibilityTransitionClass("text-slate-400 text-sm z-10 absolute bottom-36", index)
              }>
                {movie.sub && <span>Sub | </span>} 
                {movie.dub && <span>Dub ⬩ </span>} 
                {movie.genres}
              </div>
            </LoadingElement>
        )}

        {/* Action Button(s) */}
        {movies.map((movie, index) => 
          <div 
            key={index}
            className={
              visibilityTransitionClass("flex w-full px-4 my-4 z-10 absolute bottom-16", index)
            }>
            <LoadingElement loading={!isImgLoaded} height="h-[42px]" width="flex-grow">
              <>
                <CustomButton icon={playIcon} className="flex-grow">{movie.buttonText}</CustomButton>
                <CustomButton outline icon={bookmarkIcon}/>
              </>
            </LoadingElement>
          </div>
        )}

        {/* Progress Indicator */}
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

export default HeroSlider;