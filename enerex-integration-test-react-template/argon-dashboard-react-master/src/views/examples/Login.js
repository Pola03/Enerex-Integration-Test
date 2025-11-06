/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";


// My components
import CustomAlert from "components/Alerts/CustomAlert";

// React hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { loginUser } from "services/apiClient";

const Login = () => {
  const loginDefault = {
    email: "",
    password: ""
  }

  // Info required to Log In
  const [loginData, setLoginData] = useState(loginDefault);

  // States to handle the alert that will be shown
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMessage,setAlertMessage] = useState('');

  // Handles when the user types into an input field
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({ ...prevData, [name]: value }));
    setAlertVisible(false);
  };

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {
      // 3. Call the API
      const response = await loginUser(loginData);
      
      // The backend response is just the token 
      const jwtToken = response.data; 

      if (jwtToken) {
        // 4. Store the token for future requests (used by the interceptor)
        localStorage.setItem("jwt_token", jwtToken);
        console.log('Logged in successfully')
        
        navigate("/admin/index", { replace: true });
      } else {
        // This handles rare cases where the token is null but the response is 200
        setAlertMessage("❗ Login failed: Token not received.");
      }
    } catch (err) {
      // 6. Handle 401 (Unauthorized) and other errors
      console.error("Login Error:", err);
      
      
      // 401 indicates invalid credentials
      if (err.response && err.response.status === 401) {
        setAlertMessage("❗ Invalid credentials. Please check your email and password.");
      } else {
        setAlertMessage("🛑 Connection error with the server. Please try again.");
      } 
      
      setAlertVisible(true);
    }
};

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
          
            <Form role="form">
              
              {alertVisible && (
                <CustomAlert msg={alertMessage} setIsVisible={setAlertVisible} color="danger"/>
              )}
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    value={loginData.email}
                    onChange={handleDataChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    value={loginData.password}
                    onChange={handleDataChange}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={handleLogin}>
                  Log in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
