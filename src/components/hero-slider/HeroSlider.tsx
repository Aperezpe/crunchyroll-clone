import CustomButton from "../shared/custom-button/CustomButton"
import BookMarkIcon from "../../assets/bookmark-icon.svg?react"
import PlayIcon from "../../assets/play-icon.svg?react"
import { CrunchyRollElement } from "../../models/crunchy-roll-element"
import { useEffect, useState } from "react"
import LoadingElement from "../shared/loading-element/LoadingElement"
import classnames from 'classnames'

import './HeroSlider.scss'

type HeroSliderProps = {
  slideShowElements: CrunchyRollElement[];
  isImgLoaded: boolean;
}

let currentTimeout = 0

// TODO: Las imagenes se tardan en cargar si se agarran una por una.
// Al inisializar el componente, cargar todas las imagenes en el cache somehow
const HeroSlider = (props: HeroSliderProps) => {

  const {slideShowElements, isImgLoaded } = props
  const [currentElemIndex, setCurrentElemIndex] = useState<number>(0)
  const [touchStart, setTouchStart] = useState<number>(0)
  const [touchEnd, setTouchEnd] = useState<number>(0)
  
  useEffect(() => {

    clearTimeout(currentTimeout)

    currentTimeout = setTimeout(() => {
      setCurrentElemIndex((currentElemIndex +  1) % slideShowElements.length)
    }, 10000)


  }, [currentElemIndex, slideShowElements.length])

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
    setCurrentElemIndex(prevElemIndex => (prevElemIndex + 1) % slideShowElements.length)
  }
  
  const moveSliderLeft = () => {
    setCurrentElemIndex((prevElemIndex) =>
    prevElemIndex == 0
        ? slideShowElements.length - 1
        : (prevElemIndex - 1) % slideShowElements.length
    );
  };

  const playIcon = <PlayIcon fill="black" height="24px" className="bg-red pr-1"/>
  const bookmarkIcon = <BookMarkIcon fill="var(--crunchy-orange)" height="24px"/>

  // Handles the fade transition when an element shows or hides
  const visibilityTransitionClass = (classNames: string, i: number) => classnames(classNames, {
    'visibleEl': i == currentElemIndex,
    'hiddenEl': i != currentElemIndex
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
        {slideShowElements.map((crunchyRollElement, index) => 
          isImgLoaded && <img
            key={index} 
            className={
              visibilityTransitionClass('h-full w-full absolute bg-cover ', index)
            }
            src={`${crunchyRollElement.imgUrl}`}>  
          </img>
        )}

        {/* Image Title */}
        {slideShowElements.map((crunchyRollElement, index) => 
          index == currentElemIndex && 
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
              src={`${crunchyRollElement.titleImgUrl}`}>  
            </img>
          </LoadingElement>
        )}


        {/* Details */}
        {slideShowElements.map((crunchyRollElement, index) => 
            <LoadingElement
              loading={!isImgLoaded} 
              width="w-[76%]" height="h-4" 
              className="z-10 absolute bottom-36"
            >
              <div className={
                visibilityTransitionClass("text-slate-400 text-sm z-10 absolute bottom-36", index)
              }>
                {crunchyRollElement.sub && <span>Sub | </span>} 
                {crunchyRollElement.dub && <span>Dub ⬩ </span>} 
                {crunchyRollElement.genres}
              </div>
            </LoadingElement>
        )}

        {/* Action Button(s) */}
        {slideShowElements.map((crunchyRollElement, index) => 
          <div 
            key={index}
            className={
              visibilityTransitionClass("flex w-full px-4 my-4 z-10 absolute bottom-16", index)
            }>
            <LoadingElement loading={!isImgLoaded} height="h-[42px]" width="flex-grow">
              <>
                <CustomButton icon={playIcon} className="flex-grow">{crunchyRollElement.buttonText}</CustomButton>
                <CustomButton outline icon={bookmarkIcon}/>
              </>
            </LoadingElement>
          </div>
        )}

        {/* Progress Indicator */}
        <div id='progress-indicator' className="pt-4 pb-10 text-white z-10 flex justify-center items-center">
          {isImgLoaded 
            ? slideShowElements.map((crunchyRollElement) => 
              <span key={crunchyRollElement.id} 
                className={`block relative h-2 ${crunchyRollElement == slideShowElements[currentElemIndex] ? 'w-12' : 'w-6'} transition-all rounded-full bg-pill-color z-10 mx-1 overflow-hidden 
                ${crunchyRollElement == slideShowElements[currentElemIndex] && 'w-12 after:block after:absolute after:left-[-10%] after:h-full currentPillAnimation after:bg-crunchy-orange after:rounded-full'}`}/>) 
            : [...Array(4)].map((_, i) => 
              <span key={i} className={`block relative h-2 ${i == 0 ? 'w-12' : 'w-6'} rounded-full bg-loading-element z-10 mx-1`}/>)}
        </div>
      </div>
    </div>

  )
}

export default HeroSlider;