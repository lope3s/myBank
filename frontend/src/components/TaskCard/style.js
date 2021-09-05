import styled from "styled-components";

export const CardContainer = styled.div`
  width: 40rem;
  height: 25rem;
  margin: 1rem;
`;

export const LeftSideContainer = styled.div`
  width: ${(props) => props.width}!important;
  height: 25rem;
  background-color: #8a9dff;
  display: inline-block;
  border-radius: 20px;
  min-width: 5rem;
`;

export const RightSideContainer = styled.div`
  width: 36rem;
  height: 23rem;
  background-color: #e9ecef;
  margin: 1rem 0 1rem 1rem;
  border-radius: 10px;
`;
