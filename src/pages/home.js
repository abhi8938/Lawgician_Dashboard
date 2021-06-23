import React from 'react';
import '../App.css';
import { NavLink, Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { uploadArticle } from '../requests';

const title = {
  pageTitle: 'Lawgician Dashboard',
};
const loading = {
  margin: '1em',
  fontSize:'24px',
  padding:15
};
class Home extends React.Component {
  state={
    isLoading:false,
    error:false,
    article:'Write Article Here',
    title:'',
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSubmit = (e) =>{
    e.preventDefault();
    uploadArticle(this.state.title, this.state.article)
    .then(response =>{
      if(response.status === 200){
        
      alert(response.data);
      this.setState({
        isLoading:false,
        error:false,
        article:'Write Article Here',
        title:''
      })
    }else{
       alert(response.data);
    }
   })
   .catch(error =>{
      console.log(`ERROR:${error}`);
   })
  }
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
          <div className='App' >
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
            <div style={{ padding:10}}>
              <text style={{fontSize:30, fontWeight:'bold'}}>Article Section</text>
            </div>
            <form onSubmit={this.handleSubmit}>
            <div style={{padding:10}}>
            <TextField
        style={{ width:300}}
       id="outlined-dense"
       variant="outlined"
       label="Article Title"
       value={this.state.title}
       onChange={this.handleChange('title')}
     />
             </div>
             <div style={{padding:10}}>
             <text style={{fontSize:24, fontWeight:'600'}}>Decription:</text>
             </div>
            <div style={{padding:10}}>
             <text style={{fontSize:24, fontWeight:'600'}}>Article:</text>
             </div>
             <div style={{padding:10}}>
            <textarea style={{ width:600, height:300, padding:5}} value={this.state.article} onChange={this.handleChange('article')} />
            </div>
           <button
              style={{ 
          width: 130,
          height: 36,
          marginTop:10,
          marginLeft:10,
          backgroundColor: 'transparent',
          borderColor: '#2d2727',
          borderWidth: 2,
          justifyContent: 'center',
          borderRadius: 3}}
         >Submit</button>
          </form>
          </div>
    )
  }
  }
}
export default Home;