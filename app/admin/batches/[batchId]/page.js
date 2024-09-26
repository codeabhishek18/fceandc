'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import { useParams } from 'next/navigation'
import Progress from '@/app/components/progress/Progress'
import SessionCard from '@/app/components/sessionCard/SessionCard'
import Enrollment from '@/app/components/enrollment/Enrollment'
import { CircularProgress } from '@mui/material'
import { toast } from 'sonner'

const Batch = () =>
{
    const [ batch, setBatch ] = useState(null);
    const [ activeAgenda, setActiveAgenda ] = useState(-1);
    const [ isLoading, setIsLoading ] = useState(false);
    const { batchId } = useParams();
   
    const getBatch = async () =>
    {
        try
        {
            setIsLoading(true);
            const url = `/api/batch/${batchId}`
            const response = await axios.get(url);
            setBatch(response.data);
            setIsLoading(false);
        }
        catch(error)
        {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    useEffect(()=>
    {
       getBatch();
    },[])

     const updateSessionStatus = async (sessionId, status) =>
    {
        const updatedStatus = status === 'Upcoming' ? 'Completed' : 'Upcoming'
        const url = `/api/session/${sessionId}`
        await axios.put(url, {status : updatedStatus});
        getBatch();
    }

    // const removeBatch = async (id) =>
    // {
    //     try
    //     {
    //         const url = `${baseUrl}/batch/delete/${id}`
    //         const response = await axios.delete(url, batchData)
    //         setBatches(response.data)
    //     }
    //     catch(error)
    //     {
    //         console.log(error)
    //     }
    // }

    return(
        <div className={styles.wrapper}>
            {isLoading ?
            <div className={styles.spinner}>
                <CircularProgress sx={{color: '#3e4d42'}} />
            </div> :
            (batch ? <div className={styles.container} onClick={()=> setActiveAgenda(-1)}>
                
                <div className={styles.dashboard}>
                    <div className={styles.progress}>
                        <Progress batchData={batch} level='admin'/>
                    </div>
                    <div className={styles.list}>
                    {batch.sessions.map((session, index) =>
                    (
                        <SessionCard 
                            key={session._id} level="admin" session={session} index={index} 
                            updateSessionStatus={updateSessionStatus} 
                            setActiveAgenda={setActiveAgenda} activeAgenda={activeAgenda}
                        />
                    ))}
                    </div>
                </div>

                <div className={styles.enrollments}>
                {batch.enrollments.length ? 
                batch.enrollments.map((user)=>
                (
                    <Enrollment user={user}/>
                )) : 
                <p className={styles.noStudents}>No Enrollments</p>
                }
                </div>
            </div>: <></>) }
        </div>
    )
}

export default Batch