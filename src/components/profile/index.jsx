import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import Button from '../common/button'
import AuthContainer from '../../containers/auth'
import client from '../../apallo-client'
import { GET_USER_BY_ID } from '../../graphql/queries'
import { UPDATE_USER } from '../../graphql/mutation'

const Profile = () => {
  const { getUserInfo } = AuthContainer.useContainer()

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    image: '',
    mobile: '',
    country: '',
  })

  const { id, image: userImage, name: username } = getUserInfo()
  
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER);

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async() => {
    const { data: {getUser} } = await client.query({
      query: GET_USER_BY_ID,
      variables: {
        id: id
      }
    })
    setProfile(getUser)
  }

  const handleChange = (e) => {
    setProfile(
      { ...profile, [e.target.name]: e.target.value }
    )
  }

  const updateProfile = async() => {
    try {
      const { data: {updateUser: updatedUser} } = await updateUser({
        variables: {
          id: id,
          name: profile.name,
          image: profile.image,
          mobile: profile.mobile,
          country: profile.country,
        }
      })
      setProfile(updatedUser)
    }
    catch(error) {
      console.error(error);
    }
  }

  const handleImageUpload = (e) => {
    uploadImage(e.target.files[0])
  }

  const uploadImage = (image) => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET)
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME)
    fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method:"post",
      body: data
    })
    .then(resp => resp.json())
    .then(data => {
      setProfile((prevProfile) => ({...prevProfile, ['image']: data.url}))
    })
    .catch(err => console.log(err))
  }


  return (
    <div className="md:w-[75%] w-[100%] m-auto bg-white rounded-lg border border-gray-200 shadow-md pt-7 pb-10 my-10">
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 rounded-full shadow-lg mb-[-96px]"
          src={profile.image ? profile.image : userImage}
          alt={username}
        />
        <label for="file-upload" className="w-24 h-24 rounded-full" />
        <input
          className="invisible"
          type="file"
          id="file-upload"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={handleImageUpload}
        />
        <div className="w-[90%] flex flex-row flex-wrap gap-2">
          <div className="w-[calc(50%-8px)] mb-4">
            <input placeholder="Name" type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-[#b1b845] focus:ring-2 focus:ring-[#b1b845] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={profile?.name ? profile.name : ''} onChange={handleChange} />
          </div>
          <div className="w-[calc(50%-8px)] mb-4">
            <input placeholder="Email" type="text" id="email" name="email" className="w-full bg-gray-300 rounded border border-gray-300 focus:border-[#b1b845] focus:ring-2 focus:ring-[#b1b845] text-base outline-none text-gray-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={profile?.email} onChange={handleChange} disabled />
          </div>
          <div className="w-[calc(50%-8px)] mb-4">
            <input placeholder="Mobile" type="text" id="mobile" name="mobile" className="w-full bg-white rounded border border-gray-300 focus:border-[#b1b845] focus:ring-2 focus:ring-[#b1b845] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={profile?.mobile ? profile.mobile : ''} onChange={handleChange} />
          </div>
          <div className="w-[calc(50%-8px)] mb-4">
            <input placeholder="Country" type="text" id="country" name="country" className="w-full bg-white rounded border border-gray-300 focus:border-[#b1b845] focus:ring-2 focus:ring-[#b1b845] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={profile?.country ? profile.country : ''} onChange={handleChange} />
          </div>
        </div>
        <Button title="Update Profile" loading={loading} onClick={updateProfile} />
      </div>
    </div>
  )
}

export default Profile
