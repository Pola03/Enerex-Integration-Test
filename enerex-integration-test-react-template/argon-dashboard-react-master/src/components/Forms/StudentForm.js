import {
    Button,
    FormGroup,
    Form,
    Input,
    Row,
    Col
  } from "reactstrap";
  
import { useState } from "react";

import CustomAlert from "components/Alerts/CustomAlert";
  
  const StudentForm = ({ studentInfo, handleActionStudent, handleCloseModal, buttonText }) => {

    // States to handle the alert that will be shown
    const [studentData, setStudentData] = useState(studentInfo);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
  
    const handleDataChange = (e) => {
      const { name, value } = e.target;
      setStudentData((prevData) => ({ ...prevData, [name]: value }));
  
      // If the user starts writting, remove the Alert
      setAlertVisible(false);
    };
    
    // Validates input fields
    const validateData = () => {
      if (!studentData.name.trim()) {
        setAlertMessage(`⚠️ Field "Name" is required`);
        setAlertVisible(true);
        return false;
      }
      if (!studentData.education.trim()) {
        setAlertMessage(`⚠️ Field "Education" is required`);
        setAlertVisible(true);
        return false;
      }
      if (!studentData.age || studentData.age <= 0) {
        setAlertMessage(`⚠️ Field "Age" must be a valid age`);
        setAlertVisible(true);
        return false;
      }
      return true;
    };
  
    const handleSubmit = () => {
      const studentToSubmit = {
        ...studentData,
        id: parseInt(studentData.id, 10),
        academicYear: parseInt(studentData.academicYear, 10),
        age: parseInt(studentData.age)
      };
  
      if (validateData()) {
        handleActionStudent(studentToSubmit);
        handleCloseModal();
      }
    };
  
    return (
      <Form>
        {alertVisible && (
            <CustomAlert msg={alertMessage} setIsVisible={setAlertVisible} color="warning"/>
        )}
  
        <h6 className="heading-small text-muted mb-4">
          Student information
        </h6>
  
        <div className="pl-lg-4">
          <Row>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-name">
                  Name
                </label>
                <Input
                  className="form-control-alternative"
                  id="input-name"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={studentData.name}
                  onChange={handleDataChange}
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-education">
                  Education
                </label>
                <Input
                  className="form-control-alternative"
                  id="input-education"
                  placeholder="Education"
                  type="text"
                  name="education"
                  value={studentData.education}
                  onChange={handleDataChange}
                />
              </FormGroup>
            </Col>
          </Row>
  
          <Row>
            <Col lg="4">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-academicYear">
                  Academic Year
                </label>
                <Input
                  className="form-control-alternative"
                  id="input-academicYear"
                  type="select"
                  name="academicYear"
                  value={studentData.academicYear}
                  onChange={handleDataChange}
                >
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
  
            <Col lg="4">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-age">
                  Age
                </label>
                <Input
                  className="form-control-alternative"
                  id="input-age"
                  placeholder="Age"
                  type="number"
                  name="age"
                  value={studentData.age}
                  onChange={handleDataChange}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  min={1}
                  max={120}
                />
              </FormGroup>
            </Col>
  
            <Col lg="4">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-gender">
                  Gender
                </label>
                <Input
                  className="form-control-alternative"
                  id="input-gender"
                  type="select"
                  name="gender"
                  value={studentData.gender}
                  onChange={handleDataChange}
                >
                  <option value="F">F</option>
                  <option value="M">M</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </div>
  
        <div className="text-center">
          <Button className="my-4" color="primary" type="button" onClick={handleSubmit}>
            {buttonText}
          </Button>
        </div>
      </Form>
    );
  };
  
  export default StudentForm;
  