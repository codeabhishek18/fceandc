'use client'

import Image from 'next/image'
import styles from './styles.module.css'
import video from '@/assets/video.png'
import MediaPlayer from '../mediaPlayer/MediaPlayer'
import { useState } from 'react'

const Lecturecard = ({lecture, level, type}) =>
{
    const [ play, setPlay ] = useState(false);

    return(
        <div className={level == 'admin' ? `${styles.container} ${styles.fullwidth}` : styles.container}>
            {type === 'dashboard' ? <p className={styles.title}>Revision {lecture.id}</p> : <p className={styles.title}>{lecture.title}</p>}
            {level === 'visitor' ? 
            <p className={styles.duration}>2 hours</p> :
            <button className={styles.recording} onClick={()=> setPlay(true)}><Image className={styles.video} src={video} alt='icon'/> Watch Recording</button>}

            {play && 
            <div className={styles.mediaPlayer}>
                <MediaPlayer title={lecture.title} source={lecture.recording} setPlay={setPlay}/>    
                <button className={styles.route} onClick={()=> setPlay(false)}>Back</button>
            </div>}
        </div>
    )
}

export default Lecturecard