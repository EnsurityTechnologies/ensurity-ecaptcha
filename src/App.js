import logo from './logo.svg';
import './App.css';
import Ensuritycaptcha from './components/ensurity-captcha'
import Modal from 'react-modal';

function App() {
  return (
    <div className="App">
       <Ensuritycaptcha children="helo raja"></Ensuritycaptcha>
    </div>
  );
}

export default App;
