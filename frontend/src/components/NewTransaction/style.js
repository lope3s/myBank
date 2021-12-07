import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.onExpandedCard ? "#E9ECEF90" : "rgba(0, 0, 0, 0.1)"};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: ${props => props.onExpandedCard ? 100000 : "initial"};
`

export const Card = styled.div`
    position: relative;
    background-color: #E9ECEF;
    width: 40vw;
    height: 50vh;
    border-radius: 20px;
    box-shadow: 10px 10px 10px 5px rgba(0, 0, 0, 0.43);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Red Hat Display";
    color: #000;

    @media screen and (min-width: 280px) and (max-width: 539px){
        width: 90vw;
    }

    @media screen and (min-width: 540px) and (max-width: 1024px){
        width: 60vw;
    }
`

export const Button = styled.button`
    position: absolute;
    top: 20px;
    right: 30px;
    width: 25px;
    height: 25px;
    background-color: #F44A4A;
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    
    svg {
        font-size: 15px;
        color: #E9ECEF;
    }

    :hover {
        cursor: pointer;
    }

    @media screen and (min-width: 280px) and (max-width: 539px){
        top: 7px;
        right: 17px;
    }
`

export const CardForm = styled.form`
    display: flex;
    flex-direction: column;
    height: 70%;
    width: 100%;
    justify-content: center;
    align-items: center;

`

export const FieldsBox = styled.div`
    width: 50%;
    height: 75px;
    display: flex;
    margin-bottom: 10px;
    position: relative;

    svg{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 5px;
        font-size: 2rem;
        color: #fff;
        z-index: 1;
        pointer-events: none;
    }

    @media screen and (min-width: 280px) and (max-width: 1024px){
        width: 80%;
    }

    @media screen and (min-width: 280px) and (max-width: 767px){
        height:45px;
    }
`

export const Input = styled.input`
    height: 100%;
    border-radius: 10px;
    border: none;
    width: 100%;
    background-color: #14233C;
    color: #fff;
    text-indent: 40px;
`

export const Select = styled.select`
    height: 100%;
    border-radius: 10px;
    border: none;
    width: 100%;
    background-color: #14233C;
    color: #fff;
    text-indent: 20px;
    
    :hover {
        cursor: pointer;
    }
    
    @media screen and (min-width: 280px) and (max-width: 768px){
        text-indent: 40px;
    }
`

export const SubmitButotn = styled.button`
    height: 75px;
    border-radius: 10px;
    border: none;
    background-color: #00D495;
    color: #E9ECEF;
    width: 50%;
    font-size: 1rem;

    :hover {
        cursor: pointer;
    }

    @media screen and (min-width: 280px) and (max-width: 539px){
        width: 60%;
        height: 60px;
        font-size: 0.9rem;
    }
`

export const ErrorMessageStyled = styled.p`
    display: block;
    margin: 0;
    align-self: flex-start;
    margin-left: 25%;
    margin-bottom: 10px;
    color: #F44A4A;
    
    @media screen and (min-width: 280px) and (max-width: 767px){
        font-size: 10px;
        margin-left: 15%;
    }
`