import NavbarContainer from './components/NavbarContainer.jsx';
import './App.css';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  let history = useHistory();
  history.push('/login');

  return (
    <NavbarContainer/>
  );
}

export default App;
