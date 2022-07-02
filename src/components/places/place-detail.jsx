import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

import client from '../../apallo-client'
import { GET_PLACE } from '../../graphql/queries'

const PlaceDetail = () => {
  const { pathname } = useLocation()
  console.log("🚀 ~ file: place-detail.jsx ~ line 10 ~ PlaceDetail ~ pathname", pathname)
  const [place, setPlace] = useState({
    id: '',
    title: '',
    photo: '',
    location: '',
    description: '',
  })

  const id = pathname.split('/')[2]

  useEffect(() => {
    getPlaceDetail()
  }, [])

  const getPlaceDetail = async() => {
    const { data: { getPlace } } = await client.query({
      query: GET_PLACE,
      variables: {
        id: id
      }
    })
    setPlace(getPlace)
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-20 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              alt={place.title}
              src={place?.photo}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {place.location}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {place?.title}
              </h1>
              <div className="flex mb-4">
                <AiFillStar className="text-[#b1b845]" />
                <AiFillStar className="text-[#b1b845]" />
                <AiFillStar className="text-[#b1b845]" />
                <AiFillStar className="text-[#b1b845]" />
                <AiOutlineStar className="text-[#b1b845]" />
              </div>
              <p className="leading-relaxed">
                {place.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PlaceDetail
