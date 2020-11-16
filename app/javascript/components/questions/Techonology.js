import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionsActions from '../../store/modules/questions'
import { Grid, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { FormattedMessage } from "react-intl";

class Technology extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      checkedItems: props.technology,
    }
  }

  handleChange = (e) => {
    let checked_list = this.state.checkedItems;
    let check = e.target.checked;
    let checked_item = e.target.name;
    const { QuestionsActions } = this.props;

    if (check) {
      this.setState({checkedItems: [...checked_list, checked_item]}, ()=>{
        QuestionsActions.changeTechnology(this.state.checkedItems);
      })
    } else {
      var index = checked_list.indexOf(checked_item);
      if(index > -1) {
        checked_list.splice(index, 1);
        this.setState({checkedItems: checked_list}, ()=>{
          QuestionsActions.changeTechnology(this.state.checkedItems);
        })
      }
    }
  }

  render() {
    const { handleChange } = this;
    const { checkedItems } = this.state;

    return(
      <>
        <div className="question" data-qid="8">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              <FormattedMessage id="QUESTIONS.TECHNOLOGY.TITLE" />
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name="artificialIntelligence" checked={checkedItems.includes("artificialIntelligence")} onChange={handleChange} value="artificial_intelligence" color="primary" />}
                label={<FormattedMessage id="QUESTIONS.TECHNOLOGY.OPTION1" />}
              />
              {/* <FormControlLabel
                control={<Checkbox name="security" checked={checkedItems.includes("security")} onChange={handleChange} value="security" color="primary" />}
                label={<FormattedMessage id="QUESTIONS.TECHNOLOGY.OPTION2" />}
              />
              <FormControlLabel
                control={
                  <Checkbox name="externeralServerAccess" checked={checkedItems.includes("externeralServerAccess")} onChange={handleChange} value="external_server_access" color="primary" />
                }
                label={<FormattedMessage id="QUESTIONS.TECHNOLOGY.OPTION3" />}
              /> */}
              <FormControlLabel
                control={
                  <Checkbox name="highPerformance" checked={checkedItems.includes("highPerformance")} onChange={handleChange} value="high_performance" color="primary" />
                }
                label={<FormattedMessage id="QUESTIONS.TECHNOLOGY.OPTION4" />}
              />
              <FormControlLabel
                control={
                  <Checkbox name="videoStreaming" checked={checkedItems.includes("videoStreaming")} onChange={handleChange} value="video_streaming" color="primary" />
                }
                label={<FormattedMessage id="QUESTIONS.TECHNOLOGY.OPTION5" />}
              />
              <FormControlLabel
                control={
                  <Checkbox name="chatBot" checked={checkedItems.includes("chatBot")} onChange={handleChange} value="chat_bot" color="primary" />
                }
                label={<FormattedMessage id="QUESTIONS.TECHNOLOGY.OPTION6" />}
              />
              <FormControlLabel
                control={
                  <Checkbox name="GPS_beacon" checked={checkedItems.includes("GPS_beacon")} onChange={handleChange} value="gps_beacon" color="primary" />
                }
                label={<FormattedMessage id="QUESTIONS.TECHNOLOGY.OPTION7" />}
              />
              <FormControlLabel
                control={
                  <Checkbox name="DRM_security" checked={checkedItems.includes("DRM_security")} onChange={handleChange} value="drm_security" color="primary" />
                }
                label={<FormattedMessage id="QUESTIONS.TECHNOLOGY.OPTION8" />}
              />
            </FormGroup>
          </FormControl>
        </div>

        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/database">
              <FormattedMessage id="BUTTONS.PREV" />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/non_functions">
              <FormattedMessage id="BUTTONS.NEXT" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  technology: state.questions.technology
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Technology);