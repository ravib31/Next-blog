import { Contact, LayoutDashboard, Shapes, StickyNote } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    const link = [
        {
            name: 'Dashboard',
            link: '/admin',
            icon: <LayoutDashboard />
        },
        {
            name: 'Posts',
            link: '/admin/blogs',
            icon: <StickyNote />
        },
        {
            name: 'Categories',
            link: '/admin/categories',
            icon: <Shapes />
        },
        {
            name: 'Authors',
            link: '/admin/authors',
            icon: <Contact />
        },
    ]
  return (
    <div className='w-[200px] border-r h-screen p-6 '>
        <div className='w-full flex flex-col gap-6'>
        {link.map((item, index) => (
            <div key={index} className='flex font-bold items-center gap-3 px-4 py-2 bg-lime-200 hover:bg-lime-400 rounded-full'>
                {item.icon}
                <Link href={item.link}><span className='font-serif'>{item.name}</span></Link>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Sidebar