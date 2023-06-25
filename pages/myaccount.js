import React, { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useRouter } from 'next/router';

const myaccount = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [password, setPassword] = useState('')
    const [npassword,setNpassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
                token: localStorage.getItem('token')
            })

            setName(data.user.name)
            setPhone(data.user.phone)
            setEmail(data.user.email)
            setAddress(data.user.address)
            setPincode(data.user.pincode)

        }

        fetchUser()
    }, [])

    const handleChange = async (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        else if (e.target.name === 'phone') {
            setPhone(e.target.value)
        }
        else if (e.target.name === 'address') {
            setAddress(e.target.value)
        }
        else if (e.target.name === 'pincode') {
            setPincode(e.target.value)
        }
        else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
        else if(e.target.name === 'npassword'){
            setNpassword(e.target.value)
        }
        else if (e.target.name === 'cpassword') {
            setCpassword(e.target.value)
        }

      

    }

    const changePassword = async ()=>{
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/changepassword`,{
            email,password,npassword
        })
        if(data.success){
            toast.success('Password Updated successfully!', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

                setPassword('')
                setNpassword('')
                setCpassword('')
        }
        else{
            toast.error('Something went wrong!', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const changeUserInformation = async () => {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/updateuserinformation`, {
            name, phone, address, email, pincode
        })

        if (data.success) {
            setName(data.info.name)
            setPhone(data.info.phone)
            setAddress(data.info.address)
            setPincode(data.info.pincode)

            toast.success('Updated successfully!', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

        }
        else{
            toast.error('Something went wrong!', {
                position: "top-left",
                autoClose: 2000,
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
                position="top-left"
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
            <div className='w-full flex justify-center items-center pt-8'>
                
            <h1 className='text-3xl font-bold text-gray-700'>My Account</h1>
            </div>
            <div className='container mx-auto p-12'>

                <h1 className='font-bold text-red-800 my-3 '>1.Update Your Information</h1>
                <div className="bg-gray-200">
                    <section class="text-gray-600 body-font relative   ">
                        <div class="container px-5 py-5 mx-auto ">

                            <div class="lg:w-1/2 md:w-2/3 mx-auto bg-gray-100 shadow-md p-6 rounded">
                                <div class="flex flex-wrap -m-2 ">
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                                            <input onChange={handleChange} value={name} type="text" id="name" name="name" class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="phone" class="leading-7 text-sm text-gray-600">Phone</label>
                                            <input onChange={handleChange} value={phone} type="text" id="phone" name="phone" class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <div class="relative">
                                            <label for="address" class="leading-7 text-sm text-gray-600">Address</label>
                                            <textarea onChange={handleChange} value={address} id="address" name="address" class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="pincode" class="leading-7 text-sm text-gray-600">Pincode</label>
                                            <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>

                                </div>
                                <button onClick={changeUserInformation} className='py-2 px-3 mt-3 bg-red-600 text-white  rounded'>Update</button>
                            </div>
                        </div>
                    </section>

                </div>
                <div className=" mt-20 ">
                    <h1 className='font-bold text-red-800 my-3'>2.Change Password</h1>
                    <section class="text-gray-600 body-font relative bg-gray-200  ">
                        <div class="container px-5 py-5 mx-auto ">

                            <div class="lg:w-1/2 md:w-2/3 mx-auto bg-gray-100 shadow-md p-6 rounded">
                                <div class="flex flex-wrap -m-2 ">
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="password" class="leading-7 text-sm text-gray-600">Current Password</label>
                                            <input onChange={handleChange} value={password} type="text" id="password" name="password" class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="cpassword" class="leading-7 text-sm text-gray-600">New Password</label>
                                            <input onChange={handleChange} value={npassword} type="text" id="npassword" name="npassword" class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="cpassword" class="leading-7 text-sm text-gray-600">Confirm New Password</label>
                                            <input onChange={handleChange} value={cpassword} type="text" id="cpassword" name="cpassword" class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>


                                </div>
                                <button disabled = { npassword && npassword === cpassword ? false : true} onClick={changePassword} className='py-2 px-3 mt-3 disabled:bg-red-300 bg-red-600 text-white  rounded'>Update</button>
                            </div>
                        </div>
                    </section>

                </div>

            </div>
        </>
    )
}

export default myaccount
