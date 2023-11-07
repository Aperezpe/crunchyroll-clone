import { PropsWithChildren } from "react"
import './LoadingElement.scss'

interface LoadingElementProps {
  className?: string,

}

const LoadingElement = (props: PropsWithChildren<LoadingElementProps>) => {
  const { className } = props

  return (
    <span className={`${className} bg-loading-element z-10 animationLoadingElement`}/>
  )
}

export default LoadingElement