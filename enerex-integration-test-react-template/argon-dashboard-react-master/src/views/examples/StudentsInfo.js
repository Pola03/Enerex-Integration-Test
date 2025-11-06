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
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  Input,
  Col
} from "reactstrap";

// My components
import Header from "components/Headers/Header.js";
import Paginator from "components/Paginators/Paginator";
import StudentModal from "./StudentModal";
import CustomAlert from "components/Alerts/CustomAlert";


// API request functions
import { getStudents,deleteStudent,updateStudent,addStudent} from "services/apiClient";

// react hooks
import { useState,useEffect } from "react";

// My functions
import { getErrorMsgByCode } from "functions/getErrorMsgByCode";
import { getCurrentUser } from "services/auth";


const StudentsInfo = () => {

  // States to manage the alert that will be shown 
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [isError,setIsError] = useState(false);

  // Page chosen of the Paginator Element
  const [currentPage,setCurrentPage] = useState(0);
  
  // Students fetched from database
  const [students, setStudents] = useState([]);

  // Students that will be shown in the table
  const [displayStudents, setDisplayStudents] = useState(students);

  // Number of elements that will be shown per page
  const elementsPerPage = 5;

  // Number of pages of Paginator Element
  const numberOfPages = Math.ceil(displayStudents.length/elementsPerPage);

  // Students that belong to the current page
  const currentStudents = displayStudents.slice(currentPage*elementsPerPage,(currentPage+1)*elementsPerPage);

  // State to manage the modal's visibility (open/close)
  const [isAddingStudent,setIsAddingStudent] = useState(false);
  const [isEditingStudent,setIsEditingStudent] = useState(false);

  // Student chosen from Table to edit
  const [studentToEdit,setStudentToEdit] = useState(null);

 // Handle the opening of Add Student Form
  const handleAddingStudent = () => {
    setIsAddingStudent(prev => !prev);
  }
  // Handle the opening of Edit Student Form
  const handleOpenEditingStudent = (student) => {
    setStudentToEdit(student); // Save the data of the student to edit
    setIsEditingStudent(true);  // Open Edit Student Form
  };

  // Handle the closing of Edit Student Form
  const handleCloseEditingStudent = () => {
    setIsEditingStudent(false); // Close Edit Student Form
    setStudentToEdit(null); // Clean the data
  };

  // Keeps the fields to filter students
  const [filters, setFilters] = useState({
    name: '',
    academicYear: '',
    age: '',
    education: '',
    gender: '',
});

  // Keeps the field to order students and whether the order will be ascending (true) or descending (false).
  const [fieldToOrder,setFieldToOrder] = useState({name:'',asc:false})

  // Update the fields to filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevData => ({ ...prevData, [name]: value.toString().toLowerCase() }));
  };
  
  // This useEffect hook is used to debounce the filtering process, 
  // ensuring that filters are only applied when the user pauses typing.
  useEffect(() => {
    const timer = setTimeout(() => {

      const filteredStudents = students.filter(
        (student) => student.name.toLowerCase().includes(filters.name) 
        && 
        student.academicYear.toString().toLowerCase().includes(filters.academicYear) 
        && 
        student.age.toString().toLowerCase().includes(filters.age) && 
        student.education.toLowerCase().includes(filters.education) 
        && student.gender.toLowerCase().includes(filters.gender)
      );
      if(fieldToOrder.name)
      {
        const {name, asc} = fieldToOrder;
        setDisplayStudents(filteredStudents.sort((a,b) => asc? (a[name]<b[name]) : (a[name]>b[name])))
      }

      setDisplayStudents( filteredStudents);
      setCurrentPage(0);
    }, 500)

    return () => clearTimeout(timer)
}, [filters,students]);


  // Handle when the order changes to ascending or descending
  useEffect(()=>{
    if(fieldToOrder.name)
    {
      const {name, asc} = fieldToOrder;
      setDisplayStudents(prev => [...prev].sort((a,b) => asc? (a[name]<b[name]) : (a[name]>b[name])))
      setCurrentPage(0);
    }

  },[fieldToOrder])

 // Fetches the list of students from the API
  const fetchStudents = async () => {

    try {
      const response = await getStudents();

      setStudents(response.data);

    } catch (err) {
        setAlertMsg(err.response?getErrorMsgByCode(err.response.status):"🌐 Unable to connect to the server. Please check your connection.");
        setIsError(true);
        setAlertVisible(true);
    } 
  };  

  // When the view is charged, the students are fetched.
  useEffect(() => {
    fetchStudents();
  }, []);

  // Handles deleting a student and updates the UI state accordingly.
  const handleDelete= async (studentId)=>{

    try {
      const response = await deleteStudent(studentId);
      setStudents(prev => prev.filter((student)=> student.id !== studentId));
      setAlertMsg(`✅ Student deleted successfully`)
      setIsError(false);
      setAlertVisible(true);

    } catch (err) {
        setAlertMsg(err.response?getErrorMsgByCode(err.response.status):"🌐 Unable to connect to the server. Please check your connection.");
        setIsError(true);
        setAlertVisible(true);
    }
  };

  // Handles editing a student and updates the UI state accordingly.
  const handleEdit= async (studentData)=>{

    const studentId = studentData.id;
    try {
      const response = await updateStudent(studentData);
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === studentData.id
            ? studentData // Devuelve el estudiante actualizado
            : student     // Devuelve el estudiante sin cambios
        )
      );
      setAlertMsg(`✅ Student edited successfully`)
      setIsError(false);
      setAlertVisible(true);

    } catch (err) {
      setAlertMsg(err.response?getErrorMsgByCode(err.response.status):"🌐 Unable to connect to the server. Please check your connection.");
      setIsError(true);
      setAlertVisible(true);
      
    } 
  };

  // Handles adding a new student and updates the UI state accordingly.
  const handleAdd = async (studentData)=>{

    try {
      const response = await addStudent(studentData);
      setAlertMsg(`✅ Student added successfully`)
      setIsError(false);
      fetchStudents();
      setAlertVisible(true);

    } catch (err) {
        setAlertMsg(err.response?getErrorMsgByCode(err.response.status):"🌐 Unable to connect to the server. Please check your connection.");
        setIsError(true);
        setAlertVisible(true);
    } 
  };


  const PageElements=({elements})=>{
    return (
      <tbody>
      {
        elements.map(
          student => (
            <tr key={student.id}> 
              
              <th scope="row">
                <Media className="align-items-center">
                  {student.name}
                </Media>
              </th>
              
              <td>
                {student.academicYear}
              </td>
              <td>
                {student.age}
              </td>
              <td>
                {student.education}
              </td>
              <td>
                {student.gender}
              </td>

              <td className="text-right">
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon-only text-light"
                    href="#pablo"
                    role="button"
                    size="sm"
                    color=""
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => {e.preventDefault();
                              handleDelete(student.id);}}
                    >
                      Delete
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={()=>handleOpenEditingStudent(student)}
                    >
                      Edit
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          )
        )
      }

    </tbody>
    )
  };
  
  const fields = ['name', 'academicYear', 'age', 'education', 'gender'];

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
                      {/* Table */}
              <CardHeader className="border-0">
                {/* <h3 className="mb-0">{user && (user.name)}</h3> */}
                <h3 className="mb-0">Student information</h3>
              </CardHeader>
              {alertVisible && (
                <CustomAlert msg={alertMsg} setIsVisible={setAlertVisible} color={isError?"danger":"success"}/>

            )}
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Academic Year</th>
                    <th scope="col">Age</th>
                    <th scope="col">Education</th>
                    <th scope="col">Gender</th>
                    <th scope="col" />
                  </tr>
                  {/* 🌟 INPUTs to filter by fields🌟 */}
                <tr>

                  {
                    fields.map(
                      field => (
                        <th key={field}>

                        <Row className="g-0 align-items-center">
                          
                          {/* Columna para el Input */}
                          <Col xs="9">
                            <Input
                              type="text"
                              placeholder={`Filter by ${field}`}
                              name={field}
                              value={filters[field]}
                              onChange={handleFilterChange}
                              className="me-1" 
                            />
                          </Col>

                          {/* UP ARROW for ascending sort and DOWN ARROW for descending sort. */}
                          <Col xs="1" className="d-flex flex-column p-0">
                            {
                              ((fieldToOrder.name!=field) || !fieldToOrder.asc) 
                              &&
                              (
                                <button
                                className="text-dark border-0 shadow-none p-0 m-0 bg-transparent" 
                                onClick={()=>setFieldToOrder({name:field, asc:true})}
                                >
                                  &#x25B2; {/* Flecha Arriba */}
                                </button>

                              ) 
                            }

                            {
                              ((fieldToOrder.name!=field) || fieldToOrder.asc) &&
                              (
                                <button
                                className="text-dark border-0 shadow-none p-0 m-0 bg-transparent" 
                                onClick={()=>setFieldToOrder({name:field, asc:false})}
                                >
                                  &#x25BC; {/* Flecha Arriba */}
                                </button>

                              ) 
                            }
                          </Col>
                        </Row>
                      </th>

                      )
                    )
                  }
 
                  <th />
                </tr>
                </thead>
                <PageElements elements={currentStudents}/>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPages={numberOfPages}/>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>

      <div className="text-right">
        <Button className="my-4 mr-4" color="primary" type="button" onClick={handleAddingStudent}>
            Add Student
        </Button>
      </div>   
      {
        isEditingStudent && (
          <StudentModal 
            studentInfo={studentToEdit} 
            handleActionStudent={handleEdit} 
            handleCloseModal={handleCloseEditingStudent}
            title = "Edit Student"
          />
        )
      }
      {
        isAddingStudent && (
          <StudentModal 
            studentInfo={{
              id: 0,
              name: "",
              academicYear: 1,
              age:0,
              education: "",
              gender: "M"
            }} 
            handleActionStudent={handleAdd} 
            handleCloseModal={handleAddingStudent}
            title = "Add Student"
          />
        )
      }

      </Container>
      

    </>
  );
};

export default StudentsInfo;
