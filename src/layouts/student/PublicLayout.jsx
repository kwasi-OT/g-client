import StudentHome from "../../modules/public-user/stPublic/pages/StudentHome";
import Header from "../../modules/public-user/stPublic/components/Header";
import Footer from '../../modules/public-user/stPublic/components/Footer'

const StudentPublicLayout = () => {
    return (
        <div>
            <Header />
            <StudentHome />
            <Footer />
        </div>
    )
}

export default StudentPublicLayout