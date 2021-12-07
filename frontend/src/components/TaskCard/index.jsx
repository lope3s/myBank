import { CardContainer, LeftSideContainer, RightSideContainer, TextContainer, ButtonContainer, Button } from "./style";
import PieChartBox from "../PieChartBox";
import { MdAddCircle } from 'react-icons/md'
import { useEffect, useState, useCallback } from "react";
import parseValueFromDb from "../../services/parseValueFromDb";

const TaskCard = ({ width, taskName, value, dueDate, balance, activateTransactions, goalId, redirect, defaultPath }) => {
  const [ resize, setResize ] = useState(window.innerWidth)

  const useResize = useCallback(() => {
    setResize(window.innerWidth)
  }, [])

  useEffect (() => {
    window.addEventListener("resize", useResize)
  }, [useResize])

  return (
    <CardContainer>
      <LeftSideContainer width={`${(balance/value)*100 > 100 ? 100 : (balance/value)*100}%`}>
        <RightSideContainer onClick = {() => redirect({redirect: true, uri: defaultPath + goalId})}>
          <ButtonContainer>
            <Button onClick = {(e) => {
              e.stopPropagation();
              activateTransactions({activate: true, goalId: goalId})
            }}>
              <MdAddCircle/>
            </Button>
          </ButtonContainer>
          <TextContainer onClick = {(e) => e.stopPropagation() }>
            <h1>Meta.</h1>
            <p>{taskName}</p>
            <h1>Valor</h1>
            <p>R$ {parseValueFromDb(value)}</p>
            <h1>Data Limite</h1>
            <p>{dueDate}</p>
          </TextContainer>
          <PieChartBox width = {resize > 280 ? 150 : 100} height = {resize > 280 ? 150 : 100} balance = {balance} finalValue = {value}/>
        </RightSideContainer>
      </LeftSideContainer>
    </CardContainer>
  );
};

export default TaskCard;
