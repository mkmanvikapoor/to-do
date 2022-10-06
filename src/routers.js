import TheLandingPage from './components/LandingPage/TheLandingPage.vue'
import LoginPage from './components/Login/LoginPage.vue'
import SignupPage from './components/Signup/SignupPage.vue'
import TheDashboard from './components/Dashboard/TheDashboard.vue'
import TheList from './components/List/TheList.vue'
import CreateTask from './components/CreateTask/CreateTask.vue'
import Update from './components/CreateTask/UpdateTask.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: 'TheLandingPage',
        component: TheLandingPage,
        path: '/'
    },
    {
        name: 'SignupPage',
        component: SignupPage,
        path: '/signup'
    },
    {
        name: 'LoginPage',
        component: LoginPage,
        path: '/login'
    },
    {
        name: 'dash-board',
        component: TheDashboard,
        path: '/dashboard'
    },
    {
        name: 'list',
        component: TheList,
        path: '/list'
    },
    {
        name: 'createtask',
        component: CreateTask,
        path: '/createtask'
    },
    {
        name: 'Update',
        component: Update,
        path: '/update/:taskId'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;