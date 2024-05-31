import ReactDOM from 'react-dom/client';
import router from './utils/Router';
import { RouterProvider } from 'react-router-dom';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
