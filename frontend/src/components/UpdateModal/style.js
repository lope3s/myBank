import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    min-height: 640px;
    background-color: #ffffff80;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Modal = styled.div`
    position: relative;
    width: 40vw;
    height: 50vh;
    min-height: 350px;
    background-color: #E9ECEF;
    border-radius: 10px;
    border: 2px solid #000;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    color: #252525;

    h1{
        font-family: "Red Hat Display";
    }

    @media screen and (min-width: 768px) and (max-width: 1023px){
        width: 60vw;
        height: 30vh;
    }

    @media screen and (min-width: 540px) and (max-width: 767px){
        width: 80vw;
    }

    @media screen and (min-width: 280px) and (max-width: 539px){
        width: 95vw;

        @media screen and (min-width: 280px) and (max-width: 410px){
            h1{
                font-size: 1.2rem;
            }
        }
    }
`

export const Form = styled.form`
    width: 100%;
    display:flex;
    flex-direction: column;
    height: fit-content;
    justify-content: center;
    align-items: center;
`

export const Input = styled.input`
    border: none;
    border-radius: 10px;
    width: 60%;
    height: 50px;
    margin-bottom: 10px;
    text-indent: 20px;

    ::-webkit-input-placeholder {
        color: #252525;
        opacity: 1;
        font-weight: 500;  
        font-family: "Red Hat Display";
    }

    ::-moz-placeholder {
        color: #252525;
        opacity: 1;
        font-weight: 500;  
        font-family: "Red Hat Display";
    }

    @media screen and (min-width: 280px) and (max-width: 359px){
        width: 75%;
    }
`

export const Select = styled.select`
    border: none;
    border-radius: 10px;
    width: 60%;
    height: 50px;
    margin-bottom: 10px;
    text-indent: 10px;


    :hover {
        cursor: pointer;
    }

    @media screen and (min-width: 280px) and (max-width: 359px){
        width: 75%;
    }
`

export const Button = styled.button`
    width: 40%;
    height: 50px;
    border: none;
    border-radius: 10px;
    margin-top: 10px;
    background-color: #62D696;
    color: #E9ECEF;
    font-family: "Red Hat Display";
    font-size: 1.5rem;

    :hover{
        cursor: pointer;
    }

    @media screen and (min-width: 280px) and (max-width: 359px){
        width: 50%;
    }

`

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 30px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border:none;
    background-color: #E34B5F;

    svg {
        width: 100%;
        height: 100%;
        color: #fff;
    }

    :hover {
        cursor: pointer;
    }

`

export const ErrorMessageStyled = styled.p`
    color: #E34B5F;
    margin: 0 auto 10px 20%;
`