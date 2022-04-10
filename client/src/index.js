import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient,ApolloProvider,InMemoryCache,ApolloLink, HttpLink ,from} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink=onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        // Apollo Server sets code to UNAUTHENTICATED
        // when an AuthenticationError is thrown in a resolver
        case 'UNAUTHENTICATED':

          window.location.href = "/login";
          // Retry the request, returning the new observable
          return forward(operation);
      }
    }
  }

  // To retry on network errors, we recommend the RetryLink
  // instead of the onError link. This just logs the error.
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

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
   errorLink,
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

