'use client'

import Image from 'next/image'
import styles from './styles.module.css'
import Lecturecard from '../lectureCard/LectureCard'
import { Rating } from '@mui/material'
import { useRouter } from 'next/navigation'

const CourseDetail = ({course}) =>
{
    const router = useRouter();

    const handleClick = () =>
    {
        localStorage.setItem('selectedCourse', course.id)
        router.push('/checkout')
    }

    return (
        <div className={styles.container}>
            <div className={styles.coverWrapper}>
                <Image className={styles.coverImage} src={course.imageURL} alt={course.title} width={100} height={100}/>
            </div>
            
            <div className={styles.header}>
                <p className={styles.title}>{course.title}</p>
                <p className={styles.description}>{course.description}</p>
            </div>

            <div className={styles.lectures}>
                {course.lectures.map((lecture, index)=>
                (
                    <Lecturecard level='visitor' key={lecture._id} lecture={lecture} index={index}/>
                ))}
            </div>  

            <div className={styles.footer}>
                <button className={styles.join} onClick={handleClick}>Join Now</button>
                <Rating name="half-rating-read" defaultValue={4.7} precision={0.5} readOnly size='large'/>
            </div>          
        </div>
    )
}

export default CourseDetail