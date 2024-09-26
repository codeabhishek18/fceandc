'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.css' 
import axios from "axios";
import { useParams, useRouter } from 'next/navigation';
import CourseDetail from '@/app/components/courseDetail/CourseDetail';
import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/Header';

const Course = () =>
{
    const [ course, setCourse ] = useState(null);
    const [ error, setError ] = useState(false);
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
            const url = `/api/course/${courseId}`
            const response = await axios.get(url);
            setCourse(response.data.course);
        }
        catch(error)
        {
            setError(true); 
        }
    }

    return(
        <div className={styles.wrapper}>
            <Header/>
            
            <div className={styles.container}>
                {course ?
                <CourseDetail course={course}/> :
                <></>}
            </div>
            <Footer/>
        </div>
    )
    
}

export default Course