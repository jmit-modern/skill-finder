import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionsActions from '../store/modules/questions'
import { 
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { FormattedMessage } from "react-intl";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Form, Row, Col } from "react-bootstrap";
import AgentInfo from './AgentInfo';

const styles={
  row: {
    marginBottom: '1em',
  },
  container: {

  },
}

class UserDetail extends React.Component{
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

    console.log(this.props.match.params.id)
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
      <Form horizontal="true">
        <Row>
          <Col sm={6}>
            <Row className="align-items-center" style={styles.row}>
              <Col sm={4}>
                <FormattedMessage id="LABEL.NAME" />
              </Col>
              <Col sm={8}>
                {"Alan Jane"}
              </Col>
            </Row>
          </Col>
          <Col sm={6}>
            <Row className="align-items-center" style={styles.row}>
              <Col sm={4}>
                <FormattedMessage id="LABEL.TWITTER" />
              </Col>
              <Col sm={8}>
                {"https://twitter.com"}
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col sm={6}>
            <Row className="align-items-center" style={styles.row}>
              <Col sm={4}>
                <FormattedMessage id="LABEL.EMAIL" />
              </Col>
              <Col sm={8}>
                {"test@example.com"}
              </Col>
            </Row>
          </Col>
          <Col sm={6}>
            <Row className="align-items-center" style={styles.row}>
              <Col sm={4}>
                <FormattedMessage id="LABEL.GITHUB" />
              </Col>
              <Col sm={8}>
                {"https://github.com"}
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      <Typography variant="h6" style={{marginTop: '2rem', marginBottom: '1rem'}}>
        <FormattedMessage id="REGISTERAS.DESCRIPTION1" />
      </Typography>
      <div>
        Ruby on rails, PHP, NodeJS, Python, ReactJS, VueJS
      </div>
      <AgentInfo />

      <Grid container justify="flex-end" style={{marginTop: '2rem'}}>
        <Grid item>
          <Button variant="contained" color="primary">
            <FormattedMessage id="BUTTONS.CONTACT" />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)