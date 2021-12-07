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

import { useForm } from "react-hook-form";

import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";

import Logo from "../../images/LogoMyBank.png";

import { useParams, Redirect } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import checkEnvironment from "../../keys";
import ModalServerResponse from '../../components/modalServerResponse';

const LoginPage = () => {
  const { isLogged, isChanging } = useStoreState((store) => store);
  const [formState, setFormState] = useState("login");
  const toggle = useStoreActions((actions) => actions.toggle);
  const status = useStoreActions((actions) => actions.toggleStatus)
  const { activationcode } = useParams();
  const [ activeServerModal, setActiveServerModal ] = useState({activate: false, message: '', status: false});
  const [ accounteActivated, setAccountActivated ] = useState(false);
  console.log('teste: ', isLogged)

  if (activationcode !== undefined && !accounteActivated) {
    axios
      .get(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/accountActivate/${activationcode}`)
      .then((res) => {
        setAccountActivated(true)
        setActiveServerModal({activate: true, message: res.data.message, status: true})

        setTimeout(() => {
            setActiveServerModal({activate: false, message: '', status: false})
        }, 4500)
      })
      .catch((err) => {
        console.log(err);
        setActiveServerModal({activate: true, message: err.response.data.message, status: false})

        setTimeout(() => {
            setActiveServerModal({activate: false, message: '', status: false})
        }, 4500)
      });
  }

  const loginContainer = useRef();

  const {
    register,
    handleSubmit,
    watch,
    unregister,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    console.log(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}`)

    if (Object.keys(data).length > 2) {
      axios
        .post(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/accountRegister`, {
          name: data.Registernome,
          email: data.Registeremail,
          password: data.Registerpassword,
        })
        .then((res) => {
          unregister("Registerpassword");
          unregister("RegisterconfirmPassword");
          unregister("Registeremail");
          unregister("Registernome");
          unregister("email");
          unregister("password");

          setActiveServerModal({activate: true, message: res.data.message, status: true})

          setTimeout(() => {
              setActiveServerModal({activate: false, message: '', status: false})
          }, 4500)

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
          setActiveServerModal({activate: true, message: err.response.data.message, status: false})

          setTimeout(() => {
              setActiveServerModal({activate: false, message: '', status: false})
          }, 4500)
        });
    } else {
      axios
        .post(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/login`, {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          const { userId, token } = res.data
          localStorage.setItem("@myBank:user", JSON.stringify({userId: userId, token: token}))
          localStorage.setItem("@myBank:status", JSON.stringify(true))
          toggle(true);
          status(false)
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
          if (err.response.data.message === "Dados inválidos"){
            setActiveServerModal({activate: true, message: err.response.data.message, status: false})

            setTimeout(() => {
                setActiveServerModal({activate: false, message: '', status: false})
            }, 4500)
          }
        });
    }
  };

  if (isLogged && !isChanging){
    return <Redirect to = "/mainpage"/>
  }

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
                    required: "O campo nome nao pode estar vazio",
                    pattern: {
                      value: /[a-z]* [a-z]*/,
                      message: "O nome precisa ser completo"
                    }
                  })}
                  type="name"
                  placeholder="nome"
                ></LoginInputs>
              </InputContainer>
              {errors.Registernome && (
                <ErrorMessage>{errors.Registernome.message}</ErrorMessage>
              )}
              <InputContainer>
                <BsFillPersonFill></BsFillPersonFill>
                <LoginInputs
                  autocomplete="off"
                  {...register("Registeremail", {
                    required: "O campo email nao pode estar vazio",
                    pattern: {
                      value: /^[\w._$&]+@\w+\.[a-z]+[a-z.]*/,
                      message: 'O formato do e-mail não é válido'
                    }
                  })}
                  type="email"
                  placeholder="email"
                ></LoginInputs>
              </InputContainer>

              {errors.Registeremail && (
                <ErrorMessage>{errors.Registeremail.message}</ErrorMessage>
              )}
              <InputContainer>
                <RiLockPasswordFill />
                <LoginInputs
                  autocomplete="off"
                  {...register("Registerpassword", {
                    required: "O campo password nao pode estar vazio",
                    minLength: {
                      value: 4,
                      message: "O campo precisa ter ao menos 4 caracteres"
                    }
                  })}
                  type="password"
                  placeholder="password"
                ></LoginInputs>
              </InputContainer>
              {errors.Registerpassword && (
                <ErrorMessage>{errors.Registerpassword.message}</ErrorMessage>
              )}
              <InputContainer>
                <RiLockPasswordFill />
                <LoginInputs
                  autocomplete="off"
                  {...register("RegisterconfirmPassword", {
                    required: "Confirme a sua senha",
                    validate: value  =>   value === getValues('Registerpassword') || "As senhas não são iguais"
                  })}
                  type="password"
                  placeholder="confirm password"
                ></LoginInputs>
              </InputContainer>
              {errors.RegisterconfirmPassword && (
                <ErrorMessage>{errors.RegisterconfirmPassword.message}</ErrorMessage>
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
        <ModalServerResponse activate = {activeServerModal.activate} message = {activeServerModal.message} status = {activeServerModal.status}/>
      </MainContainer>
    </>
  );
};

export default LoginPage;
