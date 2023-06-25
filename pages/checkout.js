import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

const Checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [fulladdress, setFullAddress] = useState({"name":'',"phone":'',"address":'',"city":'',"pincode":'',"state":''})
    const [disable,setDisable] = useState(true)

    useEffect(()=>{
        if(subTotal === 0){
            setDisable(true)
        }
    },[subTotal])


    useEffect(() => {
        const isFormValid =
          name.trim() !== '' &&
          phone.trim().length === 10 &&
          address.trim() !== '' &&
          pincode.trim().length === 6 &&
          city.trim() !== '' &&
          state.trim() !== '';
    
        setDisable(!isFormValid); 
      }, [name, phone, address, pincode, city, state]);

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
            if (e.target.value.length == 6) {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/pincodes`);
                if (Object.keys(data.pincodes).includes(e.target.value)) {
                    setCity(data.pincodes[e.target.value][0])
                    setState(data.pincodes[e.target.value][1])
                }
                else {
                    setCity('')
                    setState('')
                }


            }
            else {
                setCity('')
                setState('')
            }

        }

     
    }

    const handleOrder = async () => {


        const { data: { user } } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            token: localStorage.getItem('token')
        })

        const createOrderData = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/createorder`, {
            amount: subTotal,
            products: cart,
            address:{"name":name,"phone":phone,"address":address,"city":city,"pincode":pincode,"state":state}
            ,
            email: user.email
        })

        if (createOrderData.data.success === false) {
            toast.error(createOrderData.data.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            var options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: subTotal,
                currency: "INR",
                name: "Codeswear",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: createOrderData.data.order.id,
                callback_url: "http://localhost:3000/api/paymentverify",
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: "#3399cc"
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();
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
            <Head>
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            </Head>
            <div className='p-10 flex flex-col justify-center items-center'>
                <h1 className='font-bold text-gray-700 text-2xl my-3'>Checkout</h1>
                <div className='flex justify-center flex-col items-start w-full'>
                    <h3 className=' font-semibold my-2'>1. Delivery details</h3>

                </div>
                <div className="delivery ">
                    <section class="text-gray-600 body-font relative ">
                        <div class="container px-5 py-5 mx-auto ">

                            <div class="lg:w-1/2 md:w-2/3 mx-auto">
                                <div class="flex flex-wrap -m-2">
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                                            <input onChange={handleChange} value={name} type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="phone" class="leading-7 text-sm text-gray-600">Phone</label>
                                            <input onChange={handleChange} value={phone} type="text" id="phone" name="phone" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <div class="relative">
                                            <label for="address" class="leading-7 text-sm text-gray-600">Address</label>
                                            <textarea onChange={handleChange} value={address} id="address" name="address" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="pincode" class="leading-7 text-sm text-gray-600">Pincode</label>
                                            <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="city" class="leading-7 text-sm text-gray-600">City</label>
                                            <input onChange={handleChange} value={city} type="text" id="city" name="city" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div> <div class="p-2 w-1/2">
                                        <div class="relative">
                                            <label for="state" class="leading-7 text-sm text-gray-600">State</label>
                                            <input onChange={handleChange} value={state} type="text" id="state" name="state" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                    <h3 className='font-semibold'>2. Review items</h3>
                    <section>
                        <div className='p-4 z-40 h-full pl-16 bg-gray-100 w-full my-3'>
                            <div className='flex justify-center items-center flex-col '>


                                {Object.keys(cart).map((k) => {
                                    return <div key={k} className=" flex justify-start items-start w-full my-2 p-2">
                                        <h4 className='font-semibold'>&#8226; {cart[k].name} - ({cart[k].size}/{cart[k].variant}) </h4><span className=' flex ml-16'> <i onClick={() => { removeFromCart(k, 1, 499, cart[k].name, cart[k].size, cart[k].variant) }} class="ri-indeterminate-circle-fill mx-3 text-red-500 text-lg cursor-pointer"></i> {cart[k].qty} <i onClick={() => { addToCart(k, 1, 499, cart[k].name, cart[k].size, cart[k].variant) }} class="ri-add-circle-fill mx-3 text-green-500 text-lg cursor-pointer"></i></span>
                                    </div>
                                })}

                            </div>
                        </div>
                    </section>
                    <div className='flex flex-col justify-end items-center '>
                        <h2 className='font-bold text-gray-800'>Subtotal - ₹{subTotal}/-</h2>
                        <button disabled = {disable} onClick={handleOrder} className='rounded bg-pink-500 disabled:bg-pink-300 px-3 py-1 text-white my-5'>Pay ₹{subTotal}/-</button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout
