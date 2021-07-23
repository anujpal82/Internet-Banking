import {React} from 'react'
import{Route,Redirect} from 'react-router-dom'



 const PrivateRoute = ({children,...rest}) => {
    const Token=localStorage.getItem('Token');
    return (
   Token==null || Token==='undefined'?<Redirect to="/Error"/>:  <Route {...rest} render={()=>(children)}/>
   
    );
}

export default PrivateRoute;