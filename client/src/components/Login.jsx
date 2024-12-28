import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';

const Login = () => {

  const [state,setState] = useState('Login');
  const {setshowLogin} = useContext(AppContext);

  useEffect(()=>{
    document.body.style.overflow = 'hidden';
    return () => {
        document.body.style.overflow='unset';
    }
  },[])

  return (
    <>
    <div className='fixed top-0 left-0 right-0 bottom-0 z-1000 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        <motion.form 
        initial={{opacity:0.2,y:50}}
        transition={{duration:0.3}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>

           {state !== 'Login' && <div className='border px-4 py-1 flex items-center gap-0 rounded-full mt-4'>
                <img width={38} src={assets.user_icon} alt="" />
                <input className='outline-none text-sm ' type="text" placeholder='Full Name' required />
            </div>}
            <div className='border px-6 py-3 flex items-center gap-3 rounded-full mt-4'>
                <img width={20} src={assets.email_icon} alt="" />
                <input className='outline-none text-sm ' type="email" placeholder='Email id' required />
            </div>
            <div className='border px-6 py-3 flex items-center gap-3 rounded-full mt-4'>
                <img width={15} src={assets.lock_icon} alt="" />
                <input className='outline-none text-sm' type="password" placeholder='password' required />
            </div>

            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password?</p>

            <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'Login' : 'create account'}</button>

           {state === 'Login' ?  <p className='mt-5 text-center
            '>Don&apos;t have an account?
            <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign up')}>Sign up</span></p>
            :
            <p className='mt-5 text-center
            '>Already have an account?
            <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span></p> }

            <img onClick={() => setshowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />

        </motion.form>
    </div></>
  )
}

export default Login