import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const {currentUser} = useSelector(state => state.user)

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className='rounded-full object-cover h-24  w-24 cursor-pointer self-center mt-2'/>

        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username'/>

        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email'/>

        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password'/>

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>


      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Acoount</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile