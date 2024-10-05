'use client'

import styles from './Header.module.css'
import user from '@/assets/user.png'
import logo from '@/assets/logo.png'
import close from '@/assets/close.png'
import Image from 'next/image';
import { useSession } from "next-auth/react"
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Logout from '../logout/Logout'
import Link from 'next/link'

const Header = () =>
{
    const router = useRouter();
    const { data, status } = useSession();
    const [ showDetails, setShowDetails ] = useState(false)

    return(
        <div className={styles.container}>
            <Image className={styles.logo} src={logo} alt='logo' onClick={()=> router.push('/')}/>
            
            <div className={styles.links}>
                {/* {(data?.user?.role === 'user' || data?.user?.role === 'admin') && <p className={styles.link} onClick={()=> router.push('/dashboard')}>Dashboard</p>} */}

                <Link className={styles.link} href='/courses'>Courses</Link>
                {/* <Link className={styles.link} href='/blogs'>Blogs</Link> */}
                <Link className={styles.link} href='/about'>About</Link>
                 
                {data?.user && <Image className={styles.profile} src={user} alt='profile' onClick={()=> setShowDetails(true)}/>}
            </div>
          
            {showDetails && 
            <div className={styles.user}>
                <Image className={styles.close} src={close} alt='close' onClick={()=> setShowDetails(false)}/>
                <p className={styles.name}>{data.user.email}</p>
                <p className={styles.name}>{data.user.name}</p>
                <Logout/>
            </div>}
        </div>
    )
}

export default Header
