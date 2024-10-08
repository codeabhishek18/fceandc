'use client'

import styles from './styles.module.css'
import compliance from '@/assets/cams.jpg'
import Image from 'next/image'
import Navbar from '../navbar/Navbar'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const HeroSection = () =>
{

    const { status } = useSession(); 

    return(
        <div className={styles.container}>
            <Navbar/>
            <Image className={styles.heroImage} src={compliance} alt='FCE&C' priority={true} />

            <div className={styles.content}>
                <div className={styles.header}>
                    <p className={styles.heading}>Fast-Track Your <span style={{color: 'var(--action-color)'}}>CAMS</span> & <span style={{color: 'var(--action-color)'}}>CGSS</span> Journey Today</p>
                    <p className={styles.subHeading}>Get access to high-quality materials, live interactive classes and practice sessions, all crafted by industry expert to help you master the skills you need</p>
                    <Link className={styles.enroll} href={status  === 'authenticated' ? '/dashboard' : '/courses'}>Get Started</Link>
                </div>
                
            </div>
        </div>
    )
}

export default HeroSection