'use client'

import BatchCard from "@/app/components/batchCard/BatchCard";
import styles from './styles.module.css'
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/components/loading/Loading";

const Dashboard = () =>
{
    
    const { data, status } = useSession();
    const [ userData, setUserData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true)
    const router = useRouter();

    const getUserData = async () =>
    {
        try
        {
            const url = `/api/user/${data.user.id}`
            const response = await axios.get(url);
            setUserData(response.data)
            setIsLoading(false);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(() => 
    {
        if(status === "authenticated")
            getUserData();
        else if(status === "unauthenticated")
            router.push('/')
        else
            setIsLoading(true);
        
            
    }, [status]);

    console.log(userData)
    

    if(status === 'loading' || isLoading)
        return(
            <Loading/> 
        )
        
    return(
        <div>
            {userData &&
            <div className={styles.enrollments}>
                {userData?.enrollments?.map((data)=>
                (
                    <BatchCard data={data.batch} key={data._id}/>
                ))}
            </div>}
        </div>
    )
}

export default Dashboard