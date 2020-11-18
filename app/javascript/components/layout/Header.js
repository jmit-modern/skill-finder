import React from 'react';
import { Grid, Divider, Link } from "@material-ui/core";
import LanguageSelector from './LanguageSelector';

const styles = {
  divider: {
    marginBottom: '40px'
  }
}

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="header">
          <Grid container justify="space-between" alignItems="baseline">
            <Grid item>
            <Link href="/" className="website_title">
              <h1>SKill Finder</h1>
            </Link>
              
            </Grid>
            <Grid item>
              <div className="kt-header__topbar">
                <LanguageSelector iconType="" />
              </div>
            </Grid>
          </Grid>
        </div>
        <Divider style={styles.divider} />
      </>
    )
  }
}

export default Header;