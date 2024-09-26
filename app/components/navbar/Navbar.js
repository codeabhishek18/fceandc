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
    const [ showDetails, setShowDetails ] = useState(false)

    useEffect(()=>
    {
        console.log('load')
        session.update();
    },[])

    return(
        <div className={styles.container}>
            <div className={styles.navigation}>
                <Image className={styles.logo} src={logo} alt='logo' onClick={()=> router.push('/')}/>
              
                <div className={styles.links}>
                    <Link className={styles.link} href='/dashoard'>Dashboard</Link>
                    <Link className={styles.link} href='/courses'>Courses</Link>
                    <Link className={styles.link} href='/blogs'>Blogs</Link>
                    <Link className={styles.link} href='/about'>About</Link>
                </div>
                <div className={styles.controls}>
                    <button className={styles.route}>Login</button>
                    <button className={styles.route}>Signup</button>
                </div>
                <HamburgerMenu setShowSlider={setShowSlider}/>
            </div>

            {showDetails && 
            <div className={styles.user}>
                <Image className={styles.close} src={close} alt='close' onClick={()=> setShowDetails(false)}/>
                <p className={styles.name}>{data.user.email}</p>
                <p className={styles.name}>{data.user.name}</p>
                <Logout/>
            </div>}
            {showSlider && 
            <div className={styles.slider}>
                <SlidingMenu setShowSlider={setShowSlider} />
            </div>}
        </div>
    )
}

export default Navbar
