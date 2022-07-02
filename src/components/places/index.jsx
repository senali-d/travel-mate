import { useQuery } from '@apollo/client'

import { GET_PLACES } from '../../graphql/queries'
import ImageCard from '../common/card/image-card'
import Loader from '../common/loader'
import NoData from '../common/no-data'

const Places = () => {
  const { loading, error, data } = useQuery(GET_PLACES);

  const places = data && data.getPlaceList

  return (
    <div className={`py-10 flex flex-row flex-wrap gap-y-7 gap-x-3 justify-center ${loading || error ? 'lg:justify-center' : 'lg:justify-start'} lg:gap-x-7`}>
      {
        loading ? <Loader loading={loading} /> :
        !error && places ? places.map(place => 
          <ImageCard 
            key={place.id}
            image={place.photo}
            title={place.title} 
            description={place.description}
            stars={place.points}
           />
        ) : <NoData message='Not found any place' />
      }
    </div>
  )
}

export default Places
