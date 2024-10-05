'use client'

import styles from './styles.module.css'  
import axios from "axios";
import { useSession } from "next-auth/react"
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import { toast } from 'sonner';
import SessionCard from '@/app/components/sessionCard/SessionCard';

const Dashboard = () =>
{
    const { data, status } = useSession();
    const [ batchData, setBatchData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false)
    const [ activeAgenda, setActiveAgenda ] = useState(-1);
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
            <div className={styles.spinner}>
                <CircularProgress sx={{color: '#D4313D'}} />
            </div>    
        )

    return(
        <div onClick={()=> setActiveAgenda(-1)} className={styles.wrapper}>
            {batchData &&
            <div className={styles.container} >
                <div className={styles.sessions}>
                    {batchData.sessions.map((session, index)=>
                    (
                        <SessionCard session={session} index={index} setActiveAgenda={setActiveAgenda} activeAgenda={activeAgenda} level='user' key={data._id}/>
                    ))}
                </div>
            </div>}

        </div>
    )
}

export default Dashboard