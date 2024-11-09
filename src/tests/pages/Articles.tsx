import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

type ArticleType = {
  id: number;
  title: string;
};

const Articles = () => {
  const [list, setList] = useState<ArticleType[]>([]);
  useEffect(() => {
    setList([
      {
        id: 1,
        title: '게시글1',
      },
      {
        id: 2,
        title: '게시글2',
      },
      {
        id: 3,
        title: '게시글3',
      },
    ]);
  }, []);
  return (
    <div>
      <Outlet />
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <Link to={'/articles/' + item.id}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
