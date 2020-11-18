import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as questionsActions from '../store/modules/questions'
import { Button, Container, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from "react-intl";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import ChipInput from 'material-ui-chip-input';
import { DateRangePicker, DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import { enUS, ja, zhCN } from 'date-fns/locale'
import SearchResult from './SearchResult';

const locales = {
  en: enUS,
  ja: ja,
  zh: zhCN
};

class HomePage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      developerLang: '',
      skills: ['javascript', 'php', 'Ruby on Rails', 'Python'],
      dateRange: [{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }],
      searchResultShow: false
    }

    this.scrollToSearch = React.createRef();
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
    console.log(chips)
  }

  handleRange = (ranges) => {
    this.setState({dateRange: [ranges.selection]})
  }

  handleSearch = event => {
    this.setState({searchResultShow: true}, ()=>{
      this.scrollToSearch.current.scrollIntoView();
    })
  }

  render(){
    const {i18n} = this.props;
    const { searchResultShow } = this.state;
    return(
      <>
        <Grid container justify="space-between" style={{marginTop: '20px'}}>
          <Grid item>
            <Typography variant="h6">
              <FormattedMessage id="TOPPAGE.DESCRIPTION1" />
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" href="/register_as">
              <FormattedMessage id="TOPPAGE.BUTTON1" />
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="space-between" style={{marginTop: '1.3rem'}}>
          <Grid item>
            <Typography variant="h6">
              <FormattedMessage id="TOPPAGE.DESCRIPTION2" />
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" href="/upload_list">
              <FormattedMessage id="TOPPAGE.BUTTON2" />
            </Button>
          </Grid>
        </Grid>

        <Grid style={{marginTop: '1.3rem'}}>
          <Typography variant="h6">
            <FormattedMessage id="TOPPAGE.DESCRIPTION3" />
          </Typography>
          <ChipInput
            dataSource = {this.state.skills}
            placeholder = "Skill name"
            fullWidthInput
            fullWidth
            onChange={(chips) => this.handleSkillChange(chips)}
            style={{marginTop: '0.5rem'}}
          />
        </Grid>

        <Grid container style={{marginTop: '1.3rem'}}>
          <Grid item style={{marginRight: '2rem'}}>
            <Typography variant="h6">
              <FormattedMessage id="TOPPAGE.DESCRIPTION4" />
            </Typography>
          </Grid>
          <Grid item>
            <NativeSelect
              value={this.state.developerLang}
              onChange={this.handleChange}
              name="developerLang"
              inputProps={{ 'aria-label': 'developerLanguage' }}
            >
              <option value="">None</option>
              <FormattedMessage id="TOPPAGE.LANGUAGE1">
                {(message) => <option value="jp">{message}</option>}
              </FormattedMessage>
              <FormattedMessage id="TOPPAGE.LANGUAGE2">
                {(message) => <option value="en">{message}</option>}
              </FormattedMessage>
              <FormattedMessage id="TOPPAGE.LANGUAGE3">
                {(message) => <option value="zh">{message}</option>}
              </FormattedMessage>
            </NativeSelect>
          </Grid>
        </Grid>

        <Grid container style={{marginTop: '1.3rem'}}>
          <Grid item style={{marginRight: '2rem'}}>
            <Typography variant="h6"><FormattedMessage id="TOPPAGE.DESCRIPTION5" /></Typography>
          </Grid>
          <Grid item>
            <DateRange
              locale={locales[i18n.lang]}
              onChange={this.handleRange}
              months={2}
              ranges={this.state.dateRange}
              direction="horizontal"
            />
          </Grid>
        </Grid>

        <Grid container justify="flex-end">
        <Grid item>
          <Button variant="contained" color="primary" onClick={this.handleSearch}>
            <FormattedMessage id="TOPPAGE.BUTTON3" />
          </Button>
        </Grid>
      </Grid>
      <div ref={this.scrollToSearch}></div>
      {searchResultShow && (<SearchResult childRef={ref => (this.searchResultRef = ref)} />)}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)