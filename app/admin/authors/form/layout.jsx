import React from 'react'
import AuthorFormContextProvider from './context/AuthorFormContext'

const layout = ({children}) => {
  return (
    <AuthorFormContextProvider>{children}</AuthorFormContextProvider>
  )
}

export default layout