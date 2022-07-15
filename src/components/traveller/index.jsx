import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import client from '../../apallo-client'
import RouteRegistry from '../../routes/RouteRegistry'
import AuthContainer from '../../containers/auth'
import { GET_USER_EXCEPT_ME, GET_ALL_USERS } from '../../graphql/queries'
import ProfileCard from '../common/card/profile-card'
import Loader from '../common/loader'
import NoData from '../common/no-data'

const Traveller = () => {
  const { isAuthenticated, getUserInfo } = AuthContainer.useContainer();
  const navigate = useNavigate()

  const [travellers, setTravellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");

  const {
    loading: loadingUser,
    error: errorsUser,
    data,
  } = useQuery(GET_ALL_USERS);

  const allTravellers = data && data.getAllTravellers;

  useEffect(() => {
    const user = getUserInfo();
    if (user !== undefined) {
      if (isAuthenticated()) {
        getTravellers(user.id);
      }
    }
  }, [getUserInfo]);

  const getTravellers = async (userId) => {
    const {
      data: { getUserExceptMe },
      loading,
      errors,
    } = await client.query({
      query: GET_USER_EXCEPT_ME,
      variables: {
        id: userId,
      },
    });
    setTravellers(getUserExceptMe);
    setLoading(loading);
    errors && setErrors(errors);
  }

  const handleRedirect = (id) => {
    navigate(`${RouteRegistry.traveller.path}/${id}`)
  }

  return (
    <>
      {isAuthenticated() ? (
        loadingUser ? (
          <Loader loading={loadingUser} />
        ) : (
          <div
            className={`flex flex-row flex-wrap gap-y-7 gap-x-3 justify-center ${
              loading || errors ? "lg:justify-center" : "lg:justify-start"
            } lg:gap-x-7`}
          >
            {!errors && travellers ? (
              travellers.map((traveller) => (
                <ProfileCard
                  key={traveller.id}
                  image={traveller.image}
                  name={traveller.name}
                  location={traveller.country}
                  email={traveller.email}
                  onClick={()=>handleRedirect(traveller.id)}
                />
              ))
            ) : (
              <NoData message="Not found any guide" />
            )}
          </div>
        )
      ) : loadingUser ? (
        <Loader loading={loadingUser} />
      ) : (
        <div
          className={`flex flex-row flex-wrap gap-y-7 gap-x-3 justify-center ${
            loadingUser || errorsUser ? "lg:justify-center" : "lg:justify-start"
          } lg:gap-x-7`}
        >
          {!errorsUser && allTravellers ? (
            allTravellers.map((traveller) => (
              <ProfileCard
                key={traveller.id}
                image={traveller.image}
                name={traveller.name}
                location={traveller.country}
                email={traveller.email}
                onClick={()=>handleRedirect(traveller.id)}
              />
            ))
          ) : (
            <NoData message="Not found any guide" />
          )}
        </div>
      )}
    </>
  );
};

export default Traveller
