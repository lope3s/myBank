import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: "Red Hat Display";

    img {
        width: 250px;
        margin-bottom: 1rem;

        @media screen and (min-width: 375px) and (max-width: 539px){
            width: 200px;
        }

        @media screen and (min-width: 280px) and (max-width: 374px){
            width: 150px
        }
    }
`

export const Text = styled.h1`
    color: #EBD09C;

    @media screen and (min-width: 540px) and (max-width: 767px){
        font-size: 1.2rem;
    }

    @media screen and (min-width: 375px) and (max-width: 539px){
        font-size: 1rem;
    }

    @media screen and (min-width: 280px) and (max-width: 374px){
        font-size: 0.7rem;
    }
`

export const Button = styled.button`
    width: 100px;
    height: 40px;
    background-color: #8A9DFF;
    border: none;
    border-radius: 10px;
    box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.43);

    :hover {
        cursor: pointer;
    }
`