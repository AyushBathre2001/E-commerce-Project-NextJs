import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const Signup = () => {
  const router = useRouter()
  const [details,setDetails] = useState({name:'',email:'',phone:'',password:''})

  const handleChanger = (e)=>{
    setDetails({...details,[e.target.name]:e.target.value})
  }

  const handleSignup = async (e)=>{
    e.preventDefault()
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/signup`,{
      "name":details.name,
      "email":details.email,
      "phone":details.phone,
      "password":details.password
    })

    router.push('/login')
  }

  return (
    <div>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <div className='flex w-full justify-center items-center'>
  <i class="ri-user-fill text-2xl text-black  cursor-pointer"></i>

    </div>
    <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in for an account</h2>
    <p class="mt-2 text-center text-sm text-gray-500">
      or 
      <Link href={'/login'} class="font-semibold leading-6 text-red-600 hover:text-red-500 mx-1">login</Link>
    </p>
  </div>
 
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-4" action="#" method="POST">
      <div>
        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
        <div class="mt-2">
          <input id="name" name="name" value={details.name} onChange={handleChanger} type="text" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" value={details.email} onChange={handleChanger} autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Phone</label>
        <div class="mt-2">
          <input id="phone" name="phone" type="text" value={details.phone} onChange={handleChanger} autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" value={details.password} onChange={handleChanger} autocomplete="current-password" required class="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" onClick={handleSignup} class="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Sign up</button>
      </div>
    </form>

   
  </div>
</div>
    </div>
  )
}

export default Signup
