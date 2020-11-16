import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionsActions from '../store/modules/questions'
import * as totalActions from '../store/modules/total'
import { Button, Container, Grid } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel, Row
} from "react-bootstrap";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormattedMessage } from "react-intl";
import moment from 'moment';

import enMessages from "../i18n/messages/en.json";
import jaMessages from "../i18n/messages/ja.json";
import zhMessages from "../i18n/messages/zh.json";

const allMessages = {
  en: enMessages,
  ja: jaMessages,
  zh: zhMessages
};

import base64 from 'base-64';
const headers = new Headers();
headers.set('Authorization', 'Basic ' + base64.encode("admin:admin"));
headers.set('Content-Type', 'application/json');

import { v4 as uuidv4 } from 'uuid';

import short from 'short-uuid';

const baseScrumURL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:3000': 'https://scrumsourcing.herokuapp.com';

const styles={
  link:{
    color : '#fff',
    textDecoration: 'none'
  },
  row: {
    marginBottom: '1em',
  },
  title: {
    marginBottom: '1em',
  },
  container: {
    maxWidth: '600px'
  },
  section: {
    paddingLeft: '1em',
    paddingRight: '1em',
    marginBottom: '3em',
  }
}

class RegisterProject extends React.Component{

  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);

    const {i18n} = this.props;
    this.messages = allMessages[i18n.lang];

    this.registerUsernameInput = React.createRef();
    this.registerEmailInput = React.createRef();
    this.registerPasswordInput = React.createRef();
    this.loginUsernameInput = React.createRef();

    this.state = {
      registerUsername: '',
      loginUsername: '',
      error: '',
      user: {}
    }
  }

  handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  async handleClick() {

    if(!this.formValidation()) return false;

      if(await this.isUserExist()) {
        // Register Project
        let newProject = await this.registerProject();
        // Add User to Project
        let membership_payload = {
          project: {
            href: newProject._links.self.href
            // href: '/api/v3/projects/9'
          },
          principal: {
            href: this.state.user._links.self.href
          },
          roles: [
            {
              href: "/api/v3/roles/9"
            }
          ]
        }
  
        fetch(`${baseScrumURL}/api/v3/memberships`, {
          method: 'post',
          body: JSON.stringify(membership_payload),
          headers: headers,
        }).then((response) => response.json())
        .then(result=>{
            if(result._type == "Membership") {
              const { QuestionsActions } = this.props;
              QuestionsActions.reset();

              let url = baseScrumURL+'/login?username='+this.state.loginUsername+'&back_url='+baseScrumURL+'/projects/'+newProject.identifier+'/work_packages';
              this.openInNewTab(url);
            }
        });
  
      } else {
        // Register User
        let user_payload = {
          login: this.registerUsernameInput.current.value,
          email: this.registerEmailInput.current.value,
          firstName: "firstName",
          lastName: "lastName",
          admin: false,
          language: this.props.i18n.lang,
          status: "active",
          password: this.registerPasswordInput.current.value
        }

        let newUser = await fetch(`${baseScrumURL}/api/v3/users`, {
          method: 'post',
          body: JSON.stringify(user_payload),
          headers: headers,
        }).then((response) => response.json());

        if(newUser._type == "Error") {
          alert(newUser.message);
          return false;
        }

        //Register Project
        let newProject = await this.registerProject();

        let membership_payload = {
          project: {
            href: newProject._links.self.href
          },
          principal: {
            href: newUser._links.self.href
          },
          roles: [
            {
              href: "/api/v3/roles/9"
            }
          ]
        }
  
        fetch(`${baseScrumURL}/api/v3/memberships`, {
          method: 'post',
          body: JSON.stringify(membership_payload),
          headers: headers,
        }).then((response) => response.json())
        .then(result=>{
            if(result._type == "Membership") {
              const { QuestionsActions } = this.props;
              QuestionsActions.reset();

              let url = baseScrumURL+'/login?username='+this.registerUsernameInput.current.value+'&back_url='+baseScrumURL+'/projects/'+newProject.identifier+'/work_packages';
              this.openInNewTab(url);
            }
        });
  
      };
  }

  async registerProject() {
    const { questions, table }= this.props;
    let project_payload = {
      // identifier: short.generate(),
      name: questions.projectName,
      // customField35: "Text custom field value",
      // status: "",
      statusExplanation: {
        format: "markdown",
        raw: "",
        html: ""
      },
      _links: {
        // customField12: {
        //   href: "/api/v3/users/5"
        // },
        // parent: {
        //   href: "/api/v3/projects/6"
        // }
      }
    }

    let newProject = await fetch(`${baseScrumURL}/api/v3/projects`, {
      method: 'post',
      body: JSON.stringify(project_payload),
      headers: headers,
    }).then((response) => response.json());
    
    // Creates a wiki
    let wiki_payload = {
      project_id: newProject.id,
      page: {
        title: "WIKI",
        parent_id: ""
      },
      text: table.text,
      comments: ""
    }
    let newWiki = await fetch(`${baseScrumURL}/api/v1/create_wiki`, {
      method: 'post',
      body: JSON.stringify(wiki_payload),
      headers: headers,
    }).then((response) => response.json());

    // Create Versions
    let projectHref = newProject._links.self.href;

    for(let key of Object.keys(table.data)) {
      // Create a new version
      let version_payload = {
        _links: {
          definingProject: {href: projectHref}
        },
        name: this.getNameByKey(key),
        description: {
          raw: ""
        },
        startDate: null,
        endDate: null
      }
      let newVersion = await fetch(`${baseScrumURL}/api/v3/versions`, {
        method: 'post',
        body: JSON.stringify(version_payload),
        headers: headers,
      }).then((response) => response.json());
      let versionHref = newVersion._links.self.href;

      // Create a epic workpackage
      let estimatedTimeOfEpic = table.data[key].subtotal;
      let epic_workpackage_payload = {
        subject: this.getNameByKey(key),
        _links: {
          project: {href: projectHref},
          type: {href: "/api/v3/types/5"},  //Epic Workpackage type
        },
      }
      let epicWorkpackage = await fetch(`${baseScrumURL}/api/v3/work_packages?notify=false`, {
        method: 'post',
        body: JSON.stringify(epic_workpackage_payload),
        headers: headers,
      }).then((response) => response.json());
      let epicWorkPackageHref = epicWorkpackage._links.self.href;

      //Create workpackages
      for(let subKey of Object.keys(table.data[key])) {
        if(subKey == "subtotal") continue;

        //Calculate estimatedTime of workpackage
        let estimatedTimeofWorkpackage = 0
        Object.keys(table.data[key][subKey]).forEach((terminal) => {
          estimatedTimeofWorkpackage += table.data[key][subKey][terminal];
        })

        let workpackage_payload = {
          subject: this.getNameByKey(subKey),
          estimatedTime: moment.duration(estimatedTimeofWorkpackage, 'd').toISOString(),
          _links: {
            project: {href: projectHref},
            type: {href: "/api/v3/types/1"},  //Task Workpackage type
            version: {href: versionHref},
            parent: {href: epicWorkPackageHref},
          }
        }
    
        let newWorkpackage = await fetch(`${baseScrumURL}/api/v3/work_packages?notify=false`, {
            method: 'post',
            body: JSON.stringify(workpackage_payload),
            headers: headers,
          }).then((response) => response.json());
      }
    }

    return newProject;
  }

  async registerDocuments() {

  }

  getNameByKey(key) {
    switch(key) {
      case "backend":
        return this.messages["RESULT.BACKEND"];
      case "frontend":
        return this.messages["RESULT.FRONTEND"];
      case "iOS_app":
        return this.messages["RESULT.IOSAPP"];
      case "android_app":
        return this.messages["RESULT.ANDROIDAPP"];
      case "windows_app":
        return this.messages["RESULT.WINDOWSAPP"];
      case "macOS_app":
        return this.messages["RESULT.MACOSAPP"];
      case "IoT_microcom":
        return this.messages["RESULT.IOTMICROCOM"];
      case "device_driver":
        return this.messages["RESULT.DEVICEDRIVER"];
      case "technology":
        return this.messages["RESULT.TECHNOLOGY"];
      case "nonfunctions":
        return this.messages["RESULT.NONFUNCTIONS"];
      case "defining_requirements":
        return this.messages["RESULT.REQUIREMENTS"];
      case "staging_construction":
        return this.messages["RESULT.STAGINGCONST"];
      case "dbtable_design":
        return this.messages["RESULT.DBTABLEDESIGN"];
      case "implementation":
        return this.messages["RESULT.IMPLEMENT"];
      case "api_implementation":
        return this.messages["RESULT.APIIMPLEMENT"];
      case "test":
        return this.messages["RESULT.TEST"];
      case "building_prod_env":
        return this.messages["RESULT.PRODCTIONENV"];
      case "element_design":
        return this.messages["RESULT.SCREENBUTTONICONDESIGN"];
      case "server_integration_test":
        return this.messages["RESULT.SERVERINTEGRATIONTEST"];
      case "device_test":
        return this.messages["RESULT.DEVICETEST"];
      case "device_test":
        return this.messages["RESULT.DEVICETEST"];
      case "artificial_intelligence":
        return this.messages["RESULT.ARTIFICIALINTELLIGENCE"];
      case "video_streaming":
        return this.messages["RESULT.VIDEOSTREAMING"];
      case "chatbot":
        return this.messages["RESULT.CHATBOT"];
      case "scalability":
        return this.messages["RESULT.SCALABILITY"];
      case "high_performance":
        return this.messages["RESULT.HIGHPERFORMANCE"];
      case "gps_beacon":
        return this.messages["RESULT.GPSBEACON"];
      case "drm_security":
        return this.messages["RESULT.DRMSECURITY"];
      case "authentication":
        return this.messages["RESULT.AUTHENTICATION"];
      case "backup":
        return this.messages["RESULT.BACKUP"];
      case "data_migration":
        return this.messages["RESULT.DATAMIGRATION"];
      case "monitoring_alert":
        return this.messages["RESULT.MONITORINGALERT"];
      case "admin_dashboard":
        return this.messages["RESULT.ADMINDASHBOARD"];
      default:
        return "";
    }
  }

  openInNewTab(url) {
    let win = window.open(url, '_self');
  }

  formValidation() {
    let loginUsername = this.loginUsernameInput.current.value;
    let registerEmail = this.registerEmailInput.current.value;
    let registerUsername = this.registerUsernameInput.current.value;
    let registerPassword = this.registerPasswordInput.current.value;

    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if( registerEmail && !registerEmail.match(mailformat) ){
      this.setState({error: 'Invalid e-mail address.'});
      this.registerEmailInput.current.focus();
      return false;
    }

    if(loginUsername) return true;

    if(!registerEmail && !registerPassword && !registerUsername && !loginUsername) {
      this.setState({error: 'Please add the username.'});
      this.loginUsernameInput.current.focus();
      return false;
    }

    if(!registerUsername || !registerPassword || !registerEmail) {
      this.setState({error: 'Please fill out the fields.'});
      if(!registerPassword) {
        this.registerPasswordInput.current.focus();
      }
      if(!registerUsername) {
        this.registerUsernameInput.current.focus();
      }
      if(!registerEmail) {
        this.registerEmailInput.current.focus();
      }
      return false;
    }
    
    this.setState({error: ''});
    return true;
  }

  async isUserExist() {
    try {
      let userName = this.state.loginUsername;
      if(userName) {
        let userID = await fetch(`${baseScrumURL}/api/v1/get_user?login=${userName}`, {
          method: 'get',
          headers: headers
        }).then((response) => response.json());
        
        if(!userID.id){
          this.setState({error: 'The user is not found. Please check the username.'});
          return false;
        }else{
          let user = await fetch(`${baseScrumURL}/api/v3/users/${userID.id}`, {
            method: 'get',
            headers: headers,
          }).then((response) => response.json());
          this.setState({user: user});
          this.setState({error: ''})
          return true;
        }
      }else{
        if(this.registerUsernameInput.current.value){
          userName = this.registerUsernameInput.current.value;
          let userID = await fetch(`${baseScrumURL}/api/v1/get_user?login=${userName}`, {
            method: 'get',
            headers: headers
          }).then((response) => response.json());

          if(userID.id){
            let user = await fetch(`${baseScrumURL}/api/v3/users/${userID.id}`, {
              method: 'get',
              headers: headers,
            }).then((response) => response.json());
            this.setState({user: user});
            this.setState({error: ''})
            return true;
          }else{
            return false;
          }
        }else{
          return false;
        }
      };
      // let payload = [{ name: { operator: "=", values: [userName] } }]
      // let userList = await fetch(`${baseScrumURL}/api/v3/users?filters=`+JSON.stringify(payload), {
      //   method: 'get',
      //   headers: headers,
      // }).then((response) => response.json());

    } catch (error) {
      console.log(error);
      return false;
    }
  }

  render(){
    return(
      <>
        { this.state.error && <Alert severity="error" style={{marginBottom: '1rem'}}>{this.state.error}</Alert> }

        <div style={styles.section}>
          <Typography variant="h5" style={styles.title}>
            <FormattedMessage id="REGISTERPROJECT.REGISTER" />
          </Typography>
          <Container style={styles.container}>
            <Form horizontal="true">
            <Row className="align-items-center" style={styles.row}>
                <Col sm={4}>
                  <FormattedMessage id="REGISTERPROJECT.USERNAME" />
                </Col>
                <Col sm={8}>
                  <FormControl ref={this.registerUsernameInput} type="text" />
                </Col>
              </Row>

              <Row className="align-items-center" style={styles.row}>
                <Col sm={4}>
                  <FormattedMessage id="REGISTERPROJECT.EMAIL" />
                </Col>
                <Col sm={8}>
                  <FormControl ref={this.registerEmailInput} type="email" onChange={e => this.setState({registerUsername: e.target.value})}/>
                </Col>
              </Row>

              <Row className="align-items-center" style={styles.row}>
                <Col sm={4}>
                  <FormattedMessage id="REGISTERPROJECT.PASSWORD"/>
                </Col>
                <Col sm={8}>
                  <FormControl type="password" ref={this.registerPasswordInput} />
                </Col>
              </Row>
            </Form>
          </Container>
        </div>

        <div style={styles.section}>
          <Typography variant="h5" style={styles.title}>
            <FormattedMessage id="REGISTERPROJECT.LOGIN" />
          </Typography>
          <Container style={styles.container}>
            <Form horizontal="true">
              <Row className="align-items-center">
                <Col sm={4}>
                  <FormattedMessage id="REGISTERPROJECT.USERNAME" />
                </Col>
                <Col sm={8}>
                  <FormControl ref={this.loginUsernameInput} type="email" name="username" onChange={e => this.setState({loginUsername: e.target.value})}/>
                </Col>
              </Row>
              <Row className="align-items-center" style={styles.row}>
                <Col sm={4}>
                </Col>
                <Col sm={8}>
                  <Form.Text className="text-muted">
                    * Add the username registred in the project.scrumsourcing.io
                  </Form.Text>
                </Col>
              </Row>

              {/* <Row className="align-items-center" style={styles.row}>
                <Col sm={4}>
                  <FormattedMessage id="REGISTERPROJECT.PASSWORD" />
                </Col>
                <Col sm={8}>
                  <FormControl type="password" name="password" />
                </Col>
              </Row> */}
            </Form>
          </Container>
        </div>

        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/result">
              <FormattedMessage id="BUTTONS.PREV" />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.handleClick}>
              <FormattedMessage id="BUTTONS.NEXT" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
  table: state.table,
  i18n: state.i18n
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch),
  TotalActions: bindActionCreators(totalActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterProject);
