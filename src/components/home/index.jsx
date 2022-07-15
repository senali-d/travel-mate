import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'

import client from '../../apallo-client'
import AuthContainer from '../../containers/auth'
import RouteRegistry from '../../routes/RouteRegistry'
import { GET_PLACES, GET_USERS, GET_UNFOLLOW_USER } from '../../graphql/queries'
import { FOLLOW } from '../../graphql/mutation'
import ImageCard from '../common/card/image-card'
import Loader from '../common/loader'
import NoData from '../common/no-data'
import FlatCard from '../common/card/flat-card'

const Home = () => {
  const { isAuthenticated, getUserInfo } = AuthContainer.useContainer()
  const navigate = useNavigate()

  const [userId, setUserId] = useState(null)
  const [users, setUsers] = useState()
  const [userLoading, setUserLoading] = useState(true)
  const [userError, setUserError] = useState(null)

  const { loading, error, data } = useQuery(GET_PLACES);

  const places = data && data.getPlaceList

  const handleRedirect = (id) => {
    navigate(`${RouteRegistry.places.path}/${id}`)
  }
  
  const handleViewTraveller = (id) => {
    navigate(`${RouteRegistry.traveller.path}/${id}`)
  }

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  useEffect(() => {
    const user = getUserInfo()
    if (user !== undefined) {
      setUserId(user.id)
      if(isAuthenticated()) {
        getUnFollowUsers(user.id)
      }
    }
  }, [getUserInfo])

  const getUsers = async () => {
    const {
      data: { getTravellers },
      loading,
      errors,
    } = await client.query({
      query: GET_USERS
    })
    setUsers(getTravellers)
    setUserLoading(loading)
    errors && setUserError(errors)
  }

  const getUnFollowUsers = async(userId) => {
    const {
      data: { getUnFollowUsers },
      loading,
      errors,
    } = await client.query({
      query: GET_UNFOLLOW_USER,
      variables: {
        id: userId,
      },
    })
    setUsers(getUnFollowUsers)
    setUserLoading(loading)
    errors && setUserError(errors)
  }

  const starPoints = ({ points, reviewList }) => {
    if(reviewList.length > 0) {
      return points/reviewList.length
    }else {
      return points
    }
  }

  const [insertUser_follow] = useMutation(FOLLOW)

  const handleFollow = async(followId) => {
    try {
      const {
        data: { insertUser_follow: follow },
      } = await insertUser_follow({
        variables: {
          follower_id: followId,
          user_id: userId,
        },
      })
      if(follow) {
        const followings = users.filter(u => u.id !== follow.follower_id)
        setUsers(followings)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const notify = () => toast.warn("Please sign in follow travellers")

  return (
    <div className="flex">
      <div className="sm:w-2/3 w-full">
        <div className={`flex flex-row flex-wrap gap-y-7 gap-x-3 justify-start ${loading || error ? 'lg:justify-center' : 'lg:justify-start'} lg:gap-x-7`}>
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
                stylecss="md:w-[calc(50%-1rem)] w-full"
              />
            ) : <NoData message='Not found any place' />
          }
        </div>
      </div>
      <div className="sm:w-1/3 w-full">
        {isAuthenticated() ?
          <div className={`flex flex-col flex-wrap gap-y-7 gap-x-3 ${userLoading || userError ? 'lg:justify-center items-center' : 'items-end lg:justify-end'} lg:gap-x-7`}>
            {
              userLoading ? <Loader loading={userLoading} /> :
              !userError && 
              users ? users.map(user => 
                <FlatCard 
                  key={user.id}
                  image={user.image}
                  title={user.name}
                  stylecss="w-[90%]"
                  btnTitle="Follow"
                  onClick={()=>handleViewTraveller(user.id)}
                  btnClick={()=>handleFollow(user.id)}
                />
              ) : <NoData message='Not found any place' />
            }
          </div> :
          <div className={`flex flex-col flex-wrap gap-y-7 gap-x-3 ${userLoading || userError ? 'lg:justify-center items-center' : 'items-end lg:justify-end'} lg:gap-x-7`}>
            {
              userLoading ? <Loader loading={userLoading} /> :
              !userError && 
              users ? users.map(user => 
                <FlatCard 
                  key={user.id}
                  image={user.image}
                  title={user.name}
                  stylecss="w-[90%]"
                  btnTitle="Follow"
                  onClick={()=>handleViewTraveller(user.id)}
                  btnClick={notify}
                />
              ) : <NoData message='Not found any place' />
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Home
