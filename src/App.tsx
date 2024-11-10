import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './pages/MainLayout';
import UserForm from './pages/user/UserForm';
import UserList from './pages/user/UserList';
import Article from './tests/pages/Article';
import Articles from './tests/pages/Articles';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route path="/" element={<Home />} />
          {/* User */}
          <Route path="/user" element={<UserList />} />
          <Route path="/user/:seq" element={<UserForm />} />
          {/* Article */}
          <Route path="/articles" element={<Articles />}>
            <Route path=":id" element={<Article />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
