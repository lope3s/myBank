import { CardContainer, LeftSideContainer, RightSideContainer } from "./style";

const TaskCard = ({ width }) => {
  return (
    <CardContainer>
      <LeftSideContainer width={width}>
        <RightSideContainer></RightSideContainer>
      </LeftSideContainer>
    </CardContainer>
  );
};

export default TaskCard;
