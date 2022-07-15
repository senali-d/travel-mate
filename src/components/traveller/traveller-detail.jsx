import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import client from '../../apallo-client'
import { GET_TRAVELLER } from '../../graphql/queries'
import RouteRegistry from '../../routes/RouteRegistry'
import ImageCard from '../common/card/image-card'
import Loader from '../common/loader'
import NoData from '../common/no-data'
import Thumbnail from '../../assets/images/thumbnail.png'

const TravellerDetail = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [profile, setProfile] = useState('')
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)
  const [loading, setLoading] = useState(true)

  const id = pathname.split("/")[2]

  useEffect(() => {
    getProfile()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getProfile = async () => {
    const {
      data: { getUser },
      loading,
    } = await client.query({
      query: GET_TRAVELLER,
      variables: {
        id: id,
      },
    })
    successHandler(getUser, loading)
  }

  const successHandler = (profile, loading) => {
    setProfile(profile)
    setFollowers(profile.user_followListUsingFollower_id.length)
    setFollowing(profile.user_followListUsingUser_id.length)
    setLoading(loading)
  }

  const starPoints = ({ points, reviewList }) => {
    if(reviewList.length > 0) {
      return points/reviewList.length
    }else {
      return points
    }
  }

  const handleRedirect = (id) => {
    navigate(`${RouteRegistry.places.path}/${id}`)
  }

  return (
    <div className="md:w-[75%] w-[100%] m-auto rounded-lg pt-7 pb-10">
      <div className="flex flex-col items-center">
        <div className="w-[90%]">
          <div className="w-full flex flex-row flex-wrap gap-2">
            <div className="w-full flex flex-col bg-white py-5 items-center rounded-xl mb-5">
              {loading ? <Loader loading={loading} /> :
                <>
                  <img
                    className="w-24 h-24 rounded-full shadow-lg mb-5"
                    src={profile !== '' ? profile?.image : Thumbnail}
                    alt={profile?.name}
                  />
                  <div className="flex">
                    <span className="flex flex-col items-center gap-1 text-sm text-gray-500 text-center px-4 pb-2">
                      <div>{followers}</div>
                      <div>Followers</div>
                    </span>
                    <span className="flex flex-col items-center gap-1 text-sm text-gray-500 text-center px-4 pb-2">
                      <div>{following}</div>
                      <div>Following</div>
                    </span>
                  </div>
                </>
              }
            </div>
            <div className={`w-full flex flex-row flex-wrap ${profile ? 'justify-between' : 'justify-center' }`}>
            {loading ? <Loader loading={loading} /> :
              profile ? profile?.placeList.map(place => 
              <ImageCard 
                key={place.id}
                image={place.photo}
                title={place.title} 
                description={place.description}
                stylecss="md:w-[calc(50%-1rem)] w-full mb-5"
                stars={starPoints(place)}
                onClick={() => handleRedirect(place.id)}
              />
              ) : <NoData message='Not found any place' />
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravellerDetail
