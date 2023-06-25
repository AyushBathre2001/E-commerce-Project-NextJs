import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = ({ user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {

  const router = useRouter()
  const sideRef = useRef()
  const [showbar, setShowbar] = useState(false)

  useEffect(() => {
    let exempted = ['/checkout', '/order', '/orders', '/', '/myaccount', '/forgot', '/login', '/signup'];
    if (exempted.includes(router.pathname)) {
      setShowbar(false);
    } else if (Object.keys(cart).length === 0) {
      setShowbar(false);
    } else {
      setShowbar(true);
    }
  }, [cart]);

  const onToggle = () => {
    if (Object.keys(cart).length > 0) {
      setShowbar(!showbar);
    }
  };


  const logout = () => {
    localStorage.removeItem('token')
    router.push('/')

  }

  return (
    <div className='sticky top-0 z-50 bg-red-50'>
      <header className="text-gray-600 body-font shadow-lg ">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href={'/'} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <h2 style={{ fontFamily: "gilroy" }} className="text-red-500 font-bold text-xl">Wearshop.com</h2>
          </Link>
          <form class="flex items-center">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-[300px] md:ml-8 ">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
              </div>
              <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5  dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-white " placeholder="Search" required />
            </div>
            <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-red-700 rounded-lg  dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span class="sr-only">Search</span>
            </button>
          </form>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">

            <Link href={'/tshirts'} className="mr-5 font-semibold  cursor-pointer hover:text-gray-900">Tshirts</Link>
            <Link href={'/hoodies'} className="mr-5  font-semibold  cursor-pointer hover:text-gray-900">Hoodies</Link>
            <Link href={'/mugs'} className="mr-5 font-semibold  cursor-pointer hover:text-gray-900">Mugs</Link>
            <Link href={'/stickers'} className="mr-5 font-semibold  cursor-pointer hover:text-gray-900">Stickers</Link>
            <Link href={'/about'} className="mr-5  font-semibold cursor-pointer hover:text-gray-900">About</Link>
            <Link href={'/contact'} className="mr-5  font-semibold  cursor-pointer hover:text-gray-900">Contact</Link>
          </nav>



          {
            user.value && <>   <Menu as="div" className="relative inline-block text-left mx-3">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white py-1 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <i class="ri-user-fill text-xl  text-black  cursor-pointer" aria-hidden="true"></i>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/myaccount"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          My Account
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/orders"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Orders
                        </Link>
                      )}
                    </Menu.Item>

                    <form method="POST" action="#">
                      <Menu.Item>
                        {({ active }) => (
                          <button

                            onClick={logout}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block w-full px-4 py-2 text-left text-sm'
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </form>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            </>
          }
          {
            !user.value && <Link href={'/login'}> <button className='px-4 py-1 rounded bg-red-500 text-white font-semibold mr-3'>Login</button> </Link>
          }
          <div className="px-3 py-1 shadow-sm ring-1 ring-inset ring-gray-300 rounded-md">
            <i onClick={onToggle} class="ri-shopping-cart-fill text-xl text-red-500 cursor-pointer"></i>

          </div>
          <div ref={sideRef} className={`p-7 w-80 z-40 h-full bg-red-50 fixed top-0 transition-all ${showbar ? 'right-0' : '-right-96'}`}>
            <i onClick={onToggle} class="ri-close-circle-fill text-2xl text-red-500 absolute top-2 right-2 cursor-pointer"></i>
            <div className='flex justify-center items-center flex-col '>
              <h1 className='font-bold text-xl my-5'>Cart <i class="ri-shopping-cart-fill text-2xl text-red-500 cursor-pointer"></i>
              </h1>

              {Object.keys(cart).map((k) => {
                return <div key={k} className=" flex justify-between items-start w-full my-2">
                  <h4 className='font-semibold'>&#8226; {cart[k].name} - ({cart[k].size}/{cart[k].variant}) </h4><span className=' flex'> <i onClick={() => { removeFromCart(k, 1, 499, cart[k].name, cart[k].size, cart[k].variant) }} class="ri-indeterminate-circle-fill mx-3 text-red-500 text-lg cursor-pointer"></i> {cart[k].qty} <i onClick={() => { addToCart(k, 1, 499, cart[k].name, cart[k].size, cart[k].variant) }} class="ri-add-circle-fill mx-3 text-green-500 text-lg cursor-pointer"></i></span>
                </div>
              })}



              <h2 className='font-bold text-gray-800 my-3'>Subtotal - {subTotal}/-</h2>
              <div className="action">

                <Link href={'/checkout'}>
                  <button className='rounded bg-red-500 px-3 py-1 mx-1 text-white my-5'>Checkout<i class="ri-handbag-fill text-xl mx-1"></i></button>
                </Link>
                <button onClick={() => { clearCart() }} className='rounded bg-red-500 px-3 py-1 mx-1 text-white my-5'>Clear cart<i class="ri-error-warning-fill text-xl mx-1"></i></button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
