import React, { Component } from 'react';
import { Navbar, Row, Col} from 'reactstrap';
import axios from 'axios';

import classes from'./MainDashboard.css';
import Projects from '../../containers/Projects/Projects';
import FileDisplay from '../../components/FileDisplay/FileDisplay';
import Modal from '../../components/Modal/Modal';
import InnerNav from '../../components/InnerNav/InnerNav';
import FileTree from '../../components/FileTree/FileTree';
import UploadFiles from '../../containers/UploadFiles/UploadFiles';
import FileManagementContainer from '../../components/FileManagementContainer/FileManagementContainer';


class MainDashboard extends Component {
state = {
    projects: null,
    currentProject:null,
    currentFiles: [],
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    uploading : false
  }

  resizeWindow = () => {
    // This will determine the height and width of the window
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
  }

  componentDidMount(){
    // This attaches an event listener on the window 
    this.resize = this.resizeWindow.bind(this);
    window.addEventListener("resize", this.resize);
    }
    
  setCurrentProject = (project) =>{
        // This will fetch the files based on the current project that is open
        this.setState({currentProject: project});
    }
    
    //This will open the modal, and start the uploading processc
  startUploadHandler = () => {
      this.setState({uploading: true})
  }
    
    //This will cancel the upload process and close the modal
  cancelUploadHandler = () => {
    this.setState({uploading : false});
  }
  
  render() {
    
    let modal = null;
    
    if(this.state.uploading){
      modal =( 
        <Modal show={this.state.uploading} modalClosed={this.cancelUploadHandler}>
          <UploadFiles />
        </Modal>);
    }
    
    const mainContainerStyle = {
      height: this.state.windowHeight - 54,
      padding: "8px",
      width: this.state.windowWidth,
      backgroundColor: "#e4ecf5",
      margin:0,
      border: "2px solid #e4ecf5"
    }
 
    return (
      <div className={classes.App}>
      {modal}
        <Navbar className={classes.navbar}>
          <Projects projects={this.state.projects} setProject = {this.setCurrentProject.bind(this)}/>
          <span className={classes.iconWrapper}>
            <span className={classes.icon}>
              <i className="far fa-question-circle" style={{"paddingRight":"5px"}}></i>
            </span>
            <span className={classes.icon}>
              <i className="far fa-user-circle" onClick={this.props.openSettings}></i>
            </span>
          </span>
        </Navbar>
        <Row style={mainContainerStyle}>
            <Col xs = "2" className={classes.sideNav}>
              <FileTree />
            </Col>
            <Col xs="10">
              {/* <InnerNav clicked={this.startUploadHandler.bind(this)}/>
              <FileDisplay height={this.state.windowHeight - 132} files={this.state.currentFiles}/> */}
              <FileManagementContainer
                uploading={this.startUploadHandler.bind(this)}
                height={this.state.windowHeight - 132}/>
            </Col>
         </Row>
       </div>
    );
  }
}

export default MainDashboard;