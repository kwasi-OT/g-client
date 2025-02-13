import Dashboard from "../../modules/student/pages/Dashboard"
import Header from "../../modules/public-user/stPublic/components/Header"
import Footer from "../../modules/public-user/stPublic/components/Footer"

const StudentDashboardLayout = () => {
    return (
        <div>
            <Header/>
            <Dashboard/>
            <Footer/>
        </div>
    )
}

export default StudentDashboardLayout
