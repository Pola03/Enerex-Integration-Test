import axios from 'axios';

// Use the environment variable as the default base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Create an Axios instance (a custom client)
const apiClient = axios.create({
  // Set the base URL for all requests made using this instance.
  // This helps keep endpoint URLs short (e.g., just '/Login/Authorize').
  baseURL: API_BASE_URL, 
  headers: {
    // Set the default content type for JSON data
    'Content-Type': 'application/json',
  },
});

// // Request Interceptor: A best practice for attaching the JWT token globally
// // This function runs automatically before every request sent by 'apiClient'.
// apiClient.interceptors.request.use(config => {
//   // 1. Retrieve the JWT token from browser storage (localStorage).
//   const token = localStorage.getItem('jwt_token'); 
  
//   // 2. If a token exists, add it to the request headers.
//   if (token) {
//     // Standard format for JWT: Authorization: Bearer [TOKEN]
//     config.headers.Authorization = `Bearer ${token}`;
//   }
  
//   // 3. Return the modified configuration to proceed with the request.
//   return config;
// }, error => {
//   // Handle any errors that occur before the request is sent
//   console.log('error antes: ',error);
//   return Promise.reject(error);
// });


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Get the URL of the request that failed
    const requestUrl = error.config?.url;

    // Ignore 401 errors coming from the login endpoint
    const isLoginRequest = requestUrl?.includes("/Login/Authorize");

    if (!isLoginRequest && error.response?.status === 401) {
      // Only redirect for other endpoints
      localStorage.removeItem("jwt_token");
      window.location.href = "/session-expired";
    }

    // Reject the promise so local catch blocks can handle errors
    return Promise.reject(error);
  }
);



// Exported function for the Login endpoint (POST)
export const loginUser = (credentials) => {
  // We only use the relative path here.
  return apiClient.post('/Login/Authorize', credentials);
};

// Exported function for the Get Students endpoint (GET)
export const getStudents = () => {
  return apiClient.get('/Student/GetStudents');
};

// Exported function for the Delete Student endpoint (GET)
export const deleteStudent = (studentId) => {
  return apiClient.delete(`/Student/DeleteStudent/${studentId}`);
};

// Exported function for the update Students endpoint (GET)
export const updateStudent = (studentData) => {
  return apiClient.put(`/Student/UpdateStudent/${studentData.id}`,studentData);
};

// Exported function for the update Students endpoint (GET)
export const addStudent = (studentData) => {
  return apiClient.post(`/Student/AddStudent`,studentData);
};


