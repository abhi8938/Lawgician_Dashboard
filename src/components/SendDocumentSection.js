import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Row, Col } from 'reactstrap';
import '../App.css';

class SendDocumentSection extends React.Component {
  state = {
    show: false,
    selectedFile: '',
    Message: '',
    customerError: false,
    customer: '',
    filename:'Add Document'
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  onChangeHandler = event => {
    console.log('file',event.target.files[0])
    this.setState({ selectedFile: event.target.files[0], filename:event.target.files[0].name });
  }

  render() {
    return (
      <form className="subsection" onSubmit={() => this.props.onSendDocument(this.state.customer,this.state.Message,this.state.selectedFile)}>
        <text style={styles.heading}>Reply</text>
          <TextField
            style={{ marginLeft: 1, height: 60 }}
            value={this.state.customer}
            error={this.state.customerError}
            label='Enter email/Mobile'
            variant='standard'
            onChange={this.handleChange('customer')}
          />
          <TextField
            id="filled-multiline-static"
            label="Add Message/Note"
            multiline
            rows="5"
            margin="normal"
            variant="filled"
            value={this.state.Message}
            onChange={this.handleChange('Message')}
          />
        <label className="label"> {this.state.filename}
         <input  type='file' onChange={this.onChangeHandler} />
         </label> 
         <Col className='button'>
        <Button type="submit" style={styles.button}>Send</Button> 
        </Col>
      </form>
    )
  }
}

const styles = {
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  button: {
    marginTop: 10,
    width:120,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#ccc',
  }
}

export default SendDocumentSection;