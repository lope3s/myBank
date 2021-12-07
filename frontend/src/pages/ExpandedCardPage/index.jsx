import { MainContainer, ContentContainer } from "./style";
import PersistentDrawerLeft from "../../components/menu";
import ExpandedCard from "../../components/ExpandedCardContainer";
import { useState } from "react";
import { NewGoal } from "../../components/NewGoal";
import { LoadingComponent } from "../../components/LoadingComponent";
import { NewTransaction } from '../../components/NewTransaction';
import { Redirect } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import { useParams } from "react-router-dom";

const ExpandedCardPage = () => {
  const { goalId } = useParams();
  const [ showGoal, setShowGoal ] = useState(false);
  const [ showTransactionModal, setShowTransactionModal ] = useState({activate: false, goalId: ""});
  const { isLogged, isChanging } = useStoreState((store) => store);
  const [ goToMainPage, setGoToMainPage ] = useState(false);

  if (!isLogged && !isChanging){
     return <Redirect to = "/"/>
  }

  if (goToMainPage){
    return <Redirect to = "/mainpage"/>
 }

  if ((!isLogged && isChanging)){
    return <LoadingComponent/>
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
            :(<ContentContainer onClick = {() => setGoToMainPage(true)}>
                  <ExpandedCard trigger = {setGoToMainPage} goalId = {goalId}/>
              </ContentContainer>)
          }
        </PersistentDrawerLeft>
      </MainContainer>
    </>
  );
};

export default ExpandedCardPage;
