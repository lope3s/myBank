import styled from "styled-components";

export const CardContainer = styled.div`
  width: calc(100vw - 3rem);
  height: calc(100vh - 90px);
  min-height: 550px;
  margin: 1rem;

  @media screen and (min-width: 280px) and (max-width: 539px){
    width: calc(100vw - 1rem);
    margin: 1rem auto;
  }
`;

export const LeftSideContainer = styled.div`
  width: ${(props) => props.width}!important;
  height: 100%;
  background-color: #8a9dff;
  display: inline-block;
  border-radius: 20px;
  min-width: 5rem;
  position: relative;
`;

export const RightSideContainer = styled.div`
  position: relative;
  top: 50%;
  transform:translateY(-50%);
  margin: 0 1rem;
  width: calc(100vw - 5rem);
  height: 95%;
  background-color: #e9ecef;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 2rem;
  overflow-y: scroll;
  padding-top: 1rem;

  @media screen and (min-width: 280px) and (max-width: 539px){
    width: calc(100vw - 3rem);
  }
`;

export const TextContainer = styled.div`
  color: #000;
  font-family: "Red Hat Display";
  padding-left: 1.5rem;
  width: 50%;
  display: flex;
  flex-wrap: wrap;

  p{
    margin-top: 0;
    font-size: 1rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1279px){
    width: 35%;
  }

  @media screen and (min-width: 280px) and (max-width: 767px){
    width: 100%;
    padding: 0;
  }
`

export const TransactionBox = styled.div`
  width: 30%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 15%;
  margin-right: 5%;

  @media screen and (min-width: 1280px) and (max-width: 1480px){
    font-size: 0.7rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1279px){
    font-size: 0.65rem;
    width: 45%;
  }

  @media screen and (min-width: 280px) and (max-width: 767px){
    width: 90%;
    margin: 0;
  }

  @media screen and (min-width: 280px) and (max-width: 539px){
    font-size: 0.65rem;
  }
`

export const TransactionsContainer = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid #14233C;
  overflow-y: scroll;
  border-radius: 10px;
  padding-top: 10px;
  margin-top: 10%;
`

export const Button = styled.div`
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: #00D495;
  color: #E9ECEF;
  width: 30%;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Red Hat Display";
  font-size: 1.2rem;

  :hover {
      cursor: pointer;
  }

  @media screen and (min-width: 1280px) and (max-width: 1640px){
    font-size: 0.85rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1279px){
    width: 47.5%;
  }

  @media screen and (min-width: 375px) and (max-width: 767px){
    width: 55%;
  }

  @media screen and (min-width: 280px) and (max-width: 374px){
    width: 70%;
  }
`

export const CloseButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
`

export const CloseButton = styled.button`
    display: inline-block;
    width: 25px;
    height: 25px;
    margin: 0 5px;
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
`

export const ExcludeButton = styled.button`
    display: inline-block;
    width: 25px;
    height: 25px;
    margin: 0 5px;
    background-color: #E7CE9C;
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
`

export const UpdateButton = styled.button`
    display: inline-block;
    width: 25px;
    height: 25px;
    margin: 0 5px;
    background-color: #2A7889;
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
`