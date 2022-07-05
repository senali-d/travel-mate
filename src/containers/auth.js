import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import { useMutation } from '@apollo/client'

import * as Storage from '../utils/local-storage'
import client from '../apallo-client'
import { GET_USER_BY_EMAIL } from '../graphql/queries'
import { CREATE_USER } from '../graphql/mutation'
import { Roles } from '../constants/enums'

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [userInfo, setUserInfo] = useState(undefined)

  useEffect(() => {
    validateToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const signIn = async(response) => {
    const { profileObj, tokenObj } = response
    Storage.set(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_IDENTIFIER, tokenObj.id_token)
    setAuthenticated(true)
    const user = await createUserLocally(profileObj.email)
    settingUserDataToLocalStorage(profileObj, user.role, user.id)
  }
  
  const logOut = () => {
    setUserInfo(undefined)
    setAuthenticated(false)
    Storage.remove(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_IDENTIFIER)
    Storage.remove(process.env.REACT_APP_LOCAL_STORAGE_USER_DATA_IDENTIFIER)
  }

  const isAuthenticated = () => {
    return authenticated
  }

  const getUserInfo = () => {
    return userInfo
  }

  const validateToken = () => {
    const token = Storage.get(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_IDENTIFIER)
    const userData = Storage.get(process.env.REACT_APP_LOCAL_STORAGE_USER_DATA_IDENTIFIER)
    const validation = checkForValidToken(token)
    if(token && userData && validation) {
      setAuthenticated(true)
      setUserInfo(userData)
    }
  }

  const settingUserDataToLocalStorage = (profileObj, role, id) => {
    const { email, name, imageUrl } = profileObj
    const obj = {
      name: name,
      email: email,
      image: imageUrl,
      role: role,
      id: id
    }
    Storage.set(process.env.REACT_APP_LOCAL_STORAGE_USER_DATA_IDENTIFIER, obj)
    setUserInfo(obj)
  }

  const checkForValidToken = (token) => {
    try {
      const tokenData = jwtDecode(token);
      const expireTimeStamp = tokenData.exp;
      const currentTimeStamp = moment().format("x") / 1000;
      if (expireTimeStamp < currentTimeStamp) {
        Storage.remove(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_IDENTIFIER)
        Storage.remove(process.env.REACT_APP_LOCAL_STORAGE_USER_DATA_IDENTIFIER)
        return false
      }
      return true;
    } catch (error) {
      return false
    }
  }

  const [createUser] = useMutation(CREATE_USER);

  const createUserLocally = async(email) => {
    try {
      const { data: {getUserByEmail} } = await client.query({
        query: GET_USER_BY_EMAIL,
        variables: {
          email: email
        }
      })
      const userExists = getUserByEmail
      if(!userExists) {
        const { data: {insertUser: newUser} } = await createUser({
          variables: {email: email, role: Roles.TRAVELLER }
        })
        return newUser
      }else {
        return userExists
      }
    } catch (error) {
      
    }
  }

  return {
    signIn,
    logOut,
    isAuthenticated,
    getUserInfo,
  }
}

export default createContainer(useAuth)