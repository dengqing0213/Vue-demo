import Vue from 'vue'
import Router from 'vue-router'
// 路由懒加载
const Home = () => import('@/components/Home')
const Kind = () => import('@/components/Kind')
const Cart = () => import('@/components/Cart')
const User = () => import('@/components/User')
const Taste = () => import('@/components/Taste')
const Header = () => import('@/components/Header')
const MainFooter = () => import('@/components/MainFooter')
const Detail = () => import('@/components/Detail')
const Login = () => import('@/components/Login')
const Register = () => import('@/components/Register')
const Search = () => import('@/components/Search')
const Order = () => import('@/components/Order')
const Address = () => import('@/components/Address')
const PayOrder = () => import('@/components/PayOrder')
/* import Home from '@/components/Home'
import Kind from '@/components/Kind'
import Cart from '@/components/Cart'
import User from '@/components/User'
import Header from '@/components/Header'
import MainFooter from '@/components/MainFooter'
import Detail from '@/components/Detail'
import Login from '@/components/Login'
import Register from '@/components/Register' */

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // redirect: '/home'
      redirect: {
        name: 'home'
      }
    },
    {
      path: '/home',
      name: 'home',
      components: {
        header: Header,
        content: Home,
        footer: MainFooter
      }
    },
    {
      path: '/kind',
      name: 'kind',
      components: {
        content: Kind,
        footer: MainFooter
      }
    },
    {
      path: '/cart',
      name: 'cart',
      components: {
        content: Cart
      }
    },
    {
      path: '/taste',
      name: 'taste',
      components: {
        content: Taste,
        footer: MainFooter
      }
    },
    {
      path: '/user',
      name: 'user',
      components: {
        content: User,
        footer: MainFooter
      }
    },
    {
      path: '/detail/:id',
      // path: '/detail',
      name: 'detail',
      components: {
        content: Detail
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        content: Login
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        content: Register
      }
    },
    {
      path: '/search',
      name: 'search',
      components: {
        content: Search
      }
    },
    {
      path: '/order',
      name: 'order',
      components: {
        content: Order
      }
    },
    {
      path: '/address',
      name: 'address',
      components: {
        content: Address
      }
    },
    {
      path: '/payOrder',
      name: 'payOrder',
      components: {
        content: PayOrder
      }
    }
  ]
})
