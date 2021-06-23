import React from 'react';
import PropTypes from 'prop-types';
import { MessageBox } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';

class Message extends React.Component {
  state = {
    show: false
  }

  getTitle(){
   let title = '';
    if(this.props.SentTo === 'ADMIN'){
      title = `From: ${this.props.From}`
    }else{
      title = `To: ${this.props.SentTo}`
    }
   return title
  }

  getType(){
   let type = '';
   if(this.props.Type === 'QUERY'){
     type = 'text'
   }else if(this.props.Type === 'image/png'){
     type = 'photo'
   }else if(this.props.Type === 'image/jpeg'){
     type = 'photo'
   }else if(this.props.Type === 'application/pdf'){
     type = 'file'
   }else if(this.props.Type === 'text/plain'){
    type = 'file'
   }

   return type
  }
  getPosition(){
   let position=''
   if(this.props.SentTo === 'ADMIN'){
     position = 'left'
   }else{
     position = 'right'
   }
   return position
  }
  render() {
    // let time = this.props.CreatedAt);
     return (
              <MessageBox
                 title={this.getTitle()}
                 position={this.getPosition()}
                 type={this.getType()}
                 text={this.props.message}
                 data={this.props.data}
                 date={new Date(this.props.CreatedAt)}
                 onClick={this.props.onClick}
                 notch={true}
              />
    )
  }

}
Message.propTypes = {
  // : PropTypes.array, 
  data: PropTypes.object.isRequired,
  CreatedAt:PropTypes.any.isRequired,
  Type:PropTypes.string.isRequired,
  SentTo:PropTypes.string,
  message:PropTypes.string.isRequired,
  onClick:PropTypes.func.isRequired,
  From:PropTypes.string.isRequired
}

const styles = {
  time:{
    fontSize: 12,
  }
}
export default Message