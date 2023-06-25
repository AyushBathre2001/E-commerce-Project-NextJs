import React from 'react'
const connectDB = require( '../middleware/connectDB')
import Order from '../models/Order'

const order = ({order}) => {
  let products = order.products
  return (
    <div >
      <section class="text-gray-600 body-font overflow-hidden w-full">
  <div class="container px-5 py-24  w-full">
    <div class="lg:w-4/5 mx-auto flex flex-wrap items-center justify-center">
      <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
        <h1 class="text-gray-800 text-2xl title-font font-semibold  mb-2">Order Id: #{order.orderId}</h1>
        <p class="leading-relaxed mb-4 text-green-600">Your order has been successfully placed</p>
        <div class="flex mb-4">
          <a class="flex-grow text-red-500 border-b-2 border-red-500 py-2 text-lg px-1">Item Description</a>
          <a class="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
          <a class="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Price</a>
        </div>

        {Object.keys(products).map((item)=>{
          return   <div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500">{products[item].name}</span>
          <span class="m-auto text-gray-900">{products[item].qty}</span>
          <span class="m-auto text-gray-900">{products[item].price}</span>
        </div>
        })}
      
      
       
        <div class="flex my-5">
          <span class="title-font font-medium text-2xl text-gray-900 ">Subtotal - {order.amount}/-</span>
          <button class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Track Order</button>
         
        </div>
      </div>
      <img alt="ecommerce" class="lg:w-1/3 w-full lg:h-auto h-64 object-cover object-center rounded" src="/carrybag.png"/>
    </div>
  </div>
</section>
    </div>
  )
}

export async function getServerSideProps(context) {
  connectDB()
  const order = await Order.findById(context.query.id)
 
  return { props:{order:JSON.parse(JSON.stringify(order))} }
}

export default order
