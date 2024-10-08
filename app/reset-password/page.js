'use client'

import { CircularProgress, Input } from '@mui/material'
import styles from './styles.module.css'
import logo from '../../assets/logo.png'
import Image from 'next/image'
import { Suspense, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import OTPCard from '../components/otpCard/OTPCard'
import ResetEmailCard from '../components/resetEmailCard/ResetEmailCard'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const Page = () => {
    return (
      <Suspense fallback={<div>Loading search parameters...</div>}>
        <ResetPassword />
      </Suspense>
    );
  };
  
export default Page;

const  ResetPassword = (e) =>
{
    const [ email, setEmail ] = useState('');
    const [ showOTP, setShowOTP ] = useState(false);
    const router = useRouter(); 
    const [ showResetEmail, setShowResetEmail ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const params = useSearchParams();

    useEffect(()=>
    {
        if(params.get('id'))
            setShowOTP(true);
    },[])

    const handleSend = async (e) =>
    {
        e.preventDefault();
        
        try
        {
            setIsLoading(true);
            const url = '/api/verify'
            const response = await axios.post(url, {email});
            router.push(`/reset-password?id=${response.data.user._id}`)
            toast(response.data.message);  
            setShowOTP(true);
            setIsLoading(false);
        }
        catch(error)
        {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    return(
        <div className={styles.wrapper}>
            {/* <div className={styles.container}>
                <Image className={styles.logo} src={logo} alt='logo' />
                {!showResetEmail ?
                (!showOTP ? 
                <div className={styles.resetMail}>
                    <Input className={styles.input} color='grey' sx={{color: 'white'}} placeholder='Enter your registered email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    {isLoading ? <CircularProgress sx={{color:'var(--action-color)'}}/> : <button className={styles.submit} onClick={handleSend}>Send</button>}
                    <p className={styles.message}>A 6 digit OTP will be sent to your registered email</p>
                </div> : 
                <OTPCard setShowOTP={setShowOTP} setShowResetEmail={setShowResetEmail}/>):
                <ResetEmailCard/>}
            </div> */}
        </div>
    )
}
