import React, { useEffect, useState } from 'react'
import 'text-encoding';
import axios from 'axios'
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import Product from '../../models/Product'
import Error from 'next/error'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slug = ({buyNow,addToCart,product,variants,error}) => {
  const router = useRouter()

  const{slug} = router.query
  const [pin, setPin] = useState(''); 
  const [disable,setDisable] = useState(false)

  useEffect(()=>{
    if(!error){

      if(product.availableQty === 0){
        setDisable(true)
      }
    }
  })
  
  const serviceCheck = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/pincodes`);
    if (Object.keys(data.pincodes).includes(pin)) {
      toast.success('Yay! The service is available at this location.', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      toast.error('Sorry! The service is not available at this location yet.', {
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
  };
  

  const onChangePin = (e) => {
    setPin(e.target.value)
  }

  const [size,setSize] = useState(product.size)
  const [color,setColor] = useState( product.color)

  useEffect(()=>{
    if(!error){
      setSize(product.size)
      setColor(product.color)
    }
  },[])

  const refreshVariant = (newsize,newcolor)=>{
    setSize(newsize)
    setColor(newcolor)
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]['slug']}`
    router.push(url)
  }

  if (error==404) {
    return <Error statusCode={404} />
  }
  return (
    <div>
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
      <section class="text-gray-600 body-font overflow-hidden min-h-[80vh] flex items-center justify-center">
        <div class="container px-5 py-16">
          <div class="lg:w-4/5 mx-auto flex flex-wrap items-center justify-center">
            <img src={product.img}  alt="ecommerce" class="lg:w-1/3 w-full lg:h-auto px-24 sm:px-24 object-cover object-center rounded" />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">WEARSHOP</h2>
              <h1 class="text-gray-700 font-semibold text-3xl title-font mb-1">{product.title} ({product.size}/{product.color})</h1>
            
              <p class="leading-relaxed">{product.desc}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-2">
                <div class="flex">
                  <span class="mr-3">Color</span>
                  {color && Object.keys(variants).includes('red') && ( Object.keys(variants['red']).includes('S') || Object.keys(variants['red']).includes('M') || Object.keys(variants['red']).includes('L') || Object.keys(variants['red']).includes('XL') || Object.keys(variants['red']).includes('XXL')) && <button onClick={(e)=>{refreshVariant(size,'red')}} class={`border-2 border-gray-300 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-300'}`}></button> }
                  {color && Object.keys(variants).includes('blue') && ( Object.keys(variants['blue']).includes('S') || Object.keys(variants['blue']).includes('M') || Object.keys(variants['blue']).includes('L') || Object.keys(variants['blue']).includes('XL') || Object.keys(variants['blue']).includes('XXL')) && <button onClick={(e)=>{refreshVariant(size,'blue')}} class={`border-2 border-gray-300 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}`}></button> }
                  {color && Object.keys(variants).includes('green') && ( Object.keys(variants['green']).includes('S') || Object.keys(variants['green']).includes('M') || Object.keys(variants['green']).includes('L') || Object.keys(variants['green']).includes('XL') || Object.keys(variants['green']).includes('XXL')) && <button onClick={(e)=>{refreshVariant(size,'green')}} class={`border-2 border-gray-300 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-300'}`}></button> }
                  {color && Object.keys(variants).includes('yellow') && ( Object.keys(variants['yellow']).includes('S') || Object.keys(variants['yellow']).includes('M') || Object.keys(variants['yellow']).includes('L') || Object.keys(variants['yellow']).includes('XL') || Object.keys(variants['yellow']).includes('XXL')) && <button onClick={(e)=>{refreshVariant(size,'yellow')}} class={`border-2 border-gray-300 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'yellow' ? 'border-black' : 'border-gray-300'}`}></button> }
                  {color && Object.keys(variants).includes('black') && ( Object.keys(variants['black']).includes('S') || Object.keys(variants['black']).includes('M') || Object.keys(variants['black']).includes('L') || Object.keys(variants['black']).includes('XL') || Object.keys(variants['black']).includes('XXL')) && <button onClick={(e)=>{refreshVariant(size,'black')}} class={`border-2 border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-300'}`}></button> }
                </div>
                <div class="flex ml-6 items-center">
                  <span class="mr-3">Size</span>
                  <div class="relative">
                    <select value={size} onChange={(e)=>{refreshVariant(e.target.value,color)}} class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                      {size && Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                      {size && Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                      {size && Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                      {size && Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                      {size && Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                     

                    </select>
                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              {product.availableQty<10 && product.availableQty>0 ? <p className='text-red-500 mb-3 font-semibold'>Only {product.availableQty} left!</p> : ''}
              {product.availableQty === 0 ? <p className='text-red-500 mb-3 font-semibold'>Sorry! this product is out of stock.</p> : ''  }
              <div className="flex mt-5">
                <input onChange={(e)=>{onChangePin(e)}} value={pin} className='bg-slate-200 px-4 rounded' type="text" placeholder='Enter the Pincode' />
                <button onClick={serviceCheck} className='ml-2 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded'>Check</button>
              </div>
            
              <div class="flex mt-6">
                <span class="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
                <button disabled = {disable} onClick={()=>{buyNow(slug,1,product.price,product.title, product.size,product.color)}} class="flex ml-20 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Buy Now</button>
                <button disabled = {disable} onClick={()=>{addToCart(slug,1,product.price,product.title, product.size,product.color)}} class="flex ml-2 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Add to Cart</button>
                
              </div>
            
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}


export async function getServerSideProps(context) {

  let error = null

  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }

  let product = await Product.findOne({slug:context.query.slug})
  if(product == null){
    return {
      props: { error:404},
    }
  }
  let variants = await Product.find({title:product.title,category:product.category})

  let colorSizeSlug = {}  //{red:{xl:{slug:'wear-the-code-xl'}}}
  for(let item of variants){
    if(Object.keys(colorSizeSlug).includes(item.color)){
      colorSizeSlug[item.color][item.size] = {slug:item.slug}
    }
    else{
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = {slug:item.slug}
    }
  }


  return {
    props: { product: JSON.parse(JSON.stringify(product)) ,variants: JSON.parse(JSON.stringify(colorSizeSlug))},
  }
}

export default Slug
