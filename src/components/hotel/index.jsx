import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import RouteRegistry from '../../routes/RouteRegistry'
import { GET_HOTELS } from '../../graphql/queries'
import ImageCard from '../common/card/image-card'
import Loader from '../common/loader'
import NoData from '../common/no-data'

const Hotel = () => {
  const navigate = useNavigate()
  const { loading, error, data } = useQuery(GET_HOTELS);

  const hotels = data && data.getHotelList

  const handleRedirect = (id) => {
    navigate(`${RouteRegistry.hotels.path}/${id}`)
  }

  const starPoints = ({ points, hotel_reviewList }) => {
    if(hotel_reviewList.length > 0) {
      return points/hotel_reviewList.length
    }else {
      return points
    }
  }

  return (
    <div className={`flex flex-row flex-wrap gap-y-7 gap-x-3 justify-center ${loading || error ? 'lg:justify-center' : 'lg:justify-start'} lg:gap-x-7`}>
      {
        loading ? <Loader loading={loading} /> :
        !error && hotels ? hotels.map(hotel => 
          <ImageCard 
            key={hotel.id}
            image={hotel.photo}
            title={hotel.name} 
            description={hotel.description}
            stars={starPoints(hotel)}
            onClick={() => handleRedirect(hotel.id)}
           />
        ) : <NoData message='Not found any hotel' />
      }
    </div>
  )
}

export default Hotel
