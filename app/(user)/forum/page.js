'use client'

import { useEffect, useState } from 'react'
import styles from './forum.module.css'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import ForumSearchbar from '@/app/components/forumSearchbar/ForumSearchbar'
import PopularCard from '@/app/components/popularCard/PopularCard'
import DiscussionCard from '@/app/components/discussionCard/DiscussionCard'
import Loading from '@/app/components/loading/Loading'

const Forum = () =>
{
    const [ discussions, setDiscussions ] = useState(null);
    const [ topics, setTopics ] = useState(null)
    const [ searchQuery, setSearchQuery ] = useState({search: '', order: ''})
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() =>
    {        
        const url = '/api/forum'
        getDiscussions(url);
    },[])
    
    const getDiscussions = async (url) =>
    {
        try
        {
            const response = await axios(url)
            setDiscussions(response.data)
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const handleChange = (type, value) =>
    {
        if(type === "topic" && !value)
        {
            router.push(pathname)
            getDiscussions(`/api/forum`)
            setSearchQuery({...searchQuery, [type] : ''})
            return;
        }

        if(type==="topic")
        {
            const path = `topic=${value}`
            router.push(`${pathname}?${path}`)
            getDiscussions(`/api/forum?${path}`)
        }
        setSearchQuery({...searchQuery, [type] : value})
    }

    const getTopics = async () =>
    {
        const url = '/api/forum/topics';
        const response = await axios(url);
        setTopics(response.data);
    }

    return(
        <div className={styles.wrapper}>
            {discussions ? 
            <div className={styles.container}> 
                {discussions.length > 0 ?
                <div className={styles.discussions}>
                    <div className={styles.query}>
                        <ForumSearchbar handleChange={handleChange} searchQuery={searchQuery} getDiscussions={getDiscussions}/>
                        <PopularCard handleChange={handleChange} getTopics={getTopics} topics={topics}/>
                    </div>
                    <div className={styles.discussionsReply}>
                        <DiscussionCard discussions={discussions} getDiscussions={getDiscussions} getTopics={getTopics}/>
                    </div> 
                </div> :
                <div className={styles.noDiscussions}>
                    No Discussions Posted
                </div>}
            </div> : 
            <Loading/>}
        </div>
    )
}

export default Forum