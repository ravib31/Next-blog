import AuthContextProvider from '@/lib/context/AuthContext'
import React from 'react'
import Sidebar from './components/Sidebar'

const layout = ({children}) => {
  return (
      <div>
        <AuthContextProvider>
            <div className='flex'>
        <Sidebar/>
        {children}
            </div>
        </AuthContextProvider>
        </div>
  )
}

export default layout