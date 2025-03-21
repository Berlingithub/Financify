import React from 'react'
import { Container, FormWrap, Icon, FormContent, Form, FormInput, FormH1, FormLabel, FormButton, Text } from './SignupElements'
import { signUp } from '../API';
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";

import img1 from "images/favicon.png";

const Signup = () => {

  const [email,setEmail]=React.useState();
  const [password,setPassword]=React.useState();
  const [name,setName]=React.useState();
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const formSubmitHandler= async (e)=>{
    e.preventDefault();
    setLoading(true)
    // await signUp({email,password,name}).then(res=>{
    //   setLoading(false);
    //   navigate("/admin/dashboard");
    // }).catch(e=>{
    //   console.log(e.message)
    //   setLoading(false);
    // })
    try {
      await signUp({ email, password, name });
      navigate("/admin/dashboard"); // Navigate after successful signup
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      {loading && (
        <div>
          <Spinner animation="border" role="status" className="">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {!loading && <Container>
        <FormWrap>
          <Icon to='/'><img src={img1} height="30px" width="30px"></img>Financify</Icon>
          <FormContent>
            <Form onSubmit={formSubmitHandler}>
              <FormH1>Sign up for your account</FormH1>
              <FormLabel htmlFor='name'>Your Name</FormLabel>
                <FormInput id='name' required onChange={(e)=>setName(e.target.value)} />
              <FormLabel htmlFor='email'>Email</FormLabel>
                <FormInput id='email' type='email' required onChange={(e)=>setEmail(e.target.value)} />
              <FormLabel htmlFor='password'>Password</FormLabel>
                <FormInput id='password' type="password" required onChange={(e)=>setPassword(e.target.value)} />
              {/* <FormButton type='submit' >Continue</FormButton>
              <Text><a href="/signin">Already have an account?</a></Text> */}
                <div className="d-flex flex-column gap-2">
                <FormButton type='submit'>Continue</FormButton>
                <Text className="mt-2 text-center"> {/* Reduced margin-top */}
                  <a href="/signin">Already have an account?</a>
                </Text>
              </div>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>}
    </>
  )
}

export default Signup
