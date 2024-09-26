'use client'

import { usePathname, useRouter } from 'next/navigation';
import styles from './AdminPanel.module.css'
import { useEffect, useState } from 'react';
import { adminPanelList } from '@/utility/adminPanelList';
import Image from 'next/image';

const AdminPanel = () =>
{
    const router = useRouter();
    const [ active, setActive ] = useState(null);
    const pathname = usePathname();

    useEffect(() =>
    {
        const path = pathname.split('/')[2]
        const route = adminPanelList.find((list)=> list.title.toLowerCase() === path);
        setActive(route.id);
    },[])

    return(
        <div className={styles.wrapper}>
            {adminPanelList.map((list) =>
            (
                <div key={list.id} className={list.id === active ? `${styles.container} ${styles.active}` : styles.container} onClick={()=> {setActive(list.id); router.push(list.navigation)}}>
                    <Image className={styles.icon} src={list.icon} alt='icon'/>
                    <p className={styles.list}>{list.title}</p>
                </div>
            )
            )}
        </div>
    )
}

export default AdminPanel