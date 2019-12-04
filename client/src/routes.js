import LoginPage from './views/login/LoginPage';
import RegisterPage from './views/register/RegisterPage';
import JoinChatPage from './views/joinChatPage/JoinChatPage';
import ChatPage from './views/chatPage/ChatPage';


export default [
  {
    name: 'home',
    path: '/',
    component: LoginPage,
  },
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterPage,
  },
  {
    name: 'joinChat',
    path: '/joinChat/:userId',
    component: JoinChatPage,
  },
  {
    name: 'chat',
    path: '/chat/:name/:room',
    component: ChatPage,
  },

];
