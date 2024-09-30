import { Signature, StickyNote, TypeOutline } from 'lucide-react'
import React from 'react'
import CountCard from './components/CountCard'

const page = () => {
  return (
    <div className='p-10'>
      <div className='flex gap-4'>
     <CountCard  icon={<StickyNote/>} name={'Posts'} path={'posts'}/>
     <CountCard  icon={<Signature />} name={'Authors'} path={'authors'}/>
     <CountCard  icon={<TypeOutline />} name={'Categories'} path={'categories'}/>
    </div>
    </div>
  )
}

export default page