import React,{useState,useContext} from 'react'
import { Form,Button } from "semantic-ui-react";
import { LOGIN } from '../query';
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useForm } from "../utils/hook";
import { AuthContext } from "../context/auth";

export default function Login() {
  const context=useContext(AuthContext)
  const navigate =useNavigate();
  const  [errors,setError]=useState({});

   const {onChange,onSubmit,values}=useForm(loginUser,{
    username: "",
    password: "",
   });

  const [loginMutation,{loading}]=useMutation(LOGIN,{
    update(_,res){
      context.login(res.data.login);
      console.log(res);
      navigate("/");
    },
    onError(err){
      setError(err.graphQLErrors[0].extensions.errors)//error handling:https://www.apollographql.com/docs/react/data/error-handling/
    },
    variables:{
      loginInput:values
    }
  });
 function loginUser(){
    loginMutation()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          error={errors.username ? true : false}
          value={values.username}
          onChange={onChange}
        ></Form.Input>

        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        ></Form.Input>
        <Button type="submit" primary>
          Login
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value} </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
