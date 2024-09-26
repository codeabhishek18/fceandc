'use client'

import styles from './styles.module.css'
import compliance from '@/assets/cams.jpg'
import Image from 'next/image'
import Navbar from '../navbar/Navbar'
import div from '@/components/magicui/box-reveal'


const HeroSection = () =>
{

    return(
        <div className={styles.container}>
            <Navbar/>
            <Image className={styles.heroImage} src={compliance} alt='FINTS - FinCrime Trusted Source' priority={true} />

            <div className={styles.content}>
                <div className={styles.header}>
                    <p className={styles.heading}>Fast-Track Your CAMS & CGSS Journey Today</p>
                    <p className={styles.subHeading}>Get access to high-quality materials, live interactive classes and practice sessions, all crafted by industry expert to help you master the skills you need</p>
                    <button className={styles.enroll}>Get Started</button>
                </div>
                
            </div>
        </div>
    )
}

export default HeroSection