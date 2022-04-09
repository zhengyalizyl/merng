import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient,ApolloProvider,InMemoryCache,ApolloLink, HttpLink ,from} from "@apollo/client";
import jwtDecode from 'jwt-decode';

const authLink=new ApolloLink((operation,forward)=>{
  const token = localStorage.getItem("jwtToken");
  operation.setContext((context)=>{
   return {
    headers: {
      authorization: token ? `Bearer ${token}` : ""
    }   
  }
  });
  return forward(operation)
})
const httpLink=new HttpLink({
  uri:'http://localhost:5001',
})

const additiveLink=from([
   authLink,
   httpLink
])

const client=new ApolloClient({
  link:additiveLink,
  cache:new InMemoryCache(),
  credentials:"include"
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

