'use client'

import { CircularProgress } from '@mui/material'
import styles from './styles.module.css'
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Lecturecard from '@/app/components/lectureCard/LectureCard';
import { toast } from 'sonner';
import Loading from '@/app/components/loading/Loading';

const Course = () =>
{
    const [ course, setCourse ] = useState(null);
    const [ isLoading,setIsLoading ] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const courseId = pathname.split('/')[3];

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
        <Loading/> :
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


// 'use client'

// import styles from './styles.module.css'
// import { usePathname, useRouter } from 'next/navigation'

// const Courses = () =>
// {
//     const router =  useRouter();
//     const pathname = usePathname();

//     return(
//         <div className={styles.container}>
//             <div className={styles.card} onClick={()=> router.push(`${pathname}/lectures`)}>
//                 Lectures
//             </div>
//             <div className={styles.card}>
//                 Docs
//             </div>
//         </div>
//     )
// }

// export default Courses