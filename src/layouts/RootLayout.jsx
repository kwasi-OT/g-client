import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div>
        {/* Optional: Global navigation, header, etc. */}
        <Outlet />
        {/* Optional: Global footer */}
        </div>
    );
};

export default RootLayout;