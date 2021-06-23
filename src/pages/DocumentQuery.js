import React from 'react';
import '../App.css';
import { NavLink, Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { sendDocument, sendQuery, getAdminDocsAndQueries, filterUserDocsAndQueries } from '../requests'
import DocsAndQueries from './../components/DocsAndQueries';
import SendDocumentSection from '../components/SendDocumentSection';

const title = {
  pageTitle: 'Lawgician Dashboard',
};

const loading = {
  margin: '1em',
  fontSize: '24px',
  padding: 15
};

class DocumentQuery extends React.Component {
  state = {
    isLoading: false,
    error: false,
    Note: '',
    Query: '',
    Documents: []
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleDocumentSubmit = async (customer, Message, selectedFile) =>{
    if (customer === '') {
      alert('Customer Email/mobile is required')
      return
    }
    if (Message === '') {
      alert('Note/Message is required')
      return
    }

    if (selectedFile === '') {
      const response = await sendQuery(customer, Message)
       if(response === 'User not present'){
         alert(response)
         return
       }
       if(response.status !== 200){
         alert(response.data)
       return
        }
    } else {
      const response = await sendDocument(selectedFile, customer, Message)
      if(response === 'User not present'){
        alert(response)
        return
      }
      if(response.status !== 200){
        alert(response.data)
        return
      }
    }
    const data = await getAdminDocsAndQueries();
    if (data.status === 200) {
      this.setState({ Documents: data.data.docs }, () => {
        console.log('Documents', this.state.Documents);
      })
    } else {
      return
    }

  }

  handleFilterRide = async (customer) => {
    if (customer === '') {
      alert('Customer Email/mobile is required')
      return
    }
    const response = await filterUserDocsAndQueries(customer);
    if(response === 'User not present'){
      alert(response)
      return
    }
    if(response.status !== 200){
     alert(JSON.stringify(response.data))
      return
    }
    if (response.status === 200) {
      if(response.data.clientDocs !== []){
        this.setState({ Documents: response.data })
      }
    }
  }

  async componentDidMount() {
    const token = localStorage.getItem('Token');

    if (token != null) {
      this.setState({
        isLoading: false,
        error: false
      });
      const data = await getAdminDocsAndQueries();
      if (data.status === 200) {
        this.setState({ Documents: data.data.docs }, () => {
          console.log('Documents', this.state.Documents);
        })
      } else {
        this.setState({ Documents: undefined });
      }

    } else {
      this.setState({
        isLoading: false,
        error: true
      });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className='App'>
          <div style={loading}>
            <h4>Not Authorised. Please Login Again</h4>
          </div>
        </div>
      )
    } else {
      return (
        <div className='App'>
          <text style={{ margin: 3, padding: 3, fontWeight: '600', fontSize: 34 }}>{title.pageTitle}</text>
          <Row style={{ paddingRight: 30, paddingLeft: 30, paddingTop: 10, paddingBottom: 15 }}>
            <Col lg={6} >
              <NavLink className="navlink" to="/home" style={{ fontSize: 20 }} activeClassName="Active">
                Home
                </NavLink>
              <NavLink className="navlink" to="/documents" style={{ fontSize: 20 }} activeClassName="Active">
                Document/Query
                </NavLink>
              <NavLink className="navlink" to="/orders" style={{ fontSize: 20 }} activeClassName="Active">
                Orders
                </NavLink>
            </Col>
            <Col lg={6} style={{ textAlign: 'end' }}>
              <Link to="/" style={{ color: '#000', fontSize: 20 }} onClick={() => {
                localStorage.clear();
              }}
              >Log Out</Link>
            </Col>
          </Row>
          <div style={{ width: '100%', marginLeft: '5%' }}>
            <Row className="wrapper">
              <Col lg={3} className="leftDivision" style={{ borderRadius: 10 }}>
                <SendDocumentSection onSendDocument={(customer, Message, selectedFile) => { this.handleDocumentSubmit(customer, Message, selectedFile) }} />
              </Col>
              <Col lg={9} className="rightDivision">
                <DocsAndQueries Documents={this.state.Documents} filterRide={(customer) => this.handleFilterRide(customer)} />
              </Col>
            </Row>
          </div>
        </div>
      )
    }
  }
}
export default DocumentQuery;