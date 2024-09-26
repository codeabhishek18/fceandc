'use client'

import { TextField } from '@mui/material';
import styles from './styles.module.css' 
import axios from "axios";
import { toast } from 'sonner';

const NewCourse = () =>
{

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const id = formData.get('id');
        const title = formData.get('title');
        const description = formData.get('description');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice');
        const imageURL = formData.get('imageURL');
        const url = '/api/course'

        try
        {
            const response = await axios.post(url, {id, title, description, imageURL, price, offerPrice});
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

    return(
        <form className={styles.container} onSubmit={handleSubmit}>
            <TextField color='grey' className={styles.input} name='id' placeholder='Course id' />
            <TextField color='grey' className={styles.input} name='input' placeholder='Course title' />
            <TextField color='grey' className={styles.input} name='description' placeholder='Description'/>
            <TextField color='grey' className={styles.input} name='price' placeholder='Price' />
            <TextField color='grey' className={styles.input} name='offerPrice' placeholder='Offer price' />
            <TextField color='grey' className={styles.input} name='imageURL' placeholder='Image URL ' />
            <button className={styles.create} type="submit">Add Course</button>
         </form>
    )
    
}

export default NewCourse