import axios from 'axios';


export const FetchDocuments= async (
    matchId
) => {
    const token = localStorage.getItem('Token');
    var config = {
        headers: {'Content-Type': 'application/json',
                   'x-auth-token': token,
                   'matchid':matchId },
        data:{}
    };
   return axios.get('http://localhost:3002/api/documents',config)
    .then( response =>{
    return response;
    })
    .catch( error => {
       return error.response;
    })
}

export const PostDocument= async (
) => {
    const token = localStorage.getItem('Token');
    var config = {
        headers: {'Content-Type': 'application/json',
                   'x-auth-token': token},
        data:{}
    };
   return axios.post('http://localhost:3002/api/documents',config)
    .then( response =>{
    return response;
    })
    .catch( error => {
       return error.response;
    })
}