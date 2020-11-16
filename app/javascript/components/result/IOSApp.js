import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as totalActions from '../../store/modules/total'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { FormattedMessage } from "react-intl";

const useStyles = {
  subTableHeader: {
    background: "#e2e2e2"
  }
}

class IOSApp extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const { TotalActions } = this.props;
    TotalActions.changeTotal(this.props.epicData.subtotal);
  }

  render(){
    const { epicData } = this.props;
    return (
      <>
        <TableRow style={useStyles.subTableHeader}>
          <TableCell><FormattedMessage id="RESULT.IOSAPP" /></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.REQUIREMENTS" /></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.IOSPROGRAMMER" /></TableCell>
          <TableCell align="right"> {epicData.defining_requirements.iOS_programmer} </TableCell>
        </TableRow>

        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.SCREENBUTTONICONDESIGN" /></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.DESIGNER" /></TableCell>
          <TableCell align="right"> {epicData.element_design.designer} </TableCell>
        </TableRow>

        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.IMPLEMENT" /></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.IOSPROGRAMMER" /></TableCell>
          <TableCell align="right"> {epicData.implementation.iOS_programmer} </TableCell>
        </TableRow>

        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.TEST" /></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.TESTEXEC" /></TableCell>
          <TableCell align="right"> {epicData.test.test_execution} </TableCell>
        </TableRow>

        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.SERVERINTEGRATIONTEST" /></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.TESTDESIGN" /></TableCell>
          <TableCell align="right"> {epicData.server_integration_test.test_design} </TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.TESTEXEC" /></TableCell>
          <TableCell align="right"> {epicData.server_integration_test.test_execution} </TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={2}></TableCell>
          <TableCell align="right"><h5><FormattedMessage id="RESULT.SUBTOTAL" /></h5></TableCell>
          <TableCell align="right"> {epicData.subtotal} </TableCell>
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

export default connect(mapStateToProps, mapDispatchToProps)(IOSApp);
