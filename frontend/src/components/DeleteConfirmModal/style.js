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
    width: 40vw;
    height: 40vh;
    background-color: #E9ECEF;
    border-radius: 10px;
    border: 2px solid #000;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    color: #252525;

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

export const ButtonBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
`

export const Button = styled.button`
    width: 180px;
    height: 60px;
    background-color: #fff;
    border: 2px solid #000;
    border-radius: 10px;

    :hover{
        cursor: pointer;
    }

    @media screen and (min-width: 280px) and (max-width: 539px){
        width: 110px;
    }
`
