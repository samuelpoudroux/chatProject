import LoginPage from './views/login/LoginPage';
import ChatRoomsPage from './views/chatRoomsPage/ChatRoomsPage';
import RegisterPage from './views/register/RegisterPage';


export default [
    {
        name: 'home',
        path: '/',
        component: LoginPage
      },
    {
      name: 'login',
      path: '/login',
      component: LoginPage
    },
    {
      name: 'register',
      path: '/register',
      component: RegisterPage
    },
    {
        name: 'chatRooms',
        path: '/chatRooms/:userId',
        component: ChatRoomsPage
      },

]