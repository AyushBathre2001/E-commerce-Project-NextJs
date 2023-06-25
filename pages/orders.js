import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Link from 'next/link'

const Orders = () => {

    const [orders, setOrders] = useState([])


    useEffect(() => {
        const fetchOrders = async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
                token: localStorage.getItem('token')
            }).then(({ data }) => {
                axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/fetchorders`, {
                    email: data.user.email
                }).then(({ data }) => {
                    setOrders(data.orders)
                })

            })

        }

        fetchOrders()
    }, [])

    return (
        <div className=' container p-10 min-h-screen'>
            <h1 className='font-bold text-xl text-gray-700 py-5'>My Orders</h1>

            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-900 dark:text-gray-900">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((value) => {
                            let products = value.products;
                            return Object.keys(products).map((item) => {
                                return (
                                    <tr key={value._id} className="bg-white border-b dark:bg-gray-100 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                            {products[item].name}
                                        </th>
                                        <td className="px-6 py-4">{products[item].qty}</td>
                                        <td className="px-6 py-4">{products[item].price}</td>
                                        <Link href={`${process.env.NEXT_PUBLIC_HOST}/order?id=${value._id}`}><td className="px-6 py-4 text-blue-600">Details</td></Link> 
                                    </tr>
                                );
                            });
                        })}
                    </tbody>

                </table>
            </div>

        </div>
    )
}



export default Orders
