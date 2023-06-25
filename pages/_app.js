import React, { useEffect, useState } from 'react';
// import "../styles/style.scss";
import '../styles/globals.css';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router';
import Router from 'next/router'




function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user,setUser] = useState({value:null})
  const [key,setKey] = useState(0)
  const [progress, setProgress] = useState(0)


  useEffect(() => {

    Router.events.on("routeChangeStart", ()=>{
      setProgress(40)
      })
  
    Router.events.on("routeChangeComplete", ()=>{
      setProgress(100)
      })

    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')));
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      console.error(error);
      localStorage.clear()
    }

    const token = localStorage.getItem('token')
    if(token){
      setUser({value:token})
      setKey(Math.random())
    }

  }, [router.query]);

  const saveCart = (myCart) => {
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
    localStorage.setItem('cart', JSON.stringify(myCart));
  };



  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const addToCart = (itemcode, qty, price, name, size, variant) => {
    let newCart = { ...cart };
    if (itemcode in cart) {
      newCart[itemcode].qty = cart[itemcode].qty + qty;
    } else {
      newCart[itemcode] = { qty: 1, price, name, size, variant };
    }

    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (itemcode, qty, price, name, size, variant) => {
    let newCart = { ...cart };
    if (itemcode in cart) {
      newCart[itemcode].qty = cart[itemcode].qty - qty;
    }

    if (newCart[itemcode]['qty'] <= 0) {
      delete newCart[itemcode];
    }

    setCart(newCart);
    saveCart(newCart);
  };

  const buyNow = (itemcode, qty, price, name, size, variant) => {
    saveCart({})
    let newCart = {}
    newCart[itemcode] = { qty, price, name, size, variant } 
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')

  }

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css"
          rel="stylesheet"
        ></link>
        <title>E-commerce project - NextJs</title>
      </Head>

      <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar key={key}
      user = {user}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />

      <Component
        buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        user = {user}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
