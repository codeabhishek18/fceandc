'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import CourseForm from '@/app/components/courseForm/CourseForm'
import CourseCard from '@/app/components/courseCard/CourseCard'
import { CircularProgress } from '@mui/material'
import { toast } from 'sonner'

const Courses = () =>
{
    const [ courses, setCourses ] = useState(null);
    const  [ isLoading, setIsLoading ] = useState(false);
    const router =  useRouter();

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
            setCourses(response.data);
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
            <div className={styles.header}>
                <button className={styles.addCourse} onClick={()=> router.push('/admin/courses/create')}>+ Add Course</button>
            </div>
            {isLoading ? 
            <div className={styles.spinner}>
                <CircularProgress sx={{color: '#3e4d42'}} />
            </div> :
            (courses ? 
            <div className={styles.container}>
                <div className={styles.courses}>
                    {courses?.map((course) =>
                    (
                        <CourseCard level="admin" key={course._id} course={course} removeCourse={removeCourse}/>
                    ))}
                </div>
            </div>: <></>)}
        </div>
    )
}

export default Courses