import { Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <center>
        <h1>Not Found</h1>
        <div>
          <Button type="primary" htmlType="button">
            <Link to="/">Home</Link>
          </Button>
        </div>
      </center>
    </div>
  );
};

export default NotFound;
