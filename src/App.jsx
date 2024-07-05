import { Gen } from "./Gen";

import 'react-toastify/dist/ReactToastify.css';
import { StickyNavbar } from "./components/Bar";

export default function App() {
  return (
    <div>
      <StickyNavbar AppComponent={Gen}></StickyNavbar>
    </div>
  );
}
