import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;

  background-color: #495057;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginContainer = styled.div`
  width: 30rem;
  height: 60%;
  background-color: #e9ecef;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 0px #00000091;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 60%;
    height: fit-content;
  }
`;

export const LoginText = styled.h1`
  font-family: "Red Hat Display", sans-serif;
  font-weight: normal;
  font-size: 25px;
  margin: 1rem 0;
`;

export const LoginForm = styled.form`
  width: 100%;
  height: 13rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const InputContainer = styled.div`
  width: calc(80% - 10px);
  display: flex;
  align-items: center;
  background-color: #14233c;
  border-radius: 10px;

  svg {
    width: 20%;
    font-size: 2.5rem;
    color: #f7f7f7;
  }
`;

export const LoginInputs = styled.input`
  all: unset;
  color: #f7f7f7;
  padding: 0 0 0 10px;

  width: calc(80% - 10px);
  height: 3rem;
  background-color: #14233c;
  border-radius: 10px;
  font-family: "Red Hat Display";
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  text-align: start;

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
  }
`;

export const LoginButton = styled(Button)`
  all: unset;
  width: 80%;
  height: 3rem;
  background-color: #00d595 !important;
  border-radius: 10px;
  border: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogarText = styled.p`
  font-family: "Red Hat Display";
  font-style: normal;
  font-weight: normal;
  font-size: 20px;

  color: white;
`;

export const RegisterText = styled.p`
  font-family: "Red Hat Display";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #8a9dff;
`;

export const ErrorMessage = styled.p`
  font-family: "Red Hat Display";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #f02626;
`;

export const RegisterForm = styled.form`
  width: 100%;
  height: 19rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
