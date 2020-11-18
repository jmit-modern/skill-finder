import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionsActions from '../store/modules/questions'
import { Button, Grid, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from "react-intl";
import ChipInput from 'material-ui-chip-input';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Form, FormControl, Row, Col } from "react-bootstrap";

const styles={
  row: {
    marginBottom: '1em',
  },
  container: {
    maxWidth: '600px',
    marginLeft: '0'
  },
}

class RegisterAs extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      developerLang: '',
      skills: ['javascript', 'php', 'Ruby on Rails', 'Python'],
      dateRange: [{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }]
    }

    this.registerUsernameInput = React.createRef();
    this.registerEmailInput = React.createRef();
    this.registerPasswordInput = React.createRef();
  }

  componentDidMount(){
    const { QuestionsActions } = this.props;
    QuestionsActions.reset();
  }


  handleChange = event => {
    const name = event.target.name;
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  handleSkillChange(chips){
    this.setState({skills: chips})
  }

  handleRange = (ranges) => {
    this.setState({dateRange: [ranges.selection]})
  }

  render(){
    const {i18n} = this.props;
    return(
      <>
      <Container style={styles.container}>
        <Form horizontal="true">
          <Row className="align-items-center" style={styles.row}>
            <Col sm={4}>
              <FormattedMessage id="LABEL.USERNAME" />
            </Col>
            <Col sm={8}>
              <FormControl ref={this.registerUsernameInput} type="text" />
            </Col>
          </Row>

          <Row className="align-items-center" style={styles.row}>
            <Col sm={4}>
              <FormattedMessage id="LABEL.EMAIL" />
            </Col>
            <Col sm={8}>
              <FormControl ref={this.registerEmailInput} type="email" onChange={e => this.setState({registerUsername: e.target.value})}/>
            </Col>
          </Row>

          <Row className="align-items-center" style={styles.row}>
            <Col sm={4}>
              <FormattedMessage id="LABEL.PASSWORD"/>
            </Col>
            <Col sm={8}>
              <FormControl type="password" ref={this.registerPasswordInput} />
            </Col>
          </Row>
        </Form>
      </Container>

      <Typography variant="h6" style={{marginTop: '2rem'}}>
        <FormattedMessage id="REGISTERAS.DESCRIPTION1" />
      </Typography>
      <ChipInput
        dataSource = {this.state.skills}
        placeholder = "Skill name"
        fullWidthInput = {true}
        fullWidth = {true}
        onChange={(chips) => this.handleSkillChange(chips)}
        style={{marginTop: '1em'}}
      />

      <Grid container justify="flex-end" style={{marginTop: '2rem'}}>
        <Grid item>
          <Button variant="contained" color="primary" href="/">
            <FormattedMessage id="BUTTONS.BACK" />
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            <FormattedMessage id="BUTTONS.REGISTER" />
          </Button>
        </Grid>
      </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  i18n: state.i18n
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterAs)