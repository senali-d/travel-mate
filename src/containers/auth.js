import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'
import jwtDecode from 'jwt-decode'
import moment from 'moment'

import * as Storage from '../utils/local-storage'

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [userInfo, setUserInfo] = useState(undefined)

  useEffect(() => {
    validateToken()
  },[])

  const signIn = (response) => {
    const { profileObj, tokenObj } = response
    console.log(response)
    Storage.set(process.env.REACT_APP_LOCAL_STORAGE_TOKEN_IDENTIFIER, tokenObj.id_token)
    settingUserDataToLocalStorage(profileObj)
    setAuthenticated(true)
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
    if(token, userData, validation) {
      setAuthenticated(true)
      setUserInfo(userData)
    }
  }

  const settingUserDataToLocalStorage = (profileObj) => {
    const { email, name, imageUrl } = profileObj
    const obj = {
      name: name,
      email: email,
      image: imageUrl,
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

  return {
    signIn,
    logOut,
    isAuthenticated,
    getUserInfo,
  }
}

export default createContainer(useAuth)