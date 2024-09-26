'use client'

import styles from './Progress.module.css'
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PieChartWithPaddingAngle from '../piechart/PieChart';
import { useSession } from 'next-auth/react';
import { calculateResult } from '@/utility/calculateScores';

const options = { year: 'numeric', month: 'long', day: 'numeric' };
export const pendingSessions = (sessions) =>
{
    return sessions.filter((session) => session.status === 'Upcoming').length
}

const Progress = ({batchData, level, assessments}) =>
{
    const [ whatsapplink, setWhatsapplink ] = useState('');
    const [ zoomLink, setZoomLink ] = useState('');
    const [ showwlink, setShowWlink ] = useState(false);
    const [ showzlink, setShowZlink ] = useState(false);
    const [ showCertificate, setShowCertificate ] = useState(false);
    const divRef = useRef(null);
    const router = useRouter();
    const { data } = useSession();
    
    const addWhatsappLink = async () =>
    {
        const url = `/api/links/whatsapp/${batchData._id}`
        await axios.post(url, {link : whatsapplink})
        setShowWlink(false)
        setWhatsapplink('');
    }

    const addZoomLink = async () =>
    {
        const url = `/api/links/zoom/${batchData._id}`
        await axios.post(url, {link : zoomLink})
        setShowZlink(false)
        setZoomLink('');
    }

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.courseTitle}>{batchData.title}</h1>
                <p className={styles.dates}>{new Date(batchData.startDate).toLocaleDateString('en-US', options)} - {new Date(batchData.endDate).toLocaleDateString('en-US', options)} </p>
            </div>
            <div className={styles.progress}>
                {/* <p className={styles.progressTitle}>Progress</p> */}
            </div>
            <div className={styles.batch}>
                <div className={styles.group}>
                    <p className={styles.mentor}>Sprint mentor</p>
                    <span>{batchData.mentor.name}</span>
                </div>
                <div className={styles.group}>
                    <p className={styles.batchCode}>Completion</p>
                    <span>{Math.ceil((batchData.sessions?.length - pendingSessions(batchData.sessions))*100/batchData.sessions.length)}%</span>
                </div>
                <div className={styles.group}>
                    <p className={styles.groupTitle}>Whatsapp group</p>
                    {level === "user" ? <button className={styles.connect}>Connect</button> :
                    <button className={styles.connect} onClick={()=> setShowWlink(true)}>Add link</button>}
                </div>
               {showwlink && <div className={styles.addlink}>
                    <input className={styles.link} placeholder='add whatsapp link' value={whatsapplink} onChange={(e)=> setWhatsapplink(e.target.value)}/>
                    <button className={styles.button} onClick={addWhatsappLink}>Add</button>
                </div>}
                <div className={styles.group}>
                    <p className={styles.groupTitle}>Zoom link</p>
                    {level === "user" ? <button className={styles.connect}>Connect</button> :
                    <button className={styles.connect} onClick={()=> setShowZlink(true)}>Add link</button>}  
                </div>
                {showzlink && <div className={styles.addlink}>
                    <input className={styles.link} placeholder='add zoom link' value={zoomLink} onChange={(e)=> setZoomLink(e.target.value)}/>
                    <button className={styles.button} onClick={addZoomLink}>Add</button>
                </div>}
            </div>
         </div>
    )
}

export default Progress