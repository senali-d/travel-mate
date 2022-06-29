import { useQuery } from '@apollo/client'

import { GET_PLACES } from '../../graphql/queries'
import ImageCard from '../common/card/image-card'

const Places = () => {
  const { loading, error, data } = useQuery(GET_PLACES);

  const places = data && data.getPlacesList

  if (loading) return <p>Loading ...</p>

  if (error) return ''

  return (
    <div className="py-10 flex flex-row flex-wrap gap-y-7 gap-x-3 justify-center lg:justify-start lg:gap-x-7">
      {
        places && places.map(place => 
          <ImageCard 
            key={place.id}
            image={place.photo}
            title={place.title} 
            description={place.description}
            stars={place.points}
           />
        )
      }
    </div>
  )
}

export default Places
