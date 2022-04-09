import React,{useState} from 'react'
import { Form,Button } from "semantic-ui-react";
import { REGISTER } from '../query';
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate =useNavigate();
  const  [errors,setError]=useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [registerMutation,{loading}]=useMutation(REGISTER,{
    update(_,res){
      console.log(res);
      navigate("/");
    },
    onError(err){
      setError(err.graphQLErrors[0].extensions.errors)//error handling:https://www.apollographql.com/docs/react/data/error-handling/
    }
  })
  const onSubmit=(e)=>{
    e.preventDefault();
    registerMutation({
      variables:{
        registerInput:values
      }
    })

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
