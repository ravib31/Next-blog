import React from 'react'
import PostFormContextProvider from './context/PostFormContext'

const layout = ({children}) => {
  return (
    <PostFormContextProvider>{children}</PostFormContextProvider>
  )
}

export default layout