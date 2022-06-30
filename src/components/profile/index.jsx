import { useEffect, useState } from 'react'
import AuthContainer from '../../containers/auth'
import client from '../../apallo-client'
import { GET_USER_BY_EMAIL } from '../../graphql/queries'

const Profile = () => {
  const { getUserInfo } = AuthContainer.useContainer()

  const [profile, setProfile] = useState()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async() => {
    const { data: {getUserByEmail} } = await client.query({
      query: GET_USER_BY_EMAIL,
      variables: {
        email: getUserInfo().email
      }
    })
    setProfile(getUserByEmail)
  }

  return (
    <div className="md:w-[75%] w-[100%] m-auto bg-white rounded-lg border border-gray-200 shadow-md pt-7 pb-10 my-10">
      <div className="flex flex-col items-center">
        <img
          className="mb-5 w-24 h-24 rounded-full shadow-lg"
          src={
            "https://res.cloudinary.com/zencloude/image/upload/v1656501523/travel-mate/sigiriya_yf7sjf.jpg"
          }
          alt="Bonnie image"
        />
        <div className="w-[90%] flex flex-row flex-wrap gap-2">
          <div className="w-[calc(50%-8px)] mb-4">
            <input placeholder="Name" type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-[#b1b845] focus:ring-2 focus:ring-[#b1b845] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={profile?.name && profile.name} />
          </div>
          <div className="w-[calc(50%-8px)] mb-4">
            <input placeholder="Email" type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-[#b1b845] focus:ring-2 focus:ring-[#b1b845] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={profile?.email} />
          </div>
          <div className="w-[calc(50%-8px)] mb-4">
            <input placeholder="Mobile" type="text" id="mobile" name="mobile" className="w-full bg-white rounded border border-gray-300 focus:border-[#b1b845] focus:ring-2 focus:ring-[#b1b845] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={profile?.mobile && profile.mobile} />
          </div>
          <div className="w-[calc(50%-8px)] mb-4">
            <input placeholder="Country" type="text" id="country" name="country" className="w-full bg-white rounded border border-gray-300 focus:border-[#b1b845] focus:ring-2 focus:ring-[#b1b845] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={profile?.country && profile.country} />
          </div>
        </div>
        <button className="text-white bg-[#b1b845] border-0 py-2 px-6 focus:outline-none hover:bg-[#b1b845] rounded text-lg">Update Profile</button>
      </div>
    </div>
  )
}

export default Profile
