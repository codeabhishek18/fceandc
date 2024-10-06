import Image from 'next/image'
import styles from './styles.module.css'
import linkedin from '@/assets/linkedin.png'
import founder from '@/assets/founder.png'

const MentorCard = ({ data }) =>
{
    return(
        <div className={styles.container}>
            <Image className={styles.displayPicture} src={founder} alt={data.name}/>
            <div className={styles.details}>
                <p className={styles.name}>{data.name}</p>
                <p className={styles.title}>{data.email}</p>
                {/* <p className={styles.title}>{data.contact}</p>
                <p className={styles.title}>{data.about}</p> */}
                <p className={styles.title}>Experience / {data.experience} years</p>
                <a href={data.linkedin}>
                    <Image className={styles.icon} src={linkedin} alt='icon'/>
                </a>
          </div>
        </div>
    )
}

export default MentorCard