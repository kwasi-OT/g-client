import { RouterProvider } from 'react-router-dom';
import router from './routing/index';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;