import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import metaImage from '@/assets/meta.jpg';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/cmt',
    name: 'CommentDownloader',
    component: () => import('../views/CommentDownloader.vue'),
    meta: {
      title: '留言轉圖片神器',
    },
  },
  {
    path: '/video-editor',
    name: 'VideoEditor',
    component: () => import('../views/VideoEditor.vue'),
    meta: {
      title: '自動剪輯神器',
    },
  },
  // {
  //   path: '/auto-subtitle',
  //   name: 'AutoSubtitle',
  //   component: () => import('../views/AutoSubtitle.vue'),
  //   meta: {
  //     title: '自動上字幕神器',
  //   },
  // },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('../views/PrivacyPolicy.vue'),
    meta: {
      title: '隱私權條款',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

function setMeta(name: string, content: string) {
  let meta = document.head.querySelector(`meta[name="${name}}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

router.beforeEach((to, from, next) => {
  const title = (to.meta.title) ? `${to.meta.title} | demo` : 'demo';

  document.title = title;

  setMeta('og:url', to.fullPath);
  setMeta('og:image', metaImage);
  setMeta('og:description', '由Youtuber六指淵開發，能快速將Youtube留言變成圖片');
  setMeta('og:title', title);
  setMeta('og:site_name', 'demo');
  setMeta('og:type', 'website');

  next();
});

export default router;
