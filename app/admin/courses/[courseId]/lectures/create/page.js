'use client'

import { TextField } from '@mui/material'
import styles from './styles.module.css'
import axios from 'axios';
import { usePathname } from 'next/navigation';

const Lecture = () =>
{   
    const pathname = usePathname(); 
    const courseId =  pathname.split('/')[4]

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const description = formData.get('description')
        const duration = formData.get('duration')

        try
        {
            const url = `/api/lecture/${courseId}`
            await axios.post(url, {description, duration})   
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <form onSubmit={handleSubmit} className={styles.container}>
            <TextField className={styles.inputs} color='grey' placeholder="Description" type="text" name="description" fullWidth/>
            <TextField className={styles.inputs} color='grey' placeholder="Duration" type="text" name="duration" fullWidth/>        
            <button className={styles.create} type='submit'>Add Lecture</button>
        </form>
    )
}

export default Lecture