import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './pages/MainLayout';
import UserList from './pages/user/UserList';
import Article from './tests/pages/Article';
import Articles from './tests/pages/Articles';

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/articles" element={<Articles />}>
          <Route path=":id" element={<Article />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
