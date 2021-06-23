
import React from 'react';
import { Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { Row, Col } from 'reactstrap';
import '../App.css';
import DataItem from './DataItem'

class DocsAndQueries extends React.Component {
    state = {
        customerFilter: '',
        show: false,
        customerFilterError: false,
        onlyD:false,
        onlyQ:false
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    renderDataCard() {
        if (this.props.Documents === undefined) {
            alert('Something Went Wrong, Please Refresh!');
            return
        }
        return (
            this.props.Documents.map(el => {
                if(this.state.onlyQ === true && el.Type !== 'QUERY'){
                    return null
                }
                if(this.state.onlyD === true){
                    if( el.Type === 'image/png'|| el.Type === 'image/jpeg'|| el.Type === 'application/pdf' || el.Type === 'text/plain'){
                        return (
                            <DataItem data={el} />
                        )
                    }
                    return  null   
                }
                return (
                    <DataItem data={el} />
                )
               
            }))
    }
    render() {
        return (
            <Col>
                <div style={styles.header}><text style={styles.heading}>Recent Queries and Docs</text></div>
                <div style={styles.header}>
                    <Row className='filterCol' >
                        <text style={styles.subHeading}>Filters: </text>
                        <TextField
                            style={{ marginLeft: 20, height: 60 }}
                            value={this.state.customerFilter}
                            error={this.state.customerFilterError}
                            label='Enter email/Mobile'
                            variant='standard'
                            onChange={this.handleChange('customerFilter')}
                        />
                        <Button
                            onClick={() => this.props.filterRide(this.state.customerFilter)}
                            style={styles.button}
                        >Sort</Button>
                        <FormControlLabel
                            style={{ marginTop: 8 }}
                            control={<Checkbox checked={this.state.onlyD} color="primary" value={this.state.onlyD} onChange={() => this.setState({onlyD:!this.state.onlyD, onlyQ:false})}  />}
                            label="Only Documents"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            style={{ marginTop: 8 }}
                            control={<Checkbox checked={this.state.onlyQ} color="primary" value={this.state.onlyQ} onChange={() => this.setState({onlyD:false, onlyQ:!this.state.onlyQ})} />}
                            label="Only Queries"
                            labelPlacement="start"
                        />
                    </Row>
                </div>
                <div style={{ height: '500px', overflowY: 'scroll', backgroundColor: '#fff', borderRadius: 10, padding: 15 }}>
                    {this.renderDataCard()}
                </div>
            </Col>
        )
    }

}

const styles = {
    header: {
        paddingBottom: 10,
        display: 'flex',
        justifyContent: 'center'
    },
    heading: {
        fontSize: 23,
        fontWeight: '600',
        color: '#000',
    },
    subHeading: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        marginLeft: 20,
        backgroundColor: '#ccc',
    }
}
export default DocsAndQueries;