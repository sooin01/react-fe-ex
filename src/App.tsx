import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardForm from './pages/board/BoardForm';
import BoardList from './pages/board/BoardList';
import NotFound from './pages/common/error/NotFound';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import MainLayout from './pages/MainLayout';
import UserForm from './pages/user/UserForm';
import UserList from './pages/user/UserList';
import Article from './tests/pages/Article';
import Articles from './tests/pages/Articles';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route path="/home" element={<Home />} />
          {/* User */}
          <Route path="/user" element={<UserList />} />
          <Route path="/user/:userId" element={<UserForm />} />
          {/* Board */}
          <Route path="/board" element={<BoardList />} />
          <Route path="/board/:seq" element={<BoardForm />} />
          {/* Article */}
          <Route path="/articles" element={<Articles />}>
            <Route path=":id" element={<Article />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
