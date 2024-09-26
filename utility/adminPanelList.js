import dashboard from '@/assets/dashboard.png'
import batch from '@/assets/batch.png'
import blog from '@/assets/blog.png'
import message from '@/assets/message.png'
import forum from '@/assets/forum.png'

export const adminPanelList = 
[
    {
        id: 0,
        title: 'Dashboard',
        navigation:'/admin/dashboard',
        icon: dashboard
    },
    {
        id: 2,
        title: 'Courses',
        navigation:'/admin/courses',
        icon: batch
    },
    // {
    //     id: 3,
    //     title: 'Assessments',
    //     navigation:'/admin/assessments'
    // },
    {
        id: 4,
        title: 'Messages',
        navigation:'/admin/messages',
        icon: message
    },
    {
        id: 5,
        title: 'Batches',
        navigation:'/admin/batches',
        icon: forum
    },
    {
        id: 6,
        title: 'Mentors',
        navigation:'/admin/mentors',
        icon: blog
    }
]
