import React,{useContext, useState} from 'react'
import { Form,Button } from "semantic-ui-react";
import { REGISTER } from '../query';
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useForm } from "../utils/hook";
import { AuthContext } from "../context/auth";
export default function Register() {
  const context=useContext(AuthContext)
  const navigate =useNavigate();
  const  [errors,setError]=useState({});

   const {onChange,onSubmit,values}=useForm(registerUser,{
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
   })

  const [registerMutation,{loading}]=useMutation(REGISTER,{
    update(_,res){
      console.log(res);
      context.login(res.data.register)
      navigate("/");
    },
    onError(err){
      setError(err.graphQLErrors[0].extensions.errors)//error handling:https://www.apollographql.com/docs/react/data/error-handling/
    },
    variables:{
      registerInput:values
    }
  })
 function registerUser(){
    registerMutation()
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          error={errors.email ? true : false}
          value={values.email}
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

        <Form.Input
          label="Confirm Password"
          placeholder="Password..."
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword ? true : false}
          value={values.confirmPassword}
          onChange={onChange}
        ></Form.Input>

        <Button type="submit" primary>
          Register
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
