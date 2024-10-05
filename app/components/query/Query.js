import { FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material'
import styles from './styles.module.css' 

const Query = () =>
{

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                FCEC
            </div>
            <div className={styles.chat}>
                <p>Drop your query, so that we get back to you ASAP!</p>
                <div className={styles.form}>
                    <Input className={styles.input} color='grey' sx={{color:'white'}} placeholder='Full name'/>
                    <Input className={styles.input} color='grey' sx={{color:'white'}} placeholder='Email'/>
                    <Input className={styles.input} color='grey' sx={{color:'white'}} placeholder='Contact'/>
                    <FormControl color='grey' variant="standard">
                        <InputLabel color='grey' sx={{color: 'grey'}} id="demo-simple-select-standard-label">Course</InputLabel>
                        <Select sx={{color: 'white'}} labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" label="Course">
                            <MenuItem value='CAMS'>CAMS</MenuItem>
                            <MenuItem value='CGSS'>CGSS</MenuItem>
                        </Select>
                     </FormControl>
                    <button className={styles.submit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Query