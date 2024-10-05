'use client'

import Image from 'next/image'
import styles from './styles.module.css'
import video from '@/assets/video.png'
import MediaPlayer from '../mediaPlayer/MediaPlayer'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

const Lecturecard = ({lecture, level, type}) =>
{
    const [ play, setPlay ] = useState(false);
    const [ videoSrc, setVideo ] = useState(null);

    // const handlePlay = async () =>
    // {
    //     try
    //     {
    //         const url = '/api/videos'
    //         const response = await axios.post(url, {objectKey: 'DAY17'});
            
    //         setVideo(response.data);
    //         setPlay(true);
            
    //     }
    //     catch(error)
    //     {
    //         toast.error(error.message);
    //     }
    // }

    return(
        <div className={level == 'admin' ? `${styles.container} ${styles.fullwidth}` : styles.container}>
            {type === 'dashboard' ? <p className={styles.title}>{lecture.title}</p> : <p className={styles.title}>{lecture.title}</p>}
            {level === 'visitor' ? 
            <p className={styles.duration}>2 hours</p> :
            <button className={styles.recording} onClick={()=> setPlay(true)}><Image className={styles.video} src={video} alt='icon'/> <span className={styles.watch}>Watch Recording</span></button>}

            {play && 
            <div className={styles.mediaPlayer}>
                <MediaPlayer title={lecture.title} source={lecture.recording} setPlay={setPlay}/>    
                <button className={styles.route} onClick={()=> setPlay(false)}>Back</button>
            </div>}
        </div>
    )
}

export default Lecturecard