import { Gen } from "./Gen";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className="relative grid min-h-[100vh] w-screen p-8">
      <Gen>
      </Gen>
      <ToastContainer></ToastContainer>
    </div>
  );
}
