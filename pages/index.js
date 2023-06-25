import React, { useEffect } from 'react'
import styles from '../styles/home.module.css'
import Image from 'next/image'
import Link from 'next/link'


const Index = () => {


  return (
    <>
      <div className="overflow-hidden">
        <div className='absolute -z-10'>
        
          <Image src='/landing.jpg' width={1600} height={345} />
        </div>
        <section className="text-gray-600 body-font">
          <div className="container flex  flex-col justify-center items-end  pt-24 mx-auto">
            <div style={{fontFamily:'gilroy'}} className="flex flex-wrap p-8  mb-20 z-40 md:w-[60vw]  flex-col items-start justify-center text-center">
              <span className="text-6xl font-bold title-font mb-2 text-white ">Wear<span className='text-red-500'>shop</span>.com</span>
              <p className="lg:w-1/2 w-full text-left text-white font-semibold">Buy Tshirts, Hoodies, Mugs, and stickers with amazing deals.</p>
              <p className=' text-gray-900 mt-1 text-left text-sm font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum nesciunt nihil voluptatum, maxime voluptates dolore, aliquid vel autem quae, temporibus veritatis maiores voluptatem alias.</p>
            </div>
            <div className=" p-10 flex flex-wrap items-center justify-center gap-8 bg-white w-full">

              <Link href='/tshirts'>  <div className='w-96 h-96  rouded  overflow-hidden relative shadow-lg cursor-pointer '>
                <Image width={200} height={100}   className='w-full h-full object-cover  rounded   hover:scale-110 transition-all '  src="/tshirts.jpg" alt="" />
              </div></Link>
              <Link href='/hoodies'><div className='w-96 h-96  rouded  overflow-hidden relative  shadow-lg cursor-pointer'>
                <Image width={200} height={100}    className='w-full h-full object-cover rounded hover:scale-110  transition-all' src="/sty.jpg" alt="" />
              </div></Link>
              <Link href='/hoodies'>   <div className='w-96 h-96   rouded overflow-hidden relative  shadow-lg cursor-pointer'>
                <Image width={200} height={100}   className='w-full h-full object-cover  rounded   hover:scale-110  transition-all' src="/hoodie.jpg" alt="" />
              </div></Link>
              <Link href='/mugs'><div className='w-96 h-96   rouded overflow-hidden relative  shadow-lg cursor-pointer'>
                <Image width={200} height={100}  className='w-full h-full object-cover   rounded  hover:scale-110  transition-all'  src="/mugs.jpg" alt="" />
              </div></Link>
              <Link href='/stickers'><div className='w-96 h-96   rouded overflow-hidden relative  shadow-lg cursor-pointer'>
                <Image width={200} height={100}    className='w-full h-full object-cover  rounded   hover:scale-110  transition-all' src="/stickers.jpg" alt="" />
              </div></Link>
            
              
           
              
              
              

            </div>
            <div className='w-full relative'>
            <div style={{fontFamily:"gilroy",color:"white"}} className="w-[40vw] p-5 absolute right-28 top-44">
            <h1 className='text-5xl font-bold text-white'>GET FREE SHIPPING ON FIRST ORDER.</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-white mt-2 font-semibold">Buy Tshirts, Hoodies, Mugs, and stickers with amazing deals.</p>

           
            <Link href='/tshirts'><button className='bg-white text-black px-6 py-1 rounded font-semibold mt-3 cursor-pointer'>Shop</button></Link>
          </div>
              <Image width={1600} height={375} src="/model2.jpg" alt="" />
            </div>
            <div className='w-full flex flex-wrap bg-white items-center justify-center gap-10 p-10'>
            <div  className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-3">
                <Link href='/product/tshirts-dummy-1-xl-red' passHref>
                  <span className="relative flex justify-center object-top rounded overflow-hidden">
                    <img alt="ecommerce" className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block" src="https://m.media-amazon.com/images/I/51AoB62YsYL._AC_UL600_FMwebp_QL65_.jpg" />
                  </span>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-shirts</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">Regular Tshirt</h2>
                    <p className="mt-1">495/-</p>

              

                  </div>
                </Link>
              </div>
            <div  className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-3">
                <Link href='/product/Mug-1' passHref>
                  <span className="relative flex justify-center object-top rounded overflow-hidden">
                    <img alt="ecommerce" className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block" src="https://m.media-amazon.com/images/I/31SumjI-zsL._SX300_SY300_QL70_FMwebp_.jpg" />
                  </span>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Mugs</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">Stylish mug</h2>
                    <p className="mt-1">448/-</p>

               

                  </div>
                </Link>
              </div>
            <div  className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-3">
                <Link href='/product/Hoodies-dummy-1-xl-black' passHref>
                  <span className="relative flex justify-center object-top rounded overflow-hidden">
                    <img alt="ecommerce" className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block" src="https://m.media-amazon.com/images/I/41zIDDceK1L._AC_UL600_FMwebp_QL65_.jpg" />
                  </span>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Hoodies</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">Hoodie-black</h2>
                    <p className="mt-1">998/-</p>


                  </div>
                </Link>
              </div>
            <div  className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-3">
                <Link href='/product/Sticker-1' passHref>
                  <span className="relative flex justify-center object-top rounded overflow-hidden">
                    <img alt="ecommerce" className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block" src="https://m.media-amazon.com/images/I/816Jem42P2L._AC_UL600_FMwebp_QL65_.jpg" />
                  </span>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Stickers</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">Awesome stickers</h2>
                    <p className="mt-1">110/-</p>

                   

                   

                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap w-full -m-4 p-9 bg-white ">
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg flex flex-col items-center justify-center">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Premium Tshirts</h2>
                  <p className="leading-relaxed text-base">Our T-shirts are 100% made of cotton.</p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg flex flex-col items-center justify-center">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Free Shipping</h2>
                  <p className="leading-relaxed text-base">We ship all over India for FREE.</p>
                </div>
              </div>
              <div className="xl:w-1/3 md:w-1/2 p-4 ">
                <div className="border border-gray-200 p-6 rounded-lg flex flex-col items-center justify-center">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-4">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Exiting Offers</h2>
                  <p className="leading-relaxed text-base">We provide amazing offers & discounts on our products.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Index
