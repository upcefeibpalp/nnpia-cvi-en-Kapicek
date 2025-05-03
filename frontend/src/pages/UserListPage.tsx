import UserTable from "../components/UserTable";

const UserListPage = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Seznam uživatelů</h2>
      <UserTable />
    </div>
  );
};

export default UserListPage;
