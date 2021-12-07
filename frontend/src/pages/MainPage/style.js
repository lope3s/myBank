import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #495057;
  overflow-y: scroll;
  overflow-x: hidden;

  min-height: 640px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: calc(100vh - 4rem);
  background-color: #495057;

  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  
  @media screen and (min-width: 280px) and (max-width: 768px){
    width: 100vw;
  }
`;
