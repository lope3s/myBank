import {
  MainContainer,
  LoginContainer,
  LoginForm,
  LoginInputs,
  LoginText,
  LoginButton,
  LogarText,
  InputContainer,
  RegisterText,
  ErrorMessage,
  RegisterForm,
  ActivationContainer,
  ActivationMessage,
  ActivationSubText,
  ActivationButton,
} from "./style";

import axios from "axios";

import { useState, useRef } from "react";

import { set, useForm } from "react-hook-form";

import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";

import Logo from "../../images/LogoMyBank.png";

import { useHistory, useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

const LoginPage = () => {
  const history = useHistory();
  const { name } = useStoreState((store) => store);
  const [formState, setFormState] = useState("login");
  const toggle = useStoreActions((actions) => actions.toggle);
  const { activationcode } = useParams();
  console.log(activationcode);

  if (activationcode !== undefined) {
    console.log(activationcode);
    axios
      .get(`http://localhost:5001/apiMyBank/accountActivate/${activationcode}`)
      .then((res) => {
        history.push("/mainpage");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const loginContainer = useRef();

  const {
    register,
    handleSubmit,
    watch,
    unregister,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(name);

    if (Object.keys(data).length > 2) {
      axios
        .post("http://localhost:5001/apiMyBank/accountRegister", {
          name: data.Registernome,
          email: data.Registeremail,
          password: data.Registerpassword,
        })
        .then((res) => {
          console.log(res);
          unregister("Registerpassword");
          unregister("RegisterconfirmPassword");
          unregister("Registeremail");
          unregister("Registernome");
          unregister("email");
          unregister("password");
          setTimeout(() => {
            setFormState("login");
            unregister("Registerpassword");
            unregister("RegisterconfirmPassword");
            unregister("Registeremail");
            unregister("Registernome");
            unregister("email");
            unregister("password");
          }, 200);

          loginContainer.current?.animate(
            [
              {
                transform: "rotateY(0)",
              },
              { transform: "rotateY(360deg)" },
            ],
            { duration: 1000 }
          );
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.data.message === "") {
          }
        });
    } else {
      axios
        .post("http://localhost:5001/apiMyBank/login", {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          toggle(true);
          history.push("/mainpage");
        })
        .catch((err) => {
          console.log(err.response.data.message);
          if (err.response.data.message === "Ative sua conta!") {
            unregister("Registerpassword");
            unregister("RegisterconfirmPassword");
            unregister("Registeremail");
            unregister("Registernome");
            unregister("email");
            unregister("password");
            setTimeout(() => {
              setFormState("ActiveAcount");
              unregister("Registerpassword");
              unregister("RegisterconfirmPassword");
              unregister("Registeremail");
              unregister("Registernome");
              unregister("email");
              unregister("password");
            }, 200);

            loginContainer.current?.animate(
              [
                {
                  transform: "rotateY(0)",
                },
                { transform: "rotateY(360deg)" },
              ],
              { duration: 1000 }
            );
          }
        });
    }
    // axios.post("http://localhost:5001/apiMyBank/login", data);
  };

  return (
    <>
      <MainContainer>
        <LoginContainer ref={loginContainer}>
          <img alt="logo" src={Logo}></img>
          {formState === "login" && !activationcode && (
            <LoginText>Preencha Para Logar</LoginText>
          )}
          {activationcode && <LoginText>Conta Ativada</LoginText>}
          {formState === "login" && (
            <LoginForm autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
              <InputContainer>
                <BsFillPersonFill></BsFillPersonFill>
                <LoginInputs
                  autocomplete="off"
                  {...register("email", {
                    required: "O campo email nao pode estar vazio",
                  })}
                  type="email"
                  placeholder="email"
                ></LoginInputs>
              </InputContainer>
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
              <InputContainer>
                <RiLockPasswordFill />
                <LoginInputs
                  autocomplete="off"
                  {...register("password", {
                    required: "O campo password nao pode estar vazio",
                  })}
                  type="password"
                  placeholder="password"
                ></LoginInputs>
              </InputContainer>
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
              <LoginButton type="submit">
                <LogarText>Login</LogarText>
              </LoginButton>
            </LoginForm>
          )}
          {formState === "register" && (
            <RegisterForm autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
              <InputContainer>
                <BsFillPersonFill></BsFillPersonFill>
                <LoginInputs
                  autocomplete="off"
                  {...register("Registernome", {
                    required: "O campo email nao pode estar vazio",
                  })}
                  type="name"
                  placeholder="nome"
                ></LoginInputs>
              </InputContainer>
              <InputContainer>
                <BsFillPersonFill></BsFillPersonFill>
                <LoginInputs
                  autocomplete="off"
                  {...register("Registeremail", {
                    required: "O campo email nao pode estar vazio",
                  })}
                  type="email"
                  placeholder="email"
                ></LoginInputs>
              </InputContainer>

              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
              <InputContainer>
                <RiLockPasswordFill />
                <LoginInputs
                  autocomplete="off"
                  {...register("Registerpassword", {
                    required: "O campo password nao pode estar vazio",
                  })}
                  type="password"
                  placeholder="password"
                ></LoginInputs>
              </InputContainer>
              <InputContainer>
                <RiLockPasswordFill />
                <LoginInputs
                  autocomplete="off"
                  {...register("RegisterconfirmPassword", {
                    required: "O campo password nao pode estar vazio",
                  })}
                  type="password"
                  placeholder="confirm password"
                ></LoginInputs>
              </InputContainer>
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
              <LoginButton type="submit">
                <LogarText>Cadastrar</LogarText>
              </LoginButton>
            </RegisterForm>
          )}
          {formState === "ActiveAcount" && (
            <ActivationContainer>
              <ActivationMessage>
                Enviamos um email de ativacao de conta
              </ActivationMessage>
              <ActivationSubText>Verifique seu email</ActivationSubText>
              <ActivationButton
                onClick={() => {
                  setTimeout(() => {
                    setFormState("login");
                  }, 200);

                  loginContainer.current?.animate(
                    [
                      {
                        transform: "rotateY(0)",
                      },
                      { transform: "rotateY(360deg)" },
                    ],
                    { duration: 1000 }
                  );
                }}
              >
                <LogarText>Voltar ao Login</LogarText>
              </ActivationButton>
            </ActivationContainer>
          )}
          {formState === "login" && (
            <RegisterText
              onClick={() => {
                unregister("Registerpassword");
                unregister("RegisterconfirmPassword");
                unregister("Registeremail");
                unregister("Registernome");
                unregister("email");
                unregister("password");
                setTimeout(() => {
                  setFormState("register");
                  unregister("Registerpassword");
                  unregister("RegisterconfirmPassword");
                  unregister("Registeremail");
                  unregister("Registernome");
                  unregister("email");
                  unregister("password");
                }, 200);

                loginContainer.current?.animate(
                  [
                    {
                      transform: "rotateY(0)",
                    },
                    { transform: "rotateY(360deg)" },
                  ],
                  { duration: 1000 }
                );
              }}
            >
              Nao possui conta? Register*
            </RegisterText>
          )}
          {formState === "register" && (
            <RegisterText
              onClick={() => {
                unregister("Registerpassword");
                unregister("RegisterconfirmPassword");
                unregister("Registeremail");
                unregister("Registernome");
                unregister("email");
                unregister("password");
                setTimeout(() => {
                  setFormState("login");
                  unregister("Registerpassword");
                  unregister("RegisterconfirmPassword");
                  unregister("Registeremail");
                  unregister("Registernome");
                  unregister("email");
                  unregister("password");
                }, 200);

                loginContainer.current?.animate(
                  [
                    {
                      transform: "rotateY(0)",
                    },
                    { transform: "rotateY(360deg)" },
                  ],
                  { duration: 1000 }
                );
              }}
            >
              Ja possui conta? Login*
            </RegisterText>
          )}
        </LoginContainer>
      </MainContainer>
    </>
  );
};

export default LoginPage;
