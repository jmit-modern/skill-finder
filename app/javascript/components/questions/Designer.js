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

class Designer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      checkedItems: this.props.designer,
    }
  }

  handleChange = (e) => {
    let checked_list = this.state.checkedItems;
    console.log("before process")
    console.log(checked_list)
    let check = e.target.checked;
    let checked_item = e.target.name;
    const { QuestionsActions } = this.props;

    if (check) {
      this.setState({checkedItems: [...checked_list, checked_item]}, ()=>{
        console.log("added");
        console.log(this.state.checkedItems);
        QuestionsActions.changeDesigner(this.state.checkedItems);
      })
    } else {
      var index = checked_list.indexOf(checked_item);
      console.log(index);
      if(index > -1) {
        checked_list.splice(index, 1);
        this.setState({checkedItems: checked_list}, ()=>{
          console.log("removed");
          console.log(this.state.checkedItems);
          QuestionsActions.changeDesigner(this.state.checkedItems);
        });
      }
    }
  }

  render() {
    const { handleChange } = this;
    const { designer } = this.props;
    const { checkedItems } = this.state

    return(
      <>
        <div className="question" data-qid="10">
          <FormControl component="fieldset" className={"formControl"}>
            <Typography variant="h6" className="q_title">
              <FormattedMessage id="QUESTIONS.DESIGNER.TITLE" />
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name="screenconcept" checked={checkedItems.includes("screenconcept")} onChange={handleChange} value="screenconcept" color="primary" />}
                label={<FormattedMessage id="QUESTIONS.DESIGNER.OPTION1" />}
              />
              <FormControlLabel
                control={<Checkbox name="icon" checked={checkedItems.includes("icon")} onChange={handleChange} value="icon" color="primary" />}
                label={<FormattedMessage id="QUESTIONS.DESIGNER.OPTION2" />}
              />
              <FormControlLabel
                control={<Checkbox name="buttons" checked={checkedItems.includes("buttons")} onChange={handleChange} value="buttons" color="primary" />}
                label={<FormattedMessage id="QUESTIONS.DESIGNER.OPTION3" />}
              />
            </FormGroup>
          </FormControl>
        </div>

        <Grid container justify="flex-end" style={{marginTop: '20px'}}>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/infrastructure">
              <FormattedMessage id="BUTTONS.PREV" />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/questions/priority">
              <FormattedMessage id="BUTTONS.NEXT" />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  designer: state.questions.designer
});

const mapDispatchToProps = (dispatch) => ({
  QuestionsActions: bindActionCreators(questionsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Designer);