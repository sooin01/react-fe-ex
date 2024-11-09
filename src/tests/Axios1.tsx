import axios from 'axios';
import { useState } from 'react';

const Axios1 = () => {
  const [data, setData] = useState(null);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            axios
              .get('https://jsonplaceholder.typicode.com/todos/1')
              .then((response) => {
                setData(response.data);
              });
          }}
        >
          불러오기
        </button>
        <div>
          {data && (
            <textarea
              rows={10}
              cols={50}
              value={JSON.stringify(data, null, 2)}
              readOnly={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Axios1;
