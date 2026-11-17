import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../pages/Home/Home.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        }
    ]
})

export default router;