'use client'

import styles from './styles.module.css'
import { usePathname, useRouter } from 'next/navigation'

const Course = () =>
{
    const router =  useRouter();
    const pathname = usePathname();

    return(
        <div className={styles.container}>
            <div className={styles.card} onClick={()=> router.push(`${pathname}/lectures`)}>
                Lectures
            </div>
            <div className={styles.card} onClick={()=> router.push(`${pathname}/docs`)}>
                Docs
            </div>
        </div>
    )
}

export default Course