import React from 'react'
import CategoryFormContextProvider from './context/CategoryFormContext'

const layout = ({children}) => {
  return (
    <CategoryFormContextProvider>{children}</CategoryFormContextProvider>
  )
}

export default layout