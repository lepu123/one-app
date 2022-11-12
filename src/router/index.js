import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import DiscoverView from '@/views/DiscoverView/DiscoverView.vue'
import SerializeView from '../views/SerializeView/SerializeView.vue'
import UserView from '../views/UserView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/home/0'
    },
    {
        path: '/',
        redirect: "/home/0"
    },
    {
        // 使用动态路由获取当前日期
        path: '/home/:date',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: 'month-article',
                name: 'month-article',
                component: () => import("../views/MonthArticlesView/MonthArticlesView.vue"),
            }
        ]
    },
    {
        path: '/discover',
        name: 'discover',
        component: DiscoverView
    },
    {
        path: '/serialize',
        name: 'serialize',
        component: SerializeView
    },
    {
        path: '/user',
        name: 'user',
        component: UserView
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import('../views/ArticleDetailView/ArticleDetailView.vue')
    },
    {
        path: '/image-text',
        name: 'image-text',
        component: () => import('../views/DiscoverView/Hp/ImageTextView.vue')
    },
    {
        path: '/special',
        name: 'special',
        component: () => import('../views/ArticleDetailView/SpecialDetailView.vue')
    },
    {
        path: '/hop',
        name: 'hop',
        component: () => import('../views/DiscoverView/Hop/HopDetailView')
    },
    {
        path: '/essay',
        name: 'essay',
        component: () => import('../views/DiscoverView/Essays/EssaysDetailView'),
    },
    {
        path: '/author',
        name: 'author',
        component: () => import('@/views/DiscoverView/Author/AuthorDetailView'),
    },
    {
        path: '/serialize-detail',
        name: 'serialize-detail',
        component: () => import('@/views/SerializeView/SerializeDetailView.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
