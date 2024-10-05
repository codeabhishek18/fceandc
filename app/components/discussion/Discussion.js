import styles from './Discussion.module.css'
import deleteIcon from '@/assets/delete.png'
import Image from 'next/image';
import ForumKey from '../forumKey/ForumKey';
import { FormatTime } from '@/utility/formatTime';
import { useSession } from 'next-auth/react';

const Discussion = ({id, author, title, date, like, keywords, handleDelete}) =>
{
    const {data} = useSession(); 

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.title}>{title}</p>
                {data?.user?.role === 'admin' && <Image className={styles.deleteIcon} src={deleteIcon} alt='delete' onClick={()=> handleDelete(id)}/>}
            </div>
            <div className={styles.footer}>
                <p className={styles.author}>Posted by {author?.name}</p>
                <p className={styles.author}>•</p>
                <p className={styles.author}>{FormatTime(date)}</p>
            </div>
            <div className={styles.keywords}>
            {keywords.map((key, index)=>
            (
                <p key={index} className={styles.key}>{key}</p>
            ))}
            </div>
        </div>
    )
}

export default Discussion