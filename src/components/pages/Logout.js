import { useEffect } from "react";
import auth from "../service/authService";
import { useLocation, useNavigate} from "react-router-dom";

function Logout({setUser}) {
  
  const location = useLocation()
  const navigate = useNavigate()
  
  useEffect( () => {  
    console.log('Logout location', location)
    auth.logout();
    setUser(null)
    navigate('/',{state:'logout'})      
  },[])
  
  
  return null
 
}

export default Logout;
