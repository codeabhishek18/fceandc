'use client'

import styles from './DiscussionCard.module.css'
import { TextField } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Discussion from '../discussion/Discussion';
import Comment from '../comment/Comment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import upArrow from '@/assets/show.png'
import downArrow from '@/assets/drop.png'
import { toast } from 'sonner';

const DiscussionCard = ({discussions, getDiscussions, getTopics}) =>
{   
    const [ comment, setComment ] = useState('')
    const [ viewComment, setViewComment ] = useState(null)

    const session = useSession();
    const user = session?.data?.user?.id

    const handleDelete = async (id) =>
    {
        try
        {
            const url = `/api/forum/${id}`
            const response = await axios.delete(url);
            toast.success(response.data.message);
            getDiscussions('/api/forum');
            getTopics();
        }
        catch(error)
        {
            toast.error(error);
        }
    }

    const handleComment = async (id) =>
    {
        try
        {
            if(!comment)
                return toast.error('Comment cannot be empty')

            const url = `/api/comment/${id}`
            if(user)
            {
                const response = await axios.post(url, {comment, author: user});
                toast.success(response.data.message)
                getDiscussions('/api/forum');
                setComment('');
                setViewComment(id);
            }
            return
        }
        catch(error)
        {
            toast.error(error.message);
        }
    }

    return(
        <div className={styles.container}>
            {discussions.map((discussion) =>
            (
                <div className={styles.discussionCard} key={discussion._id}>
                    <Discussion 
                        key={discussion._id} 
                        id={discussion._id} 
                        author={discussion.author} 
                        title={discussion.title} 
                        date={discussion.createdAt} 
                        like={discussion.like} 
                        keywords={discussion.keywords} 
                        handleDelete={handleDelete}/>
                                          
                    <div className={styles.replySection}>
                        <TextField 
                            InputProps={{style: { color: '#ffffff'}, sx: {'&.Mui-focused .MuiOutlinedInput-notchedOutline': {borderColor: '#f0f0f0'}}}}
                            variant='outlined' 
                            size='small' color='grey' 
                            className={styles.reply} 
                            name="comment" 
                            placeholder="Reply" 
                            value={comment}
                            onChange={(e)=> setComment(e.target.value)}
                        />
                        <button 
                            className={styles.post} 
                            onClick={()=> handleComment(discussion._id)}>
                            Send
                        </button>
                    </div>

                    { discussion.comments.length > 0 ?
                    <div className={styles.commentsCount} onClick={()=> setViewComment((prev) => prev  === discussion._id ? null : discussion._id)}>
                        <p className={styles.response}>{discussion.comments?.length}  {discussion.comments?.length > 1 ? 'responses' : 'response'}</p>
                       <Image className={styles.arrows} src={viewComment === discussion._id ? downArrow : upArrow} alt='comments'/> 
                    </div>:<p className={styles.noCount}>Be the first one to respond</p>}

                    {viewComment === discussion._id &&
                    <div className={styles.replies}>
                    {discussion.comments.map((comment) =>
                    (
                        <Comment 
                            key={comment._id} 
                            comment={comment} 
                            user={user}
                            getDiscussions={getDiscussions}
                        />
                    ))}
                    </div> }
                </div>
            ))}
        </div>
    )
}

export default DiscussionCard