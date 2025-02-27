import Header from "../../modules/public-user/stPublic/components/Header"
import Footer from "../../modules/public-user/stPublic/components/Footer"
import { Outlet } from 'react-router-dom'

const StudentDashboardLayout = () => {
    return (
        <div>
            <Header/>
            <div>
                <main>
                    <Outlet/>
                </main>
            </div>
            <Footer/>
        </div>
    )
}

export default StudentDashboardLayout
