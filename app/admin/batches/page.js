'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import BatchCard from '@/app/components/batchCard/BatchCard'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import Loading from '@/app/components/loading/Loading'

const Batches = () =>
{
    const [ batches, setBatches ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();

    const getBatches = async () =>
    {
        try
        {
            setIsLoading(true);
            const url = `/api/batch`
            const response = await axios.get(url);
            setBatches(response.data);
            setIsLoading(false);
        }
        catch(error)
        {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(()=>
    {
        getBatches();
    },[])

    const removeBatch = async (id) =>
    {
        try
        {
            const url = `/api/batch/${id}`
            await axios.delete(url, batchData)
            setBatches(response.data)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return(
        <div className={styles.wrapper}>
            {isLoading ? 
            <Loading/> :
            (batches ? 
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.addBatch} onClick={()=> router.push('/admin/batches/create')}>+ Add Batch</button>
                </div>
                <div className={styles.batches}>
                {batches.map((batch) =>
                (
                    <BatchCard type="batch" level="admin" key={batch._id} data={batch} removeBatch={removeBatch}/>
                ))}
                </div>
            </div>: <></>)}
        </div>
            
    )
}

export default Batches