import React, { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Product from '../models/Product'
import connectDB from '../middleware/connectDB';


const Stickers = ({ products }) => {

  useEffect(() => {
    console.log(products)
  }, [])
  return (
    <div>
      <div className='flex items-center justify-center pt-10'>
        <h1 className='text-2xl text-gray-600 font-bold'>Results</h1>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-14 mx-auto">
          <div className="flex justify-center flex-wrap -m-4">
            {Object.keys(products).length === 0 ? <p>Sorry! The item is not availabe at this time.</p> :
              Object.keys(products).map((item) => {
                return <div key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-3">
                  <Link href={`/product/${products[item].slug}`} passHref>
                    <span className="relative flex justify-center object-top rounded overflow-hidden">
                      <img alt="ecommerce" className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block" src={products[item].img} />
                    </span>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Stickers</h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                      <p className="mt-1">{products[item].price}/-</p>

                      <div className="mt-3">
                        {products[item].size.includes('S') && <span className='border border-gray-300  p-1'>S</span>}
                        {products[item].size.includes('M') && <span className='border border-gray-300 mx-1 p-1'>M</span>}
                        {products[item].size.includes('L') && <span className='border border-gray-300 mx-1 p-1'>L</span>}
                        {products[item].size.includes('XL') && <span className='border border-gray-300 mx-1 p-1'>XL</span>}
                        {products[item].size.includes('XXL') && <span className='border border-gray-300 mx-1 p-1'>XXL</span>}
                      </div>

                      <div className="mt-1">
                        {products[item].color.includes('red') && <button class="border-2 border-gray-300 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                        }
                        {products[item].color.includes('blue') && <button class="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>
                        }
                        {products[item].color.includes('green') && <button class="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>
                        }

                      </div>

                    </div>
                  </Link>
                </div>
              })}


          </div>
        </div >
      </section >
    </div >
  );
}

export async function getServerSideProps() {
  connectDB()
  let products = await Product.find({ category: 'Stickers' });
  let stickers = {}
  for (let item of products) {
    if (item.title in stickers) {
      if (!stickers[item.title].color.includes(item.color) && item.availableQty > 0) {
        stickers[item.title].color.push(item.color)
      }
      if (!stickers[item.title].size.includes(item.size) && item.availableQty > 0) {
        stickers[item.title].size.push(item.size)
      }
    }
    else {
      stickers[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        stickers[item.title].color = [item.color]
        stickers[item.title].size = [item.size]
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(stickers)) },
  }
}

export default Stickers;
