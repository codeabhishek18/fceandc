import Image from 'next/image'
import styles from './styles.module.css'
import google from '@/assets/google.png'
import { signIn } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const GoogleAuth = ({setIsLoading}) =>
{
    const pathname = usePathname();
    const callbackUrl = pathname || '/dashboard'

    const handleClick = () =>
    {
        setIsLoading(true);
        signIn('google', { callbackUrl });
        setIsLoading(false);
    }

    return(
        <div className={styles.container} onClick={handleClick}> 
            <Image className={styles.googleIcon} src={google} alt='google' />
            <button className={styles.title}>Sign in with Google</button>
        </div>
    )
}

export default GoogleAuth