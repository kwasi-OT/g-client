import { RouterProvider } from 'react-router-dom';
import router from './routing/index';

function App() {
  return <RouterProvider router={router} />;
}

export default App;