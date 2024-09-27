import styles from './BatchCard.module.css'
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FormatDate } from '@/utility/FormatDate';
import deleteIcon from '@/assets/delete.png'
import axios from 'axios';
import { toast } from 'sonner';

const BatchCard = ({type, level, data, participants, removeBatch, batchId}) =>
{
    const router = useRouter();
    const pathname = usePathname();

    const deleteBatch = async () =>
    {
        try
        {
            const url = `/api/batch/${data._id}`
            await axios.delete(url)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    const checkAccess = () =>
    {
        if(data.access === 'true')
            return router.push(`/dashboard/${data.title}`)
        else
            toast('Access Denied')
    }

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <Image className={styles.image} src={data.course.imageURL} alt={data.title} height={100} width={100}/>
                <p className={styles.batch}>{data.title.split('-')[1]}</p>
            </div>

            {level === 'admin' && type === 'batch' && <Image className={styles.deleteBatch} src={deleteIcon} alt='delete' onClick={deleteBatch}/>}

            <div className={styles.content}>
                <p className={styles.course}>{data.course.title}</p>
                <p className={styles.title}>{data.sessions.length} lectures</p>
                {/* {type === "admin" && <Image className={styles.delete} src={deleteIcon} alt='delete' onClick={() => removeBatch(data._id)}/>} */}
            </div>
            <div className={styles.footer}>
                {level === "admin" ? 
                (type === 'batch' ?
                <p className={styles.title}> Enrollments : {data.enrollments.length}</p> :
                <p className={styles.title}> Participants : {participants}</p>) : <p className={styles.status}>{data.status}</p>}
                
                {level === "admin" ?
                (type === 'batch' ? 
                <button className={styles.details} onClick={()=> router.push(`/admin/batches/${data.title}`)}>Details</button> :
                <button className={styles.details} onClick={()=> router.push(`${pathname}/${batchId}`)}>View scores</button>) : 
                <button className={styles.details} onClick={checkAccess}>View</button>}    
                
                <p className={styles.date}>{FormatDate(data.startDate)}</p>
            </div> 
        </div>
    )
}

export default BatchCard