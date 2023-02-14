import React from 'react';
import './style.css';
import logo from './img/ecaptcha.png';
import Modal from 'react-modal';
import axios from "axios";
import parse from "html-react-parser";
import DOMPurify from "dompurify";


const customStyles = {
  content: {
    width: 300,
    height:300
  },
};

// const Ensuritycaptcha = (props) => {

class Ensuritycaptcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      qrdata:'',
      requestId:'',
    };
  }

  openModal = () => {
    this.setState({modalIsOpen:true});
  }

  closeModal = () => {
    this.setState({modalIsOpen:false});
  }
  afterOpenModal = () => {
    this.handleClick().then((resp) => {

    });
  }

  onClickCaptureHandler = (resp) => {

  console.log(resp);

    var pos_x = resp.clientX - document.getElementById("tpcg").offsetLeft - 40;
    var pos_y = resp.clientY - document.getElementById("tpcg").offsetTop - 40;

    axios.get('https://localhost:44347/api/captcha/validate-code?requestId=' + this.state.requestId + "&x=" + pos_x + "&y=" + pos_y).then((response) => {
      console.log(response);


    });
  };

   handleClick = async () => {

      return axios.get('https://localhost:44347/api/captcha/get-code').then((response) => {
        console.log(response.data);
        const cleanHTML = DOMPurify.sanitize(response.data.htmlRaw, {
          USE_PROFILES: { html: true },
        });
        this.setState({qrdata:cleanHTML});
        this.setState({requestId:response.data.requestId});
      });
  };
  render() {
  return(
  <div className = "captcha-component" >
      <h4>Ensurity E-Captcha</h4>
    {/* {props.children} */ }
    <div className = "container" >
      <div className="row qrrow">
        <div className="qrbox">
          <div className="qrinbox">
            <a type="button" className="chech" id="check" onClick={this.openModal}>
              <i className="fa fa-check" aria-hidden="true"></i><i className="fa fa-times" aria-hidden="true"></i>
            </a>
            <span className="text">I'm not a robot</span> <span className="image">
              <img src={logo} />
            </span>
          </div>
        </div>
      </div>
    </div>
  <Modal
    isOpen={this.state.modalIsOpen}
    onAfterOpen={this.afterOpenModal}
    onRequestClose={this.closeModal}
    contentLabel="QR Modal"
    style={customStyles}
  >
    <div onClick={this.onClickCaptureHandler}>
       {parse(this.state.qrdata)}
    </div>
  </Modal>
  </div >);
  }
};

export default Ensuritycaptcha;