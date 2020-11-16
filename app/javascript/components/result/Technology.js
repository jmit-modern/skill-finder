import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as totalActions from '../../store/modules/total';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { FormattedMessage } from "react-intl";

const useStyles = {
  subTableHeader: {
    background: "#e2e2e2"
  }
}

class Technology extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      subtotal: 0
    }
  }
  componentDidMount(){
    const { epicData } = this.props;
    let subtotal = 0;
    if("artificial_intelligence" in epicData){
      subtotal += epicData.artificial_intelligence.ai_engineer;
    }
    if("video_streaming" in epicData){
      subtotal += epicData.video_streaming.infra_engineer;
    }
    if("chatbot" in epicData){
      subtotal += epicData.chatbot.backend_engineer;
    }
    if("scalability" in epicData){
      subtotal += epicData.scalability.backend_engineer;
    }
    if("high_performance" in epicData){
      subtotal += epicData.high_performance.infra_engineer;
    }
    if("gps_beacon" in epicData){
      subtotal += epicData.gps_beacon.frontend_engineer;
    }
    if("drm_security" in epicData){
      subtotal += epicData.drm_security.security_engineer;
    }
    this.setState({subtotal: subtotal});

    // Add subtotal to total
    const { TotalActions } = this.props;
    TotalActions.changeTotal(subtotal);
  }
  render(){
    const { epicData } = this.props;
    return (
      <>
        <TableRow style={useStyles.subTableHeader}>
          <TableCell><FormattedMessage id="RESULT.TECHNOLOGY" /></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>

        {"artificial_intelligence" in epicData ? (
          <>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.ARTIFICIALINTELLIGENCE" /></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.AIENGINEER" /></TableCell>
              <TableCell align="right"> {epicData.artificial_intelligence.ai_engineer} </TableCell>
            </TableRow>
          </>
        ): null}

        {"video_streaming" in epicData ? (
        <>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right"><FormattedMessage id="RESULT.VIDEOSTREAMING" /></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right"><FormattedMessage id="RESULT.INFRAENGINEER" /></TableCell>
            <TableCell align="right"> {epicData.video_streaming.infra_engineer} </TableCell>
          </TableRow>
        </>
        ): null}

        {"chatbot" in epicData ? (
          <>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.CHATBOT" /></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.BACKENDENGINEER" /></TableCell>
              <TableCell align="right"> {epicData.chatbot.backend_engineer} </TableCell>
            </TableRow>
          </>
        ): null}

        {"scalability" in epicData ? (
          <>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.SCALABILITY" /></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.INFRAENGINEER" /></TableCell>
              <TableCell align="right"> {epicData.scalability.infra_engineer} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.BACKENDENGINEER" /></TableCell>
              <TableCell align="right"> {epicData.scalability.backend_engineer} </TableCell>
            </TableRow>
          </>
        ): null}

        {"high_performance" in epicData ? (
          <>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.HIGHPERFORMANCE" /></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.INFRAENGINEER" /></TableCell>
              <TableCell align="right"> {epicData.high_performance.infra_engineer} </TableCell>
            </TableRow>
          </>
        ): null}

        {"gps_beacon" in epicData ? (
          <>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.GPSBEACON" /></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.FRONTENDENGINEER" /></TableCell>
              <TableCell align="right"> {epicData.gps_beacon.frontend_engineer} </TableCell>
            </TableRow>
          </>
        ): null}

        {"drm_security" in epicData ? (
          <>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.DRMSECURITY" /></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right"><FormattedMessage id="RESULT.SECURITYENGINEER" /></TableCell>
              <TableCell align="right"> {epicData.drm_security.security_engineer} </TableCell>
            </TableRow>
          </>
        ): null}

        <TableRow>
          <TableCell colSpan={2}></TableCell>
          <TableCell align="right"><h5><FormattedMessage id="RESULT.SUBTOTAL" /></h5></TableCell>
          <TableCell align="right"> {this.state.subtotal} </TableCell>
        </TableRow>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  value: state.total.value
});

const mapDispatchToProps = (dispatch) => ({
  TotalActions: bindActionCreators(totalActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Technology);
