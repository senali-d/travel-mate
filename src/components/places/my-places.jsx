import { useEffect, useState } from 'react'

import client from '../../apallo-client'
import AuthContainer from '../../containers/auth'
import { GET_PLACES_BY_ID } from '../../graphql/queries'
import FlatCard from '../common/card/flat-card'

const MyPlaces = () => {
  const { getUserInfo } = AuthContainer.useContainer()
  const { id } = getUserInfo()
  
  const [places, setPlaces] = useState([])
  
  useEffect(() => {
    getPlaces()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPlaces = async () => {
    const {
      data: { getPlaceListById },
    } = await client.query({
      query: GET_PLACES_BY_ID,
      variables: {
        user_id: id,
      },
    })
    setPlaces(getPlaceListById)
  }

  return (
    <div className="container px-5 md:px-0 flex justify-center md:justify-start">
      <div className="p-4 md:w-1/3 w-full bg-white rounded-lg border shadow-md sm:p-8">
        {places && places.map(place =>
          <FlatCard
            image={place.photo}
            title={place.title}
            subtitle={place.description}
          />)
        }
      </div>
      <div className="p-4 md:w-2/3 w-full bg-white rounded-lg border shadow-md sm:p-8">

      </div>
    </div>
  )
}

export default MyPlaces