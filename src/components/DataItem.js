import React from 'react';
import 'react-chat-elements/dist/main.css';
import Message from './common/Message';
import { BASE_URL } from './../constants/endpoinst';

class DataItem extends React.Component {
  state = {
    show: false
  }

  downloadFile=(e) => () =>{
//TODO:file download
  }

  render() {
    return (
      <Message
        data={{
          uri: BASE_URL+'/documents/files/'+this.props.data.fileId,
          status: {
            click: false,
            loading: 0,
          }
        }}
        CreatedAt={this.props.data.CreatedAt}
        Type={this.props.data.Type}
        SentTo={this.props.data.SentTo}
        From={this.props.data.From}
        onClick={this.downloadFile}
        message={this.props.data.Note}
      />
    )
  }

}

const styles = {
  time: {
    fontSize: 12,
  }
}
export default DataItem