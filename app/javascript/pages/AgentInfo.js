import React from 'react';
import { 
  Button,
  Grid,
  Container ,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import { FormattedMessage } from "react-intl";

class AgentInfo extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const {i18n} = this.props;
    return(
      <>
      <Typography variant="h6" style={{marginTop: '2rem'}}>
        <FormattedMessage id="USERDETAIL.AGENTINFO" />
      </Typography>
      <Container style={{marginTop:'1rem'}}>
        <div className="company_name" style={{marginBottom: '1rem'}}>株式会社イザワークス</div>
        <ul className="company_info">
          <li>
            代表取締役:  XYZ
          </li>
          <li>
            資本金:  1000万円
          </li>
          <li>
            住所: 
          </li>
          <li>
            連絡先:
            <ul>
              <li>
                email@example.com
              </li>
              <li>
                123-456-7890
              </li>
            </ul>
          </li>
          <li>
            事業内容: <br />
              1. コンピュータソフトウェアの企画・設計・開発・販売・保守及び顧客へのサポート業務 <br />
              2. ウェブサイトの企画・設計・開発・運営及び販売 <br />
              3. インターネットのコンテンツの企画・制作及び運営 <br />
              4. デジタルコンテンツの企画・立案・制作・配信及び販売 <br />
          </li>
        </ul>
      </Container>
      </>
    )
  }
}

export default AgentInfo