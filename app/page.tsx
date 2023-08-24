'use client'
import { Inter } from '@next/font/google'
import Image from 'next/image'
import Hero from '/app/images/hero_img 1.png'
import { Button, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'url';


const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const options = [
    {value: 'Program',label: 'Program'},
    {value: 'University',label: 'University'}
  ]
  
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (inputValue) {
      const searchUrl = format({
        pathname: '/search',
        query: { keyword: inputValue },
      });

      router.push(searchUrl);
    }
  };

  return (
    <main className={inter.className}>
      <section className="flex flex-col items-center justify-center relative" style={{ minHeight: 'calc(100vh - 5rem)' }}>
        <h1 className="bg-clip-text text-transparent bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-500 to-red-800 text-6xl font-bold mb-4 text-center">UNLOCK YOUR FUTURE</h1>
        <p className="text-gray-800 mb-4 text-center">Study in China and Gain a Global Perspective</p>
        <div className="max-w-full max-h-[500px] overflow-hidden pt-10 md:pt-20">
          <Image
            src={Hero}
            alt="Hero Image"
            className="w-full h-auto"
          />
        </div>
        <div className='py-10 bg-[#F5F5F5] w-full md:w-2/4 flex flex-col md:flex-row items-center justify-center relative rounded-lg '>
          <Button href='/search' onClick={handleSearch} type="primary" danger className='py-2 px-4 bg-red-500 text-white rounded-md flex items-center mb-3 md:mb-0 md:mr-5'>
            <SearchOutlined />
            Search
          </Button>
          <Button href='/management' type="primary" danger className='py-2 px-4 bg-red-500 text-white rounded-md flex items-center'>
            Manage Scholarships
          </Button>
        </div>
      </section>

    </main>
  )
}
