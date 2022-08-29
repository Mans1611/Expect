import { useContext } from 'react';
import { AdminContext } from '../../Context/ProtectedAdmin';
import './accountadmin.scss';

const Adminaccount = () => {
    const {isAuth} = useContext(AdminContext);
    return ( 
        <div className="accountadmin">
            adminPage
        </div>
     );
}
 
export default Adminaccount;