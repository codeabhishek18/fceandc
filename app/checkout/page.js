'use client'

import { useEffect, useState } from 'react'
import BillingCard from '../components/billingCard/BillingCard'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import styles from './styles.module.css'
import axios from 'axios'
import Image from 'next/image'
import { CircularProgress, FormControl, InputLabel, MenuItem, Rating, Select } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Loading from '../components/loading/Loading'
import { FormatDate } from '@/utility/FormatDate'
import deleteIcon from '@/assets/delete.png'
import Link from 'next/link'

const Checkout = () =>
{
    const [ course, setCourse ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const { data, status } = useSession();
    const [ batches, setBatches ] = useState(null);
    const [ selectedBatch, setSelectedBatch ] = useState(false);
    const [ restrictUser, setRestrictUser ] = useState(false);

    useEffect(()=>
    {
        if(status === 'unauthenticated')
        {
            signIn(null, {callbackUrl: '/checkout'})
        }
    },[status])

    useEffect(()=>
    {
        const courseId = localStorage.getItem('selectedCourse')
        if(courseId)
            getCourse(courseId);
    },[])

    useEffect(()=>
    {
        if(batches && status === 'authenticated')
        {
            const isUser = batches.map((batch)=> batch.enrollments).reduce((acc, cur) =>  [...acc, ...cur],[]).find((enrollment)=> enrollment.user === data.user.id)
            if(isUser)
                setRestrictUser(true)
        }
    },[batches, status])

    const getCourse = async (courseId) =>
    {
        try
        {
            setIsLoading(true);
            const url = `/api/course/${courseId}`
            const response = await axios.get(url);
            const completedBatches = response.data.batches.filter((batch) => batch.status !== 'Completed');

            
            setBatches(completedBatches);
            setCourse(response.data);
            setIsLoading(false);
        }
        catch(error)
        {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    const clearCart = () =>
    {
        localStorage.removeItem('selectedCourse');
        setCourse(null);
    }

    if(restrictUser)
        return(
        <div className={styles.cartWrapper}>
            <p>You have already enrolled</p>
            <Link href='/dashboard' className={styles.dashboard}>Go to Dashboard</Link>
        </div>)

    return(
        <div className={styles.wrapper}>
            <Header/>
            {status === 'loading' || isLoading ?
            <Loading/> : 
            (course ? 
            <div className={styles.container}>
                <div className={styles.register}>
                    <div className={styles.card}>
                        <Image className={styles.displayImage} src={course.imageURL} alt={course.id} width={100} height={100}/>
                        
                        <div className={styles.content}>
                            <p className={styles.title}>{course.title}</p>
                            <Rating name="half-rating-read" defaultValue={4.7} precision={0.5} readOnly size='small'/>
                            {/* <p className={styles.date}>Starting from {FormatDate(selectedBatch.startDate)}</p> */}
                        </div>
                        <Image className={styles.delete} src={deleteIcon} alt='icon' onClick={clearCart}/>
                    </div> 
                    <BillingCard course={course} selectedBatch={selectedBatch}/> 
                </div> 
                
                {data && 
                <div className={styles.details}>
                    <div className={styles.group}>
                        <p className={styles.label}>Name</p>
                        <p className={styles.detail}>{data.user.name}</p>    
                    </div>
                    <div className={styles.group}>
                        <p className={styles.label}>Email</p>
                        <p className={styles.detail}>{data.user.email}</p>    
                    </div>
                    <div className={styles.group}>
                        <p className={styles.label}>Select Batch</p>
                        <FormControl className={styles.input} fullWidth>
                            <Select color='grey' name="mentor" style= {{ color: 'white'}} onChange={(e)=> {setSelectedBatch(e.target.value)}}>
                            {batches.map((batch) =>
                            (
                                <MenuItem value={batch._id} key={batch._id}>{batch.title +' / ' +FormatDate(batch.startDate) +' - '+ FormatDate(batch.endDate)}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>}
                
            </div> : <div className={styles.cartWrapper}>Cart is empty</div>)}
            <Footer/>
        </div>
    )
}

export default Checkout