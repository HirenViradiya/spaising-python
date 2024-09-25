import UserForm from "../../components/UserForm";

function CreateUser() {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 m-auto rounded border p-4">
          <h2>Create User</h2>
          <UserForm />
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
