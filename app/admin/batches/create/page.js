'use client'

import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import styles from './styles.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { toast } from 'sonner';
import Loading from '@/app/components/loading/Loading';

const Newbatch = () =>
{    
    const [ courses, setCourses ] =  useState(null); 
    const [ mentors, setMentors ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const getCourses = async () =>
    {
        try
        {
            setIsLoading(true);
            const url = `/api/course`
            const response = await axios.get(url);
            setCourses(response.data);
            setIsLoading(false);
        }
        catch(error)
        {
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    const getMentors = async () =>
    {
        try
        {
            setIsLoading(true)
            const url = `/api/mentor`
            const response = await axios.get(url);
            setMentors(response.data);
            setIsLoading(false)
        }
        catch(error)
        {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    useEffect(()=>
    {
        getCourses();
        getMentors();
    },[])

    
    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const courseId = formData.get('course')
        const mentor = formData.get('mentor')
        const title = formData.get('title')
        const startDate = new Date(formData.get('start-date')).toUTCString()
        const endDate = new Date(formData.get('end-date'))

        try
        {
            const url = '/api/batch'
            const response = await axios.post(url, {title, courseId, mentor, startDate, endDate})
            if(response.data?.message)
                toast.success(response.data.message)
            else
                toast.error(response.data.error)
        }
        catch(error)
        {
            toast.error(response.data.error)
        }
    }
    console.log(courses)

    return(
        <div className={styles.wrapper}>
        {isLoading ? 
        <Loading/> :
        ((!mentors || !courses) ?
        <></> :
        <form onSubmit={handleSubmit} className={styles.container}>
            <FormControl className={styles.inputs} fullWidth>
                <InputLabel color='grey' variant='outlined'>Choose course</InputLabel>
                <Select color='grey' placeholder="Multiple answers" name="course" label="Choose course">
                    {courses.map((course) =>
                    (
                        <MenuItem value={course._id} key={course._id}>{course.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={styles.inputs} fullWidth>
                <InputLabel color='white' variant='outlined'>Choose mentor</InputLabel>
                <Select color='grey' name="mentor" placeholder="Multiple answers" label="Choose mentor">
                    {mentors?.map((mentor) =>
                    (
                        <MenuItem value={mentor._id} key={mentor._id}>{mentor.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField className={styles.inputs} color='grey' placeholder="Batch title" type="text" name="title" fullWidth/>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField className={styles.inputs} placeholder="Start date" color='grey' name='start-date' format="YYYY/MM/DD" fullWidth/>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField className={styles.inputs} placeholder="End date" color='grey' name='end-date' format="YYYY/MM/DD" fullWidth/>
            </LocalizationProvider>
                        
            <button className={styles.create} type='submit'>Add Batch</button>
        </form>)}
       </div>
    )
}

export default Newbatch