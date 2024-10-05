'use client'

import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { faqData } from '@/utility/faqData'
import HeroSection from './components/heroSection/HeroSection'
import Accordian from './components/accordian/Accordian'
import Footer from './components/footer/Footer'
import { motion } from 'framer-motion'
import BoxReveal from "@/components/magicui/box-reveal";
import Image from 'next/image'
import chat from '@/assets/chat.png'
import close from '@/assets/close.png'
import Query from './components/query/Query'

const Home = () =>
{
    const [ showFaq, setShowFaq ] = useState(0);
    const [ showMessage, setShowMessage ] = useState(false);

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
            {showMessage && 
            <div className={styles.query}>
                <Query/>
            </div>}
            <Image className={styles.chat} src={showMessage ? close : chat} alt='chat' onClick={()=> setShowMessage(!showMessage)}/>
            <Footer/>
        </div>
    )
}

export default Home

