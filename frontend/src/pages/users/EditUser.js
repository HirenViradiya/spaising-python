import UserForm from "../../components/UserForm";

function EditUser() {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 m-auto rounded border p-4">
          <h2>Edit User</h2>
          <UserForm />
        </div>
      </div>
    </div>
  );
}

export default EditUser;
