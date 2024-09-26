'use client'

import styles from './styles.module.css'
import { useState } from 'react'
import { faqData } from '@/utility/faqData'
import HeroSection from './components/heroSection/HeroSection'
import Accordian from './components/accordian/Accordian'
import Footer from './components/footer/Footer'
import { motion } from 'framer-motion'
import BoxReveal from "@/components/magicui/box-reveal";

const Home = () =>
{
    const [ showFaq, setShowFaq ] = useState(0);

    return(
        <div className={styles.wrapper}>
            <HeroSection />
            <div className={styles.container}>
                <div className={styles.faq}>
                    <p className={styles.commonHeader}>FAQs</p>
                    {faqData.map((data, index)=>
                    (
                        <Accordian data={data} key={data.id} index={index} showFaq={showFaq} setShowFaq={setShowFaq}/>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home

