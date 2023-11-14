import { PropsWithChildren } from "react"
import './LoadingElement.scss'

interface LoadingElementProps {
  className?: string,
  loading: boolean,
  width: string,
  height: string,
}

const LoadingElement = (props: PropsWithChildren<LoadingElementProps>) => {
  const { className, loading, children, width, height } = props

  return (
    // 
    <>
    {loading 
      ? <span className={`${className} ${width} ${height} bg-loading-element animationLoadingElement`}/> 
      : <>{children}</>
    }
    </>
    
  )
}

export default LoadingElement