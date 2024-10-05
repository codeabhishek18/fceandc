'use client'

import Image from 'next/image'
import styles from './styles.module.css' 
import logo from '@/assets/logo.png'
import HamburgerMenu from '../hamburgerMenu/HamburgerMenu'
import SlidingMenu from '../slidingMenu/SlidingMenu'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import logout from '@/assets/logout.png'
import close from '@/assets/close.png'
import { CircularProgress } from '@mui/material'
import Logout from '../logout/Logout'
import Link from 'next/link'

const Navbar = () =>
{
    const [ showSlider, setShowSlider ] = useState(false);
    const session = useSession();
    const { data, status } = useSession();
    const router = useRouter();

    return(
        <div className={styles.container}>
            <div className={styles.navigation}>
                <Image className={styles.logo} src={logo} alt='logo' onClick={()=> router.push('/')}/>
              
                <div className={styles.links}>
                    {(data?.user?.role === 'user' || data?.user?.role === 'admin') && <Link className={styles.link} href='/dashboard'>Dashboard</Link>}
                    <Link className={styles.link} href='/courses'>Courses</Link>
                    {/* <Link className={styles.link} href='/blogs'>Blogs</Link> */}
                    <Link className={styles.link} href='/about'>About</Link>
                </div>
                {!data?.user &&
                <div className={styles.controls}>
                    <button className={styles.route} onClick={()=> router.push('/login')}>Login</button>
                    <button className={styles.route} onClick={()=> router.push('/signup')}>Signup</button>
                </div>}
                <HamburgerMenu setShowSlider={setShowSlider}/>
            </div>

            {showSlider && 
            <div className={styles.slider}>
                <SlidingMenu setShowSlider={setShowSlider} />
            </div>}
        </div>
    )
}

export default Navbar
