'use client'

import Image from 'next/image'
import styles from './styles.module.css'
import uploadIcon from '@/assets/upload.png'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import deleteIcon from '@/assets/delete.png' 

const Upload = () =>
{

    const [ dataURL, setDataURL ] = useState(null);
    const [ files, setFiles ] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
        const reader = new FileReader()
    
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => 
        {
            const binaryStr = reader.result
            setDataURL(binaryStr);
        }
        reader.readAsArrayBuffer(file)
        })
        setFiles(acceptedFiles);        
    }, [])

    const updateFiles = (index) =>
    {
        const targetFile = files[index];
        const updatedFiles = files.filter((file)=> file !== targetFile); 
        updatedFiles.length > 0 ? setFiles(updatedFiles) : setFiles(null); 
    }

    const {getRootProps, getInputProps, acceptedFiles, isDragActive} = useDropzone({onDrop})

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Image className={styles.upload} src={uploadIcon} alt='upload'/>
                </div>
                
                <div className={styles.files}>
                    {files ? 
                    <div className={styles.fileList}>
                    {files.map((file, index)=>
                    (
                        <div key={index} className={styles.file}>
                            <p className={styles.fileName}>{file.name}</p>
                            <Image className={styles.remove} src={deleteIcon} alt='delete' onClick={()=> updateFiles(index)}/>
                        </div>
                    ))}
                    </div> : <p className={styles.noFile}>No file chosen</p>}
                </div>
            </div>
        </div>
    )
} 

export default Upload