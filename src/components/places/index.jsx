import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import RouteRegistry from '../../routes/RouteRegistry'
import { GET_PLACES } from '../../graphql/queries'
import ImageCard from '../common/card/image-card'
import Loader from '../common/loader'
import NoData from '../common/no-data'

const Places = () => {
  const navigate = useNavigate()
  const { loading, error, data } = useQuery(GET_PLACES);

  const places = data && data.getPlaceList

  const handleRedirect = (id) => {
    navigate(`${RouteRegistry.places.path}/${id}`)
  }

  const starPoints = ({ points, reviewList }) => {
    if(reviewList.length > 0) {
      return (points-5)/reviewList.length
    }else {
      return points
    }
  }

  return (
    <div className={`flex flex-row flex-wrap gap-y-7 gap-x-3 justify-center ${loading || error ? 'lg:justify-center' : 'lg:justify-start'} lg:gap-x-7`}>
      {
        loading ? <Loader loading={loading} /> :
        !error && places ? places.map(place => 
          <ImageCard 
            key={place.id}
            image={place.photo}
            title={place.title} 
            description={place.description}
            stars={starPoints(place)}
            onClick={() => handleRedirect(place.id)}
           />
        ) : <NoData message='Not found any place' />
      }
    </div>
  )
}

export default Places
