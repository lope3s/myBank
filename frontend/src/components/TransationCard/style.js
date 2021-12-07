import styled from 'styled-components';

export const Card = styled.div`
  width: 95%;
  min-height: 40px;
  border-radius: 10px;
  background-color: ${props => props.type === "Saque" ? "#F44A49" : "#64FF8F"};
  border: 2px solid #252525;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  box-shadow: 5px 2px 5px #25252570;
  transition: transform 500ms ease, box-shadow 500ms ease;

  :hover{
      transform: scale(1.03);
      box-shadow: 2px 2px 20px 1px #25252570;
  }

  .value {
    padding-left: 40px;

    @media screen and (min-width: 280px) and (max-width: 1279px){
        padding-left: 0;
    }
  }
`

export const TextBox = styled.div`
    height: 100%;
    width: 33%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 10px;


    p{
        color: #252525;
        margin:0;
        :hover {
            cursor: default;
        }
    }

`