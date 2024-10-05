import Image from 'next/image'
import styles from './styles.module.css'
import linkedin from '@/assets/linkedin.png'

const MentorCard = ({ data }) =>
{
    return(
        <div className={styles.container}>
           <p className={styles.name}>{data.name}</p>
           <p className={styles.title}>{data.email}</p>
           {/* <p className={styles.title}>{data.contact}</p>
           <p className={styles.title}>{data.about}</p> */}
           <p className={styles.title}>Experience : {data.experience} years</p>
           <a href={data.linkedin}>
                <Image className={styles.icon} src={linkedin} alt='icon'/>
           </a>
        </div>
    )
}

export default MentorCard