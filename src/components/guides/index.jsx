import { useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { GET_GUIDES } from '../../graphql/queries'
import RouteRegistry from '../../routes/RouteRegistry'
import Button from '../common/button'
import ProfileCard from '../common/card/profile-card'
import Loader from '../common/loader'
import NoData from '../common/no-data'
import Image1 from '../../assets/images/guides/guide-1.jpg'
import Image2 from '../../assets/images/guides/guide-2.jpg'

const Guides = () => {
  const navigate = useNavigate()
  const { loading, error, data } = useQuery(GET_GUIDES)

  const guides = data && data.getGuideList

  return (
    <>
      <div className="w-full flex pb-10 flex-col lg:flex-row ">
        <div className="flex gap-5 flex-1 flex-wrap">
          <img
            src={Image1}
            alt="image"
            loading="lazy"
            className="rounded-2xl sm:w-1/3 md:w-4/12 lg:w-5/12 max-h-[300px]"
          />
          <img
            src={Image2}
            alt="image"
            loading="lazy"
            className="rounded-2xl sm:w-1/3 md:w-4/12 hidden sm:block lg:w-5/12 max-h-[300px]"
          />
        </div>
        <div className='pt-5'>
          <p className="text-lg text-gray-900 font-bold">
            Please contact us for join as Guide!
          </p>
          <Button
            title="Join as Guide"
            size='sm'
            onClick={() => navigate(RouteRegistry.contact.path)}
          />
        </div>
      </div>
      <div
        className={`flex flex-row flex-wrap gap-y-7 gap-x-3 justify-center ${
          loading || error ? "lg:justify-center" : "lg:justify-start"
        } lg:gap-x-7`}
      >
        {loading ? (
          <Loader loading={loading} />
        ) : !error && guides ? (
          guides.map((guide) => (
            <ProfileCard
              key={guide.id}
              image={guide.image}
              name={guide.name}
              location={guide.location}
              email={guide.email}
              mobile={guide.mobile}
            />
          ))
        ) : (
          <NoData message="Not found any guide" />
        )}
      </div>
    </>
  )
}

export default Guides
