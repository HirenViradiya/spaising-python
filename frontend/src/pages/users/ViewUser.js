import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { Button, FormLabel } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;
function ViewUser() {
  const params = useParams();
  const [initialData, setInitialData] = useState([]);

  function getUser() {
    axios
      .get(`${apiUrl}/user/view/${params.id}`)
      .then((res) => {
        const users = res.data.data;
        setInitialData(users);
      })
      .catch(function (error) {
        alert("Unable to read the user Details");
        console.log(error);
      });
  }

  useEffect(getUser, []);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 m-auto rounded border p-4">
          <h2>View</h2>
          <Container>
            <Row>
              {initialData.image && (
                <Col md={{ span: 5, offset: 5 }}>
                  <Image
                    src={`${apiUrl}/${initialData.image}`}
                    roundedCircle
                    width={150}
                    height={150}
                  />
                </Col>
              )}

              <Row>
                <Col md={{ span: 5, offset: 5 }}>
                  <FormLabel>First Name: </FormLabel>{" "}
                  <FormLabel>{initialData.first_name}</FormLabel>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 5, offset: 5 }}>
                  <FormLabel>Last Name: </FormLabel>{" "}
                  <FormLabel>{initialData.last_name}</FormLabel>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 5, offset: 5 }}>
                  <FormLabel>Email: </FormLabel>{" "}
                  <FormLabel>{initialData.email}</FormLabel>
                </Col>
                <Col md={{ span: 5, offset: 5 }}>
                  <FormLabel>Parent: </FormLabel>{" "}
                  <FormLabel>{initialData.parent_name}</FormLabel>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 5, offset: 5 }}>
                  <FormLabel>Phone: </FormLabel>{" "}
                  <FormLabel>{initialData.phone}</FormLabel>
                </Col>
              </Row>
            </Row>
            <Col md={{ span: 5, offset: 5 }}>
              <Link to="/">
                <Button variant="info">Back</Button>
              </Link>
            </Col>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
