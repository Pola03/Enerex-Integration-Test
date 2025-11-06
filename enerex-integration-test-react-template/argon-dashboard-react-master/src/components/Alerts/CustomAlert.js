import { useEffect } from "react";
import { UncontrolledAlert } from "reactstrap";

const CustomAlert = ({msg,setIsVisible,color})=>{
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    
        return () => clearTimeout(timer); // Limpieza por si se desmonta antes
        }, [setIsVisible]);
    return (
        <UncontrolledAlert
            color={color}
            fade={true}
            className="text-center mb-4"
            toggle={()=>{setIsVisible(false)}}
        >
            {msg}
      </UncontrolledAlert>
    )

}

export default CustomAlert;