import React from 'react';
import '../App.css';
import { NavLink, Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import {} from '../requests';

const title = {
  pageTitle: 'Lawgician Dashboard',
};
const loading = {
  margin: '1em',
  fontSize:'24px',
  padding:15
};
class Orders extends React.Component {
  state={
    isLoading:false,
    error:false,
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };  
  componentDidMount(){
    const token = localStorage.getItem('Token');

    if(token != null){
      this.setState({
        isLoading:false,
        error:false
      });
    }else{
      this.setState({
        isLoading:false,
        error:true
    });
  }
  }
  render() {
    if(this.state.error){
      return(
        <div className='App'>
          <div style={loading}>
           <h4>Not Authorised. Please Login Again</h4>
          </div>
        </div>
      )
    }else{
    return (
          <div className='App'>
            <text style={{ margin:3,padding:3, fontWeight:'600', fontSize:34}}>{title.pageTitle}</text>
            <Row style={{paddingRight:30,paddingLeft:30,paddingTop:10,paddingBottom:15}}>
               <Col lg={6} >
                <NavLink className="navlink" to="/home" style={{  fontSize:20}} activeClassName="Active">
                 Home
                </NavLink>
                <NavLink className="navlink" to="/documents" style={{  fontSize:20}} activeClassName="Active">
                 Document/Query
                </NavLink>
                <NavLink className="navlink" to="/orders" style={{  fontSize:20}} activeClassName="Active">
                 Orders
                </NavLink>
               </Col>
               <Col lg={6} style={{ textAlign:'end'}}>
                 <Link to="/" style={{ color:'#000', fontSize:20}} onClick={() =>
                  {
                   localStorage.clear();
                  }}
                 >Log Out</Link>
              </Col>
            </Row>
           </div>
    )
  }
  }
}
export default Orders;