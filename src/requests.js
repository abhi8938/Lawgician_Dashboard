import axios from 'axios';
import { BASE_URL } from './constants/endpoinst';


export const getCustomerData = async (emailaurmobile) => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'emailaurmobile': emailaurmobile
    }
  };
  return axios.get(BASE_URL + '/users/userdata', config)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(`error`,error.response)
      return error.response;
    })
}

export const filterUserDocsAndQueries = async (customer) => {
  const userData = await getCustomerData(customer);
  if(userData.status === 400) return 'user not present'
  const customerid = userData.data.customerId
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'customerid': customerid
    }
  };
  return axios.get(BASE_URL + '/documents/filter', config)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    })
}

export const getAdminDocsAndQueries = async () => {
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'id': 'Admin'
    }
  };
  return axios.get(BASE_URL + '/documents', config)
    .then(response => {
      // console.log(`data`,response.data);
      return response;
    })
    .catch(error => {
      // console.log(`error`,error.response);
      return error.response;
    })
}

export const sendQuery = async (
  customer,
  Note
) => {
  const userToken = await localStorage.getItem('Token');
  const userData = await getCustomerData(customer);
  if(userData.status === 400) return "User not present"
  const customerid = userData.data.customerId
  const email = userData.data.emailAddress
  const mobile = userData.data.mobileNumber
  const name = userData.data.fullName
  console.log(`name`,JSON.stringify(userData.data));
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8;',
      'sentto': 'Admin',
      'x-auth-token': userToken,
      'from': customerid,
      'note': Note,
      'type': 'QUERY',
      'customername':name,
      'customeremail':email,
      'customermobile':mobile
    }
  };
  console.log('Query',customerid,userData,email)
  return axios.post(BASE_URL+'/documents/addDocument', {}, config)
    .then(response => {
      return response
    })
    .catch(error => {
      console.log(`error`,error.response);
      return error.response
    });
}

export const sendDocument = async (
  file,
  customer,
  Note
) => {
  const userToken = localStorage.getItem('Token');
  const userData = await getCustomerData(customer);
  if(userData.status === 400) return "User not present"
  const customerid = userData.data.customerId
  const email = userData.data.emailAddress
  const mobile = userData.data.mobileNumber
  const name = userData.data.fullName
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8;',
      'sentto': 'Admin',
      'x-auth-token': userToken,
      'from': customerid,
      'note': Note,
      'customername':name,
      'customeremail':email,
      'customermobile':mobile
    }
  };
  const data = new FormData();
  data.append('file', file);

  console.log('document',customerid,data,userData,email)

  return axios.post(BASE_URL + '/documents/addDocument', data, config)
    .then(response => {
      // Call a function here if the request is successful
      console.log(`data`, response.data);
      return response
    })
    .catch(error => {
      console.log(`err`, error.response.data);
      return error.response
      // Call a function here if the request fails
    });

}

export const createUserToken = async (
  emailAddress,
  password
) => {
  return axios.post(BASE_URL + '/auth', {
    emailAddress: emailAddress,
    password: password
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    })
}

export const uploadArticle = async (
  title,
  article,

) => {
  return axios.post(BASE_URL + '/articles', {
    title: title,
    article: article,
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    })
}



