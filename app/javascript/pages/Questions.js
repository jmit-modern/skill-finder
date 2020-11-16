import React from 'react';
import { Button, Grid, StylesProvider, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    marginTop: "1em",
  },
  title: {
    marginBottom: "1em",
  }
};

class Questions extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      projectName: '',
      requirements: 'no',
      appTarget: 'webonly',
      projectFeatureNum: '',
      devlanguage: 'target_standard',
      frontend: '',
      artificialIntelligence: false,
      technology: {
        artificialIntelligence: false,
        security: false,
        externeralServerAccess: false,
        highPerformance: false,
      },
      infrastructure: '',
      designer: '',
      priority: ''
    }

    this.classes = useStyles;
    this.handleTechnology = this.handleTechnology.bind(this)
  }

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value });
  };

  handleTechnology = name => event => {
    this.setState({...this.state, technology: {...this.state.technology, [name]: event.target.checked}})
  }
  
  render(){
    return(
      <>
      <div className="questions">
        <div className="question" data-qid="1">
          <FormControl fullWidth>
            <Typography variant="h6" className="q_title">
              What is the project name?
            </Typography>
            <TextField
              id="project-name"
              label="Project Name"
              value={this.state.projectName}
              onChange={this.handleChange('projectName')}
            />
          </FormControl>
        </div>

        <div className="question" data-qid="2">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              Are you finished defining requirements or creating a product backlog for your project?
            </Typography>
            <RadioGroup
              aria-label="Project Requirements"
              row
              name="requirements"
              className={"group"}
              value={this.state.requirements}
              onChange={this.handleChange('requirements')}
            >
              <FormControlLabel value="yes" control={<Radio color="primary" />} label="Yes" />
              <FormControlLabel value="no" control={<Radio color="primary" />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="question" data-qid="3">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              Which of the following is your target?
            </Typography>

            <RadioGroup
              aria-label="App target"
              name="appTarget"
              className={"group"}
              value={this.state.appTarget}
              onChange={this.handleChange('appTarget')}
            >
              <div className="sub_group">
                <div className="subtitle">Web App</div>
                <div>
                  <FormControlLabel value="webonly" control={<Radio color="primary" />} label="Web Only" />
                  <FormControlLabel value="webapp_include_ios" control={<Radio color="primary" />} label="Including iOS apps" />
                  <FormControlLabel value="webapp_include_android" control={<Radio color="primary" />} label="Including Android apps" />
                </div>
              </div>

              <div className="sub_group">
                <div className="subtitle">Windows</div>
                <FormControlLabel value="windowsapp" control={<Radio color="primary" />} label="Windows Application" />
              </div>

              <div className="sub_group">
                <div className="subtitle">MacOS</div>
                <FormControlLabel value="macosapp" control={<Radio color="primary" />} label="MacOS App" />
              </div>

              <div className="sub_group">
                <div className="subtitle">embedded (e.g. software)</div>
                <div>
                  <FormControlLabel value="arduino" control={<Radio color="primary" />} label="Arduino" />
                  <FormControlLabel value="raspberrypi" control={<Radio color="primary" />} label="RaspberryPi" />
                  <FormControlLabel value="embedother" control={<Radio color="primary" />} label="Other" />
                </div>
              </div>

              <div className="sub_group">
                <div className="subtitle">smartphone app</div>
                <div>
                  <FormControlLabel value="iOSonly" control={<Radio color="primary" />} label="iOS only" />
                  <FormControlLabel value="androidonly" control={<Radio color="primary" />} label="Android only" />
                  <FormControlLabel value="iOS_android" control={<Radio color="primary" />} label="Both iOS and Android" />
                </div>
              </div>
            </RadioGroup>
          </FormControl>
        </div>

        <div className="question" data-qid="4">
          <FormControl>
            <Typography variant="h6" className="q_title">
              Approximately how many features does Project have?
            </Typography>
            <TextField
              id="project-features"
              label="Numbers of Project Features"
              value={this.state.projectFeatureNum}
              onChange={this.handleChange('projectFeatureNum')}
              type="number"
            />
          </FormControl>
        </div>

        <div className="question" data-qid="5">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              Language.
            </Typography>
            <RadioGroup
              aria-label="Programming language"
              name="devlanguage"
              className={"group"}
              value={this.state.devlanguage}
              onChange={this.handleChange('devlanguage')}
            >
              <FormControlLabel value="target_standard" control={<Radio color="primary" />} label="target standard" />
              <FormControlLabel value="java" control={<Radio color="primary" />} label="Java" />
              <FormControlLabel value="php" control={<Radio color="primary" />} label="PHP" />
              <FormControlLabel value="ruby" control={<Radio color="primary" />} label="Ruby" />
              <FormControlLabel value="swift" control={<Radio color="primary" />} label="Swift" />
              <FormControlLabel value="cplus" control={<Radio color="primary" />} label="C/C++" />
              <FormControlLabel value="javascript" control={<Radio color="primary" />} label="JavaScript" />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="question" data-qid="6">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              Do you need front-end development?
            </Typography>
            <RadioGroup
              aria-label="Frontend"
              name="frontend"
              className={"group"}
              value={this.state.frontend}
              onChange={this.handleChange('frontend')}
            >
              <FormControlLabel value="unnecessary" control={<Radio color="primary" />} label="unnecessary" />
              <FormControlLabel value="react" control={<Radio color="primary" />} label="React" />
              <FormControlLabel value="vue" control={<Radio color="primary" />} label="Vue" />
              <FormControlLabel value="angular" control={<Radio color="primary" />} label="Angular" />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="question" data-qid="7">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              What technology do you use in this project? (Multiple selections possible)
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={this.state.technology.artificialIntelligence} onChange={this.handleTechnology('artificialIntelligence')} value="artificial_intelligence" color="primary" />}
                label="artificial intelligence"
              />
              <FormControlLabel
                control={<Checkbox checked={this.state.technology.security} onChange={this.handleTechnology('security')} value="security" color="primary" />}
                label="Security"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={this.state.technology.externeralServerAccess} onChange={this.handleTechnology('externeralServerAccess')} value="external_server_access" color="primary" />
                }
                label="External Server access"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={this.state.technology.highPerformance} onChange={this.handleTechnology('highPerformance')} value="high_performance" color="primary" />
                }
                label="High Performance"
              />
            </FormGroup>
          </FormControl>
        </div>

        <div className="question" data-qid="8">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              infrastructure
            </Typography>
            <RadioGroup
              aria-label="Programming language"
              name="infrastructure"
              className={"group"}
              value={this.state.infrastructure}
              onChange={this.handleChange('infrastructure')}
            >
              <FormControlLabel value="onpremise" control={<Radio color="primary" />} label="on-premise" />
              <FormControlLabel value="aws" control={<Radio color="primary" />} label="AWS" />
              <FormControlLabel value="gcp" control={<Radio color="primary" />} label="GCP" />
              <FormControlLabel value="azure" control={<Radio color="primary" />} label="Azure" />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="question" data-qid="9">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              Do you have any items that need a designer?
            </Typography>
            <RadioGroup
              aria-label="Need a designer"
              name="designer"
              className={"group"}
              value={this.state.designer}
              onChange={this.handleChange('designer')}
            >
              <FormControlLabel value="screenconcept" control={<Radio color="primary" />} label="Screen Concept" />
              <FormControlLabel value="icon" control={<Radio color="primary" />} label="icon" />
              <FormControlLabel value="buttons" control={<Radio color="primary" />} label="buttons" />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="question" data-qid="10">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              priority
            </Typography>
            <RadioGroup
              aria-label="priority"
              name="priority"
              className={"group"}
              value={this.state.priority}
              onChange={this.handleChange('priority')}
            >
              <FormControlLabel value="cost" control={<Radio color="primary" />} label="cost" />
              <FormControlLabel value="quality" control={<Radio color="primary" />} label="quality" />
              <FormControlLabel value="delivery" control={<Radio color="primary" />} label="delivery" />
            </RadioGroup>
          </FormControl>
        </div>

      </div>


      <Grid container justify="flex-end" style={{marginTop: '20px'}}>
        <Grid item>
          <Button variant="contained" color="primary">
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Next
          </Button>
        </Grid>
      </Grid>
      </>
    )
  }
}

export default Questions
