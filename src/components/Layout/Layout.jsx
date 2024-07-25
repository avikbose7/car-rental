import React, { Fragment} from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'
import { useAuth } from '../services/AuthContext';

const Layout = () => {
  const { username, authToken, handleLogout } = useAuth();

    return <Fragment>
        <Header value={{username, authToken, handleLogout}}/>
        <div>
            <Routers/>
        </div>
        <Footer/>
    </Fragment>
}
export default Layout;