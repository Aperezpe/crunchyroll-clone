import { PropsWithChildren } from "react"
import classnames from 'classnames'
import './CustomButton.scss'

interface CustomButtonProps {
  outline?: boolean,
  grow?: boolean,
  icon?: JSX.Element,
}

const CustomButton = (props: PropsWithChildren<CustomButtonProps>) => {
  const {outline, grow, icon} = props

  const classes = classnames(
    'p-[6px]', 'custom-button', 'bg-crunchy-orange', 'flex', 'items-center', 'justify-center', {
    'bg-transparent': outline,
    'border-crunchy-orange': outline,
    'border-solid': outline,
    'border-[2.75px]': outline,
    'flex-grow': grow
  })

  return (
    <button className={classes}>{icon}{props.children?.toString().toUpperCase()}</button>
    // <div className=""></div>
  )
}

export default CustomButton