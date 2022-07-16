import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Tabs } from 'antd'
import { useNavigate } from 'react-router-dom'

import AuthContainer from '../../containers/auth'
import client from '../../apallo-client'
import RouteRegistry from '../../routes/RouteRegistry'
import { GET_FOLLOWERS, GET_FOLLOWING } from '../../graphql/queries'
import { UNFOLLOW } from '../../graphql/mutation'
import ProfileCard from '../common/card/profile-card'
import Loader from '../common/loader'
import NoData from '../common/no-data'
import MyProfile from './my-profile'

const Profile = () => {
  const { getUserInfo } = AuthContainer.useContainer()
  const navigate = useNavigate()
  const { id } = getUserInfo()
  
  const [followers, setFollowers] = useState(0)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null)
  const [following, setFollowing] = useState(0)
  const [loadingFollowing, setLoadingFollowing] = useState(true)
  const [errorsFollowing, setErrorsFollowing] = useState(null)
  
  const [deleteUser_follow] = useMutation(UNFOLLOW)

  const { TabPane } = Tabs

  const onChange = (key) => {
    console.log(key);
  }

  useEffect(() => {
    getFollowers()
    getFollowing()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getFollowers = async () => {
    const {
      data: { getUser_followUsingFollower_id },
      loading,
      errors,
    } = await client.query({
      query: GET_FOLLOWERS,
      variables: {
        id: id,
      },
    })
    setFollowers(getUser_followUsingFollower_id)
    setLoading(loading)
    setErrors(errors)
  }

  const getFollowing = async () => {
    const {
      data: { getUser_followUsingUser_id },
      loading,
      errors,
    } = await client.query({
      query: GET_FOLLOWING,
      variables: {
        id: id,
      },
    })
    setFollowing(getUser_followUsingUser_id)
    setLoadingFollowing(loading)
    setErrorsFollowing(errors)
  }

  const handleUnFollow = async(unfollowId) => {
    try {
      const {
        data: { deleteUser_follow: unfollow },
      } = await deleteUser_follow({
        variables: {
          id: unfollowId,
        },
      })
      if(unfollow) {
        const followings = following.filter(f => f.id !== unfollowId)
        setFollowing(followings)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleRedirect = (id) => {
    navigate(`${RouteRegistry.traveller.path}/${id}`)
  }

  return (
    <div className="md:w-[75%] w-[100%] m-auto bg-white rounded-lg border border-gray-200 shadow-md pt-7 pb-10">
      <div className="flex flex-col items-center">
        <div className="w-[90%]">
          <Tabs defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="Profile" key="1">
              <MyProfile />
            </TabPane>
            <TabPane tab="Followers" key="2">
              <div className="flex flex-row flex-wrap gap-y-7 gap-x-3  lg:gap-x-7">
                {loading ? (
                  <Loader loading={loading} />
                ) : !errors && followers && followers.length > 0 ? (
                  followers.map(({ userUsingUser_id: follower }) => (
                    <ProfileCard
                      key={follower.id}
                      image={follower.image}
                      name={follower.name}
                      onClick={()=>handleRedirect(follower.id)}
                    />
                  ))
                ) : (
                  <NoData icon={false} message="No Followers" />
                )}
              </div>
            </TabPane>
            <TabPane tab="Followings" key="3">
              <div className="flex flex-row flex-wrap gap-y-7 gap-x-3  lg:gap-x-4">
                {loadingFollowing ? (
                  <Loader loading={loading} />
                ) : !errorsFollowing && following && followers.length > 0 ? (
                  following.map(({ id, userUsingFollower_id: following }) => (
                    <ProfileCard
                      key={following.id}
                      image={following.image}
                      name={following.name}
                      btnTitle="Unfollow"
                      btnClick={() => handleUnFollow(id)}
                      onClick={()=>handleRedirect(following.id)}
                    />
                  ))
                ) : (
                  <NoData icon={false} message="No following" />
                )}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Profile
