// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col
  } from "reactstrap";

// My components
import StudentForm from "components/Forms/StudentForm";
import ModalContainer from "components/Modals/ModalContainer";

const StudentModal = ({studentInfo,handleActionStudent,handleCloseModal,title})=>{

    return (
      <>
        <ModalContainer handleModal={handleCloseModal}>
        <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                    <Col xs="8">
                        <h3 className="mb-0">{title}</h3>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
            <StudentForm 
                studentInfo={studentInfo}
                handleActionStudent={handleActionStudent}
                handleCloseModal={handleCloseModal}
                buttonText={title}
            />

            </CardBody>
        </Card>

        </ModalContainer>
      </>
    );

}

export default StudentModal;


