import { Link } from "react-router-dom";
import UserList from "../../components/UserList";
import Button from "react-bootstrap/Button";

function UserPage() {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Users</h2>
      <div className="row mb-3">
        <div className="col justify-content-center">
          <Link to="/user/add">
            <Button variant="primary">Create User</Button>
          </Link>
        </div>
        <div className="col"></div>
      </div>
      <UserList />
    </div>
  );
}

export default UserPage;
