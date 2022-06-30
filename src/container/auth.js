import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'

const useAuth = () => {
  const signIn = (response) => {
    console.log(response)
  }

  const logOut = () => {}

  return {
    signIn,
    logOut,
  };
};

export default createContainer(useAuth);