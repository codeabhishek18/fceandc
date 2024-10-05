'use client'

import { CircularProgress } from '@mui/material'
import styles from './styles.module.css'
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Lecturecard from '@/app/components/lectureCard/LectureCard';
import { toast } from 'sonner';

const Course = () =>
{

    const {courseId} = useParams();
    const [ course, setCourse ] = useState(null);
    const [  isLoading,setIsLoading ] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(()=>
    {
       getCourse();
    },[])

    const getCourse = async () =>
    {
        try
        {
            setIsLoading(true)
            const url = `/api/course/${courseId}`
            const response = await axios.get(url);
            setCourse(response.data);
            setIsLoading(false)
        }
        catch(error)
        {
            toast.error(error.message)
            setIsLoading(false)
        }
    }

    return(
        <div className={styles.wrapper}>
        {isLoading ? 
        <div className={styles.spinner}>
            <CircularProgress sx={{color: '#3e4d42'}} />
        </div> :
        (course ? 
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.addLecture} onClick={()=> router.push(`${pathname}/create`)}>+ Add Lecture</button>
            </div>
            <div className={styles.course}>
                {course.lectures?.map((lecture, index) =>
                (
                    <Lecturecard level='admin' lecture={lecture} index={index}/>
                ))}
            </div>
        </div>: <></>)}
    </div>
    )
}

export default Course
