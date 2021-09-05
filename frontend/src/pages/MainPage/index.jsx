import { MainContainer, ContentContainer } from "./style";
import PersistentDrawerLeft from "../../components/menu";
import TaskCard from "../../components/TaskCard";
import { useHistory } from "react-router-dom";
import { useStoreState } from "easy-peasy";

const MainPage = () => {
  const history = useHistory();
  const { isLogged } = useStoreState((store) => store);

  if (isLogged === false) {
    history.push("/");
  }
  //   console.log(user.getState().user[0].isLogged);

  return (
    <>
      <MainContainer>
        <PersistentDrawerLeft>
          <ContentContainer>
            <TaskCard width={"0%"}></TaskCard>
            {/* <TaskCard width={"0%"}></TaskCard>
            <TaskCard width={"0%"}></TaskCard> */}
            {/* <TaskCard width={"0%"}></TaskCard> */}
          </ContentContainer>
        </PersistentDrawerLeft>
      </MainContainer>
    </>
  );
};

export default MainPage;
