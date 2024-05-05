import AddCredits from '@/components/credits/AddCredits'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'

const Credits = () => {
  return (
    <div className='container flex flex-col'>
        <Navbar />
        <AddCredits />
    </div>
  )
}

export default Credits