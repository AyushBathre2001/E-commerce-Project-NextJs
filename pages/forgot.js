import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')

  const onChangeHandler = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value)
    }
    if (e.target.name == "password") {
      setPassword(e.target.value)
    }
    if (e.target.name == "cpassword") {
      setCpassword(e.target.value)
    }
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      email: email,
      sendemail: true
    })
    if (data.success) {
      toast.success('Please check your email.', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else{

      toast.error('Invalid credentials!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    }
  }


  const resetPassword = async (e) => {
    e.preventDefault()
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      fptoken:router.query.fp,
      password: password,
      sendemail: false
    })
    if(data.success){
      router.push('/login')
    }
    else{
      toast.error('Invalid credentials!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {!router.query.fp && <div>
        <div class="flex min-h-screen flex-col items-start justify-start pt-24 px-6 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className='flex w-full justify-center items-center'>
              <i class="ri-user-fill text-2xl text-black  cursor-pointer"></i>

            </div>
            <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password!</h2>

          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                  <input id="email" name="email" type="email" onChange={onChangeHandler} value={email} autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <button onClick={sendEmail} type="submit" class="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Continue</button>
              </div>
            </form>

            <p>{confirmation}</p>


          </div>
        </div>
      </div>}
      {router.query.fp && <div>
        <div class="flex min-h-screen flex-col items-start justify-start pt-24 px-6 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className='flex w-full justify-center items-center'>
              <i class="ri-user-fill text-2xl text-black  cursor-pointer"></i>

            </div>
            <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password!</h2>

          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">New password</label>
                <div class="mt-2">
                  <input id="password" name="password" type="password" onChange={onChangeHandler} value={password} autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Confirm New Password</label>
                <div class="mt-2">
                  <input id="cpassword" name="cpassword" type="password" onChange={onChangeHandler} value={cpassword} autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <button onClick={resetPassword} type="submit" class="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Submit</button>
              </div>
            </form>

            <p>{confirmation}</p>

          </div>
        </div>
      </div>}
    </>

  )
}

export default Forgot
