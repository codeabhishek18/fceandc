import styles from './styles.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const CourseCard = ({level, course}) =>
{
    const router = useRouter();

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <Image className={styles.coverImage} src={course.imageURL} alt={course.id} width={100} height={100}/>
            </div>
            <div className={styles.courseContent}>
                <p className={styles.title}>{course.title}</p> 
                <div className={styles.price}>
                    <span className={styles.regularprice}>${course.price}</span>
                    <span className={styles.offerprice}>${course.offerPrice}</span>
                </div>
                <span className={styles.discount}>{Math.floor((course.price - course.offerPrice)*100/course.price)}% off</span>
                <div className={styles.footer}>
                    <p className={styles.lecture}>{course.lectures.length} lectures</p>           
                    <button className={styles.explore} onClick={()=> level === 'admin' ? router.push(`/admin/courses/${course.id}`) : router.push(`/courses/${course.id}`)}>View</button> 
                </div>
            </div>
        </div>
    )
}

export default CourseCard