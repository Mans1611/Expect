import AdminTitle from '../../component/AdminTitle/AdminTitle';
import SideNavbar from '../../component/sidenavbar/SideNavbar';
import { AdminContext, ProtectedAdminProvider } from '../../Context/ProtectedAdmin';
import Content from '../Content/Content';
import './homepage.scss';
const HomeAdminPage = () => {

    return ( 
    <ProtectedAdminProvider childern={(
        <div className="homeAdminPgae">
            <div className="dashbboard">
                <SideNavbar/>
                <div className="content">
                    <AdminTitle/>
                    <Content/>
                </div>
            </div>
        </div>
        )}>
    </ProtectedAdminProvider>
     );
}
 
export default HomeAdminPage;