import { Suspense, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css'
import axios from 'axios';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { CircularProgress } from '@mui/material';

const Page = ({setShowResetEmail}) =>
{
    return(
        <Suspense>
            <OTPCard setShowResetEmail={setShowResetEmail}/>
        </Suspense>
    )
}

export default Page

const OTPCard = ({setShowResetEmail}) =>
{
    const [ OTP, setOTP ] = useState(new Array(6).fill(''));
    const [ userOTP, setUserOTP ] = useState(null);
    const [ isLoading,setIsLoading ] = useState(false);
    const params = useSearchParams();
    const userId = params.get('id');
    const otpRef = useRef([]);

    useEffect(()=>
    {
        getUserOTP();
        otpRef.current[0].focus();
    },[])

    const getUserOTP = async () =>
    {
        try
        {
            setIsLoading(true);
            const url = `/api/user/${userId}`
            const response = await axios.get(url);
            setUserOTP(response.data.otp);
            setIsLoading(false);
        }
        catch(error)
        {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    console.log(userOTP)

    const handleChange = (e, index) =>
    {
        const value = e.target.value;
        if(isNaN(value))
            return

        const updatedOTP = [...OTP];
        updatedOTP[index] = value.substring(value.length - 1);
        setOTP(updatedOTP);
        const enteredOTP = updatedOTP.join('');
        console.log(enteredOTP);
        if(index !== OTP.length - 1)
            otpRef.current[index+1].focus();
        else
        {
            if(userOTP.toString() === enteredOTP.toString())
                setShowResetEmail(true);
            else
                toast.error('Incorrect OTP')
            
        }
    }
    
    return(
        <div className={styles.container}>
            <p className={styles.header}>Enter 6 digit OTP</p>
            {isLoading ? <CircularProgress sx={{color: 'var(--action-color)'}}/> : 
             <div className={styles.otpInput}>
             {OTP.map((_, index)=>
             (
                 <input key={index} className={styles.digit} ref={(value) => otpRef.current[index] = value} value={OTP[index]} onChange={(e)=> handleChange(e, index)}/>
             ))}
             </div>} 
            <button className={styles.back}>Back</button>
        </div>
    )
}
