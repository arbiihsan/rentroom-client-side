import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import LodgingDetailView from '../views/LodgingDetailView.vue'
import Layout from "../components/Layout.vue";
import BookmarkView from "../views/BookmarkView.vue"

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      {
        path: "/customers/lodgings/:id",
        name: "detail-lodging",
        component: LodgingDetailView,
      },
      {
        path: "/customers/bookmarks",
        name: "Bookmarks",
        component: BookmarkView,
      },
    ],
  },
  {
    path: "/customers/signin",
    name: "SignIn",
    component: SignInView,
  },
  {
    path: "/customers/signup",
    name: "SignUp",
    component: SignUpView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("access_token");
  if (isAuthenticated && to.name === "SignIn" || isAuthenticated && to.name === "SignUp") {
    next("/");
  } else if (!isAuthenticated && to.name === "Bookmarks") {
    next('/customers/signin')
  } else {
    next();
  }
});

export default router
