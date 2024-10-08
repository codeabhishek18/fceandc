import { useState } from 'react';
import styles from './styles.module.css'
import showIcon from '@/assets/showpassword.png'
import hideIcon from '@/assets/hidepassword.png' 
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const ResetEmailCard = ({user}) =>
{
    const [ showPassword, setShowPassword ] = useState(false);
    const params = useSearchParams();
    const userId = params.get('id');
    const router = useRouter();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        try
        {
            const formData = new FormData(e.currentTarget)
            const newPassword = formData.get('newPassword')
            const confirmPassword = formData.get('confirmPassword')

            if(!newPassword.length)
                return toast.error('Password cannot be empty')

            if(newPassword.length < 6)
                return toast.error('Password is too short')

            if(newPassword !== confirmPassword)
                return toast.error('Passwords do not match')

            try
            {
                const url = `/api/user/${userId}`;
                const response = await axios.put(url, {newPassword})
                toast.success(response.data.message)
                router.push('/login')
            }
            catch(error)
            {
                toast.error(error.message);
            }

        }
        catch(error)
        {
            toast.error(error)
        }
    } 

    return(
        <form className={styles.container} onSubmit={handleSubmit}>
            <input className={styles.email} name='newPassword' placeholder='New password' type={showPassword ? 'text' : 'password'}/>
            <input className={styles.email} name='confirmPassword' placeholder='Confirm password' type={showPassword ? 'text' : 'password'}/>
            <div className={styles.passwordCheck}>
                <Image className={styles.icon} src={showPassword ? showIcon : hideIcon} alt='img' onClick={()=> setShowPassword(!showPassword)}/>
                <p>Show password</p>
            </div>
            <button className={styles.submit} type='submit'>Reset</button>
        </form>
    )
}

export default ResetEmailCard