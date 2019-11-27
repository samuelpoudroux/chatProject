import Login from './views/login/LoginPage';
import GroupChat from './views/groupChat/GroupChatPage';
import RegisterPage from './views/register/RegisterPage';

export default [
    {
        name: 'home',
        path: '/',
        component: Login
      },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: RegisterPage
    },
    {
        name: 'groupChat',
        path: '/groupChat',
        component: GroupChat
      },

]