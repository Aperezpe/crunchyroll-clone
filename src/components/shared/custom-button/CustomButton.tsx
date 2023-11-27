import { PropsWithChildren } from "react"
import classnames from 'classnames'
import './CustomButton.scss'

interface CustomButtonProps {
  outline?: boolean,
  icon?: JSX.Element,
  className?: string,
}

const CustomButton = (props: PropsWithChildren<CustomButtonProps>) => {
  const {outline, icon, className } = props

  const classes = classnames(
    className,
    'p-[6px]', 'custom-button', 'bg-crunchy-orange', 'flex', 'items-center', 'justify-center', {
    'bg-transparent': outline,
    'border-crunchy-orange': outline,
    'border-solid': outline,
    'border-[2.75px]': outline
  })

  return (
    <button className={classes}>{icon}{props.children?.toString().toUpperCase()}</button>
    // <div className=""></div>
  )
}

export default CustomButton