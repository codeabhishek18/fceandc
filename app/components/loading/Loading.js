'use client'

import { CircularProgress } from '@mui/material'
import styles from './styles.module.css'

const Loading = () =>
{
    return(
        <div className={styles.container}>
            <CircularProgress sx={{color: '#cca704'}} />
        </div>
    )
}

export default Loading