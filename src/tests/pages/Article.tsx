import { useParams } from 'react-router-dom';

const Article = () => {
  const { id } = useParams();
  return (
    <div>
      <h3>게실글 {id}</h3>
    </div>
  );
};

export default Article;
