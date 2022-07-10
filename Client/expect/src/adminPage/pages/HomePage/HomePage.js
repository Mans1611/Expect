import AdminTitle from '../../component/AdminTitle/AdminTitle';
import SideNavbar from '../../component/sidenavbar/SideNavbar';
import Content from '../Content/Content';
import './homepage.scss';
const HomeAdminPage = () => {
    return ( 
        <div className="homeAdminPgae">
            <div className="dashbboard">
                <SideNavbar/>
                <div className="content">
                    <AdminTitle/>
                    <Content/>
                </div>
            </div>
        </div>
     );
}
 
export default HomeAdminPage;