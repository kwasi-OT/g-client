import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Blocks } from 'react-loader-spinner';

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Suspense fallback={<Blocks 
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{ justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}
                wrapperClass="flex justify-center items-center h-screen w-full"
                visible={true}
            />}>
                <main className="flex-grow">
                    <Outlet />
                </main>
            </Suspense>
        </div>
    );
};

export default RootLayout;