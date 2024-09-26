import styles from './styles.module.css'
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';

const MediaPlayer = ({title, source}) =>
{

    return(
        <div className={styles.container}>
            <ShakaPlayer src={source}/>
            <p className={styles.title}>{title}</p>
         </div>
    )
}

export default MediaPlayer