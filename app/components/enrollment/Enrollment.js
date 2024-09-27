import Image from 'next/image';
import styles from './Enrollment.module.css'
import more from '@/assets/more.png'
import success from '@/assets/success-icon.png'
import close from '@/assets/close-lg.png'
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

const Enrollment = ({batch, enrollment, getBatch}) =>
{
    const { user } = enrollment;
    const [ showAccess, setShowAccess ] = useState(false);

    const handleAccess = async () =>
    {
        try
        {
            const grant = enrollment.access === 'true' ? 'false' : 'true'  
            const url = `/api/enrollments/access/${enrollment._id}`
            const response = await axios.put(url, { access: grant});
            getBatch();
            toast(response.data.message || response.data.error)
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }

    return(
        <div className={styles.container} onClick={()=> setShowAccess(false)}>
            <div className={styles.content}>
                <p className={styles.name}>{user.name}</p>
                <p className={styles.email}>{user.email}</p>
                <p className={styles.contact}>{user?.phone}</p>
            </div>
            {batch.access === 'true' &&
            <div>
                <Image className={styles.icon} src={enrollment.access === 'true' ? success : close}/>
                <Image className={styles.more} src={more} alt='icon' onClick={(e)=> {e.stopPropagation(); setShowAccess(true);}}/>
            </div>}
            {showAccess && 
            <div className={styles.accessControl}>
                <button className={styles.control} onClick={handleAccess}>{enrollment.access === 'true' ? 'Revoke Access' : 'Grant Access'}</button>
                <button className={styles.control}>Remove User</button>
            </div>}
        
        </div>
    )
}

export default Enrollment