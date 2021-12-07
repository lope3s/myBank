import styled from "styled-components";

export const CardContainer = styled.div`
  width: 38rem;
  height: 25rem;
  margin: 1rem 0 1rem 1rem;

  @media screen and (min-width: 540px) and (max-width: 767px){
    width: 27rem;
    margin-left: 0;
  }

  @media screen and (min-width: 360px) and (max-width: 539px){
    width: 20rem;
    margin-left: 0;

  }

  @media screen and (min-width: 280px) and (max-width: 359px){
    width: 16rem;
    margin-left: 0;
  }

  @media screen and (min-width: 280px) and (max-width: 539px){
    margin-bottom: 3rem;
  }
`;

export const LeftSideContainer = styled.div`
  width: ${(props) => props.width}!important;
  height: 25rem;
  background-color: #8a9dff;
  display: inline-block;
  border-radius: 20px;
  min-width: 5rem;

  @media screen and (min-width: 540px) and (max-width: 768px){
    height: 22rem;
  }

  @media screen and (min-width: 280px) and (max-width: 539px){
    height: 28rem;
  }
`;

export const RightSideContainer = styled.div`
  width: 36rem;
  height: 23rem;
  background-color: #e9ecef;
  margin: 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 2rem;
  
  :hover {
    cursor:pointer;
  }

  @media screen and (min-width: 540px) and (max-width: 768px){
    height: 20rem;
  }

  @media screen and (min-width: 540px) and (max-width: 767px){
    width: 25rem
  }

  @media screen and (min-width: 360px) and (max-width: 539px){
    width: 18rem
  }

  @media screen and (min-width: 280px) and (max-width: 359px){
    width: 14rem
  }

  @media screen and (min-width: 280px) and (max-width: 539px){
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    height: 26rem;
  }
`;

export const TextContainer = styled.div`
  color: #000;
  font-family: "Red Hat Display";
  padding-left: 1.5rem;

  h1 {
    margin: 0;
  }

  p{
    margin-top: 0;
  }

  :hover {
    cursor:default;
  }
`

export const ButtonContainer = styled.div`
  width: 100%;
  
  @media screen and (min-width: 280px) and (max-width: 539px){
    margin-top: 10px;
  }
`

export const Button = styled.div`
  margin-left: auto;
  margin-right: 1.5rem;
  width: 35px;
  height: 35px;
  border-radius: 50%;

  svg {
    font-size: 35px;
    color: #64FF8F;
  }

  :hover{
    cursor: pointer;
  }
`
