import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as totalActions from '../../store/modules/total'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { FormattedMessage } from "react-intl";

const TAX_RATE = 0.07;

const useStyles = {
  root: {
    width: '100%',
    marginTop: '3rem',
    overflowX: 'auto',
    boxShadow: 'none'
  },
  table: {
    minWidth: 700,
  },
  subTableHeader: {
    background: "#e2e2e2"
  }
};

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

class Backend extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { TotalActions } = this.props;
    TotalActions.changeTotal(this.props.epicData.subtotal);
  }

  render(){
    const { epicData } = this.props;
    return (
      <>
        <TableRow style={useStyles.subTableHeader}>
          <TableCell><FormattedMessage id="RESULT.BACKEND" /></TableCell>
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
          <TableCell align="right"><FormattedMessage id="RESULT.BACKENDARCHITECT" /></TableCell>
          <TableCell align="right">{epicData.defining_requirements.backend_architect}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.DATABASEDESIGN" /></TableCell>
          <TableCell align="right">{epicData.defining_requirements.database_design}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.STAGINGCONST" /></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.INFRAENGINEER" /></TableCell>
          <TableCell align="right">{epicData.staging_construction.infra_engineer}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.DBTABLEDESIGN" /></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.BACKENDARCHITECT" /></TableCell>
          <TableCell align="right">{epicData.dbtable_design.backend_architect}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.IMPLEMENT" /></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.BACKENDPROGRAMMER" /></TableCell>
          <TableCell align="right">{epicData.implementation.backend_programmer}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.APIIMPLEMENT" /></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.BACKENDPROGRAMMER" /></TableCell>
          <TableCell align="right">{epicData.api_implementation.backend_programmer}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.TEST" /></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.TESTDESIGN" /></TableCell>
          <TableCell align="right">{epicData.test.test_design}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.TESTEXEC" /></TableCell>
          <TableCell align="right">{epicData.test.test_execution}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.PRODCTIONENV" /></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell align="right"><FormattedMessage id="RESULT.INFRAENGINEER" /></TableCell>
          <TableCell align="right"> {epicData.building_prod_env.infra_engineer} </TableCell>
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

export default connect(mapStateToProps, mapDispatchToProps)(Backend);

