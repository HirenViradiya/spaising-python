import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
function UserList() {
  const [users, setUsers] = useState([]);

  function getUsers() {
    axios
      .get(`${apiUrl}/users`)
      .then((res) => {
        const users = res.data.data;
        setUsers(users);
      })
      .catch(function (error) {
        alert("Unable to load details");
        console.log(error);
      });
  }

  function deleteUser(id) {
    axios
      .delete(`${apiUrl}/user/delete/${id}`)
      .then((res) => {
        getUsers();
      })
      .catch(function (error) {
        alert("Something went wrong!");
        console.log(error);
      });
  }

  useEffect(getUsers, []);

  return (
    <>
      {!users && <h2>No Data Found</h2>}
      {users && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Parent Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.parent_name ? user.parent_name : "-"}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {user.image ? (
                      <Image
                        src={`${apiUrl}/${user.image}`}
                        width={50}
                        height={50}
                        rounded
                      />
                    ) : (
                      "NA"
                    )}
                  </td>
                  <td>
                    <Link to={"/user/view/" + user.id}>
                      <Button variant="info">View</Button>
                    </Link>{" "}
                    <Link to={"/user/edit/" + user.id}>
                      <Button variant="primary">Edit</Button>
                    </Link>{" "}
                    <Button
                      variant="danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default UserList;
