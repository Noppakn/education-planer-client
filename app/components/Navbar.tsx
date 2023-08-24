import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Logo from 'app/images/logo.png'

export default function Navbar() {
  return (
    <nav className= "flex items-center justify-center bg-white shadow-md h-23">
        <div className="bg-white text-center p-3">
          <a href="/" className="block">
            <Image alt="" src={Logo} className='mx-auto w-auto h-16'/>
            </a>
        </div>
    </nav>
  )
}
