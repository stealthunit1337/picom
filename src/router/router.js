import Main from '@/pages/Main'
import PostPage from '@/pages/PostPage'
import {createRouter, createWebHistory} from 'vue-router'
import Thoughts from '@/pages/Thoughts'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/thoughts',
        component: Thoughts
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;
