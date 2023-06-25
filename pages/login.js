import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState } from 'react'

const login = () => {
  const router = useRouter()
  const [details,setDetails] = useState({email:'',password:''})

  const handleChanger = (e)=>{
    setDetails({...details,[e.target.name]:e.target.value})
  }

  const handleLogin = async (e)=>{
    e.preventDefault()
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`,{
      "email":details.email,
      "password":details.password
    })
    if(data.Success === true){
      localStorage.setItem('token',data.Token)
      router.push('/')
    }

  }


  return (
    <div>
      <div class="flex min-h-[80vh] flex-col justify-center items-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <div className='flex w-full justify-center items-center'>
  <i class="ri-user-fill text-2xl text-black  cursor-pointer"></i>

    </div>
    <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    <p class="mt-2 text-center text-sm text-gray-500">
      or 
      <Link href={'/signup'} class="font-semibold leading-6 text-red-600 hover:text-red-500 mx-1">signup</Link>
    </p>
  </div>
 
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-4" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" value={details.email} onChange={handleChanger} autocomplete="email" required class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <Link href={'/forgot'} class="font-semibold text-red-600 hover:text-red-500">Forgot password?</Link>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" value={details.password} onChange={handleChanger} autocomplete="current-password" required class="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" onClick={handleLogin} class="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Sign in</button>
      </div>
    </form>

   
  </div>
</div>
    </div>
  )
}

export default login
