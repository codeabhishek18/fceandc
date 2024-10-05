'use client'

import styles from './styles.module.css'  
import axios from "axios";
import { useSession } from "next-auth/react"
import Image from 'next/image';
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import { toast } from 'sonner';
import Link from 'next/link';
import SessionCard from '@/app/components/sessionCard/SessionCard';
import Lecturecard from '@/app/components/lectureCard/LectureCard';
import Loading from '@/app/components/loading/Loading';

export const pendingSessions = (sessions) =>
{
    return sessions.filter((session) => session.status === 'Upcoming').length
}

export const recordings = (sessions) =>
{
    return sessions.filter((session) => session.status === 'Completed').length
}

const Recording = () =>
{
    const { data, status } = useSession();
    const [ batchData, setBatchData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ activeAgenda, setActiveAgenda ] = useState(-1);
    const [ enrollment, setEnrollment ] = useState(null);
    const pathname = usePathname();
    const batchId = pathname.split('/')[2]
    const router = useRouter();
    
    const getBatchData = async () =>
    {
        try
        {
            setIsLoading(true);
            const url = `/api/batch/${batchId}`
            const response = await axios.get(url);
            if(response.data.access === 'false')
            {
                router.push('/dashboard')
                toast('Access Denied')
            }
            setBatchData(response.data)
            setIsLoading(false);
        }
        catch(error)
        {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    useEffect(() => 
    {
        if(status === "authenticated")
        {
            getBatchData();
        }
        else if(status === "unauthenticated")
            router.push('/')
        else
            setIsLoading(true);
            
    }, [status]);

    if(status === 'loading' || isLoading)
        return(
            <Loading/>   
        )

    return(
        <div onClick={()=> setActiveAgenda(-1)} className={styles.wrapper}>

        
                {batchData && 
                <div className={styles.container}>
                    <div className={styles.sessions}>
                        {batchData.sessions.map((session, index)=>
                        (
                            <div className={styles.sessions}>
                                {session.status === 'Completed' && 
                                <Lecturecard lecture={session} level='admin' type='dashboard'/>}
                            </div>
                        ))}
                    </div>
                </div>}
           
        </div>
    )
}

export default Recording