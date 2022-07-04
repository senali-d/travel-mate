import { useQuery } from '@apollo/client'

import { GET_GUIDES } from '../../graphql/queries'
import ProfileCard from '../common/card/profile-card'
import Loader from '../common/loader'
import NoData from '../common/no-data'

const Guides = () => {
  const { loading, error, data } = useQuery(GET_GUIDES);

  const guides = data && data.getGuideList

  return (
    <div className={`flex flex-row flex-wrap gap-y-7 gap-x-3 justify-center ${loading || error ? 'lg:justify-center' : 'lg:justify-start'} lg:gap-x-7`}>
      {
        loading ? <Loader loading={loading} /> :
        !error && guides ? guides.map(guide => 
          <ProfileCard 
            key={guide.id}
            image={guide.image} 
            name={guide.name}
            location={guide.location}
            email={guide.email} 
            mobile={guide.mobile}
          />
        ) : <NoData message='Not found any guide' />
      }
    </div>
  )
}

export default Guides
