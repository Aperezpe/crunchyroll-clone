import React from 'react'
import profileImg from '../../assets/profile-icon-9.png'

interface ProfileImageProps {
  className: string,
}

const ProfileImage = (props: ProfileImageProps) => {
  const {className} = props
  return (
    <div className={`${className} bg-white rounded-full`}>
      <img src={profileImg} alt="profile img" />
    </div>
  )
}

export default ProfileImage