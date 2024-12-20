import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import Test1 from '../components/speed.vue';
import Test2 from '../components/commut.vue';
import Test3 from '../components/sequences.vue';
import Test4 from '../components/torndayt.vue';
import Test5 from '../components/dots.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/test1', component: Test1 },
    { path: '/test2', component: Test2 },
    { path: '/test3', component: Test3 },
    { path: '/test4', component: Test4 },
    { path: '/test5', component: Test5 },
  ],
});

export default router;