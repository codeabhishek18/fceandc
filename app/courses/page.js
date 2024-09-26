'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import CourseForm from '@/app/components/courseForm/CourseForm'
import CourseCard from '@/app/components/courseCard/CourseCard'
import { CircularProgress } from '@mui/material'
import { toast } from 'sonner'
import Header from '../components/header/Header'
import { faqData } from '@/utility/faqData'
import Accordian from '../components/accordian/Accordian'
import Footer from '../components/footer/Footer'

const Courses = () =>
{
    const [ courses, setCourses ] = useState(null);
    const  [ isLoading, setIsLoading ] = useState(false);    
    const [ showFaq, setShowFaq ] = useState(0);

    useEffect(()=>
    {
        getCourses();
    },[])

    const getCourses = async () =>
    {
        try
        {
            setIsLoading(true);
            const url = `/api/course`
            const response = await axios.get(url);
            setCourses(response.data.courses);
            setIsLoading(false);
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }

    const removeCourse = async (id) =>
    {
        try
        {
            const url = `/api/course/${id}`
            const response = await axios.delete(url)
            setCourses(response.data)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return(
        <div className={styles.wrapper}>
            <Header/>
            {isLoading ? 
            <div className={styles.spinner}>
                <CircularProgress sx={{color: '#3e4d42'}} />
            </div> :
            (courses ? 
            <div className={styles.container}>
                <div className={styles.courses}>
                    {courses?.map((course) =>
                    (
                        <CourseCard level="user" key={course._id} course={course} removeCourse={removeCourse}/>
                    ))}
                </div>
                <div className={styles.faq}>
                    <p className={styles.header}>FAQs</p>
                    {faqData.map((data, index)=>
                    (
                        <Accordian data={data} key={data.id} index={index} showFaq={showFaq} setShowFaq={setShowFaq}/>
                    ))}
                </div>
            </div>: <></>)}
            <Footer/>
        </div>
    )
}

export default Courses