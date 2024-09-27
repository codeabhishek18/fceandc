'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.css' 
import axios from "axios";
import { useParams, useRouter } from 'next/navigation';
import CourseDetail from '@/app/components/courseDetail/CourseDetail';
import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/Header';
import { CircularProgress } from '@mui/material';

const Course = () =>
{
    const [ course, setCourse ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const { courseId } = useParams();
    const router = useRouter();
    
    useEffect(()=>
    {
        getCourses();
    },[]);

    const getCourses = async () =>
    {
        try
        {
            setIsLoading(true)
            const url = `/api/course/${courseId}`
            const response = await axios.get(url);
            setCourse(response.data.course);
            setIsLoading(false);
        }
        catch(error)
        {
            setIsLoading(false);
        }
    }

    return(
        <div className={styles.wrapper}>
            <Header/>
    
            {isLoading ? 
            <div className={styles.spinner}>
                <CircularProgress sx={{color: '#3e4d42'}} />
            </div> :
            (course ? 
            <div className={styles.container}>
                <CourseDetail course={course}/>
            </div>: <></>)}
            <Footer/>
        </div>
    )
    
}

export default Course