import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { Image } from "react-bootstrap";

const apiUrl = process.env.REACT_APP_API_URL;
function UserForm() {
  const params = useParams();

  const [users, setUsers] = useState([]);
  const [image, setImage] = useState(null);
  const [validated, setValidated] = useState(false);
  const [initialData, setInitialData] = useState([]);
  const [valueState, setValueState] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    let iamgeFile = event.target.files[0];
    setImage(iamgeFile);
  };

  async function getUser() {
    if (params.id) {
      await axios
        .get(`${apiUrl}/user/edit/${params.id}`)
        .then((res) => {
          if (res) {
            const users = res.data.data;
            setInitialData(users);
            setUsers(users.users);
            setValueState(users.parent_id);
          }
        })
        .catch(function (error) {
          alert("Unable to read the user Details");
          console.log(error);
        });
    }
  }

  async function getUsers() {
    const apiUrl = process.env.REACT_APP_API_URL;
    await axios
      .get(`${apiUrl}/users/name`)
      .then((res) => {
        if (res) {
          const users = res.data.data;
          setUsers(users);
        }
      })
      .catch(function (error) {
        alert("Unable to read the user Details");
        console.log(error);
      });
  }
  const onChangeHandler = (event) => {
    const value = event.target.value;
    setValueState(value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    image ? formData.append("image", data.image) : formData.delete("image");
    data.parent_id
      ? formData.append("parent_id", data.parent_id)
      : formData.delete("parent_id");
    if (params.id) {
      formData.append("id", params.id);
    }

    if (
      data.first_name === null ||
      data.first_name.trim() === "" ||
      data.last_name === null ||
      data.last_name.trim() === "" ||
      data.email === null ||
      data.email.trim() === "" ||
      data.phone === null ||
      data.phone.trim() === "" ||
      data.dob === null ||
      data.dob.trim() === ""
    ) {
      alert("Validation Error");
      return;
    }
    setValidated(true);
    try {
      axios
        .post(`${apiUrl}/user`, formData)
        .then((res) => {
          if (res.status == 200) {
            alert(res.data.message);
            navigate("/");
          } else {
            alert(res.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      alert("Unable to connect to the server!");
    }
  }

  useEffect(() => {
    if (params.id) {
      getUser();
    } else {
      getUsers();
    }
  }, []);

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      {users && (
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Select Parent User</Form.Label>
            <Form.Select
              name="parent_id"
              value={valueState}
              onChange={onChangeHandler}
            >
              <option value="">Select Option</option>
              {users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Row>
      )}
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            name="first_name"
            defaultValue={initialData.first_name}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            name="last_name"
            defaultValue={initialData.last_name}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Email ID</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email ID"
            required
            defaultValue={initialData.email}
            name="email"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid EmailID.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Phone Number"
            required
            name="phone"
            defaultValue={initialData.phone}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Phone Number.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>DOB</Form.Label>
          <Form.Control
            type="date"
            placeholder="Date of Birth"
            required
            name="dob"
            defaultValue={initialData.dob}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid DOB.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom06">
          <Form.Label>Imafge</Form.Label>
          <Form.Control type="file" name="image" onChange={handleFileChange} />
        </Form.Group>
      </Row>
      {initialData.image && (
        <Row className="mb-2">
          <Form.Group as={Col} md="6" controlId="validationCustom06">
            <Col>
              <Image
                src={`${apiUrl}/${initialData.image}`}
                width={100}
                height={100}
                rounded
              />
            </Col>
          </Form.Group>
        </Row>
      )}
      <Button type="submit">Submit form</Button> {""}
      <Link to="/">
        <Button variant="info">Back</Button>
      </Link>
    </Form>
  );
}

export default UserForm;
