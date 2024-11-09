import { useEffect } from 'react';
import useUserStore from './stores/useUserStore';

const UserList = () => {
  const { users, fetchUsers, clearUsers } = useUserStore();
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return (
    <div>
      <h1>User List</h1>
      <div>
        <button
          onClick={() => {
            fetchUsers();
          }}
        >
          조회
        </button>
        <button
          onClick={() => {
            clearUsers();
          }}
        >
          초기화
        </button>
      </div>
      <ul>
        {users.map((user, index) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
