import React from "react";
import type { User } from "./schema";
import UserForm from "./UserForm";
import { Button } from "@/components/Button";
import { usersDB } from "./usersDb";

function MainExample() {
  const [users, setUsers] = React.useState<User[]>(usersDB);

  const [currentUserIndex, setCurrentUserIndex] = React.useState<number | null>(
    null
  );

  const handleSaveUser = (user: User) => {
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx === -1) return;
    const newUsers = [...users];
    newUsers[idx] = user;
    setUsers(newUsers);
    // setCurrentUserIndex(null);
  };

  return (
    <div className="fixed inset-0 flex">
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-2">Manage Users</h1>
        <div className="flex flex-col gap-2">
          {users.map((user, index) => (
            <UserItem
              key={user.id}
              user={user}
              onClick={() => setCurrentUserIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="w-96 border-s relative">
        {currentUserIndex === null ? (
          <p className="absolute inset-0 content-center mx-auto text-center text-xl font-bold">
            Select a user to edit
          </p>
        ) : (
          <div>
            <UserForm
              onCancel={() => setCurrentUserIndex(null)}
              initialData={users[currentUserIndex]}
              onSubmit={handleSaveUser}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainExample;

interface UserItemProps {
  user: User;
  onClick: () => void;
}

const UserItem = ({ user, onClick }: UserItemProps) => (
  <div className="w-full flex items-center gap-2 bg-indigo-100 rounded-lg p-1">
    <p className="ms-2">{`${user.firstName} ${user.lastName}`}</p>
    <pre className="text-sm ms-auto">{user.email}</pre>
    <Button size="sm" variant="outline" onClick={onClick}>
      Edit
    </Button>
  </div>
);
