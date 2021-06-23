import React from 'react';
import TextField from '@material-ui/core/TextField';
import './App.css';
import { Row, Col } from 'reactstrap';
import { createUserToken } from './requests';
const title = {
  pageTitle: 'Lawgician Dashboard',
};

class Login extends React.Component {
  state = {
    Email: '',
    password: ''
  }


  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  loginUser = (e) => {
    e.preventDefault();
    createUserToken(this.state.Email, this.state.password)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('Token', response.data);
          this.props.history.push('/home');
        } else {
          alert(response.data);
        }
      })
      .catch(error => {
        console.log(`ERROR:${error}`);
      })
  }
  render() {
    return (
      <div className='login'>
        <div style={{ padding: 20 }}>
          <text style={{ fontWeight: '600', fontSize: 34 }}>{title.pageTitle}</text>
        </div>
        <form style={{ textAlign: 'center' }} onSubmit={this.loginUser}>
          <text style={{ fontWeight: '400', fontSize: 26 }}>Login Page</text>
          <div style={{ padding: 15, textAlign: 'center' }}>
            <TextField
              style={{ width: 250 }}
              id="outlined-dense"
              variant="outlined"
              label="EMAIL"
              value={this.state.Email}
              onChange={this.handleChange('Email')}
            />
          </div>
          <div style={{ padding: 10, textAlign: 'center' }}>
            <TextField
              type="password"
              style={{ width: 250 }}
              id="outlined-dense"
              variant="outlined"
              label="PASSWORD"
              value={this.state.password}
              onChange={this.handleChange('password')}
            />
          </div>

          <div style={{ padding: 10, textAlign: 'center' }}>
            <button
              style={{
                width: 130,
                height: 36,
                marginTop: 5,
                marginRight: 15,
                backgroundColor: 'transparent',
                borderColor: '#2d2727',
                borderWidth: 2,
                justifyContent: 'center',
                borderRadius: 3
              }}
            >Login</button>
          </div>
        </form>
   </div >
    )
  }
}
export default Login;