import { MainContainer, ContentContainer } from "./style";
import PersistentDrawerLeft from "../../components/menu";
import TaskCard from "../../components/TaskCard";
import useSWR from "swr";
import swrFetcher from "../../services/fetcher";
import { useState } from "react";
import NoContent from "../../components/NoContent";
import { NewGoal } from "../../components/NewGoal";
import checkEnvironment from "../../keys";
import makeDueDate from "../../services/makeDueDate";
import { LoadingComponent } from "../../components/LoadingComponent";
import { NewTransaction } from '../../components/NewTransaction';
import { Redirect } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import ModalServerResponse from '../../components/modalServerResponse';

const MainPage = () => {
  const user = JSON.parse(localStorage.getItem("@myBank:user"))
  const { data } = useSWR(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/goalsList/${user.userId}`, swrFetcher)
  const [ showGoal, setShowGoal ] = useState(false);
  const [ showTransactionModal, setShowTransactionModal ] = useState({activate: false, goalId: ""});
  const { isLogged, isChanging, activeServerModal } = useStoreState((store) => store);
  const [ redirectToGoalPage, setRedirectToGoalPage ] = useState({redirect: false, uri: `/explicitGoal/${user.userId}/`})

  if (!isLogged && !isChanging){
     return <Redirect to = "/"/>
  }

  if (!data || (!isLogged && isChanging)){
    return <LoadingComponent/>
  }

  if (redirectToGoalPage.redirect) {
    return <Redirect to = {redirectToGoalPage.uri}/>
  }

  return (
    <>
      <MainContainer>
        <PersistentDrawerLeft trigger = {setShowGoal}>
          {
            showGoal
            ? <NewGoal trigger = {setShowGoal}/>
            :(showTransactionModal.activate)
            ? <NewTransaction trigger = {setShowTransactionModal} goalId = {showTransactionModal.goalId}/> 
            :(<ContentContainer>
                {
                  data.goals.length === 0
                  ? <NoContent trigger = {setShowGoal}/>
                  : data.goals.map((item) => <TaskCard defaultPath = {redirectToGoalPage.uri} redirect = {setRedirectToGoalPage} width={"0%"} taskName = {item.name} value = {item.finalValue} dueDate = {makeDueDate(item.dueDate)} balance = {item.totalValue} activateTransactions = {setShowTransactionModal} goalId = {item.goalId}/>)
                }
              </ContentContainer>)
          }
          <ModalServerResponse activate = {activeServerModal.activate} message = {activeServerModal.message} status = {activeServerModal.status}/>
        </PersistentDrawerLeft>
      </MainContainer>
    </>
  );
};

export default MainPage;
