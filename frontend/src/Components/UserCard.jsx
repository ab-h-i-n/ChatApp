import React from 'react'
import ProfileIcon from './ProfileIcon'
import { Link } from 'react-router-dom'

const UserCard = ({user}) => {
  return (
    <Link to={`/user/${user._id}`} className='py-5 flex gap-x-5'>
        <ProfileIcon  src={user?.profilePhoto} />
        <div className='flex flex-col'>
            {/* name  */}
            <div className='text-themeNavyLight font-semibold'>{user?.name}</div>
            {/* about  */}
            <div className='text-themeNavyLight font-medium text-xs'>{user?.about}</div>
        </div>
    </Link>
  )
}

export default UserCard