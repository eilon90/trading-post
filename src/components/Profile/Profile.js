import { observer, inject } from 'mobx-react'
import './Profile.scss'


const Profile = inject('UserStore')(observer((props) =>  {

  const { UserStore } = props

  return (
    <div id="profile-container">

    </div>
  )
}))

export default Profile