import { TransactionBox, CardContainer, LeftSideContainer, RightSideContainer, TextContainer, TransactionsContainer, Button, CloseButton, CloseButtonBox, ExcludeButton, UpdateButton } from "./style";
import { MdClose } from 'react-icons/md';
import useSWR from "swr";
import swrFetcher from "../../services/fetcher";
import checkEnvironment from "../../keys";
import makeDueDate from "../../services/makeDueDate";
import { TransactionCard } from "../TransationCard";
import {LittleLoadingComponent} from '../LittleLoadingComponent'
import { TextInfo } from "../TextInfo";
import { LineChartBox } from "../LineChartBox";
import parseValueFromDb from '../../services/parseValueFromDb';
import { BsTrash } from 'react-icons/bs';
import { MdUpdate } from 'react-icons/md'
import { DeleteConfirmModal } from "../../components/DeleteConfirmModal";
import { useState } from 'react';
import { UpdateModal } from "../UpdateModal";
import { LoadingComponent } from "../LoadingComponent";
import { useStoreActions } from "easy-peasy";
import { useStoreState } from "easy-peasy";
import ModalServerResponse from '../modalServerResponse'
import { NewTransaction } from "../NewTransaction";

const ExpandedCard = ({ goalId, trigger }) => {
  const { userId } = JSON.parse(localStorage.getItem("@myBank:user"))
  const { data } = useSWR(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/transactionList/${userId}/${goalId}`, swrFetcher)
  const outerData = useSWR(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/goalsList/${userId}/${goalId}`, swrFetcher)
  const [ del, setDelete ] = useState(false);
  const [ update, setUpdate ] = useState(false);
  const activeServerModal = useStoreState(state => state.activeServerModal)
  const setActiveServerModal = useStoreActions((action) => action.setActiveServerModal)
  const [ showTransactionModal, setShowTransactionModal ] = useState({activate: false, goalId: ""});

  if (!outerData.data){
    return <LoadingComponent/>
  }

  return (
    <CardContainer>
      {
        del
        && <DeleteConfirmModal toggle = {setDelete} goalId = {goalId} trigger = {trigger} messageTrigger = {setActiveServerModal}/>
      }
      {
        update
        && <UpdateModal toggle = {setUpdate} name = {outerData.data?.goals.name} dueDate = {makeDueDate(outerData.data?.goals.dueDate)} value = {outerData.data?.goals.finalValue} goalId = {goalId}/>
      }
      {
        showTransactionModal.activate
        && <NewTransaction onExpandedCard = {true} trigger = {setShowTransactionModal} goalId = {showTransactionModal.goalId}/> 

      }
      <LeftSideContainer width={`${(outerData.data?.goals.totalValue/outerData.data?.goals.finalValue) * 100 > 100 ? 100 : (outerData.data?.goals.totalValue/outerData.data?.goals.finalValue) * 100}%`} onClick = {(e) => e.stopPropagation()}>
        <RightSideContainer onClick = {(e) => e.stopPropagation()}> 
          <CloseButtonBox>
            <UpdateButton onClick = {() => setUpdate(true)}>
              <MdUpdate/>
            </UpdateButton>
            <ExcludeButton onClick = {() => setDelete(true)}>
              <BsTrash/>
            </ExcludeButton>
            <CloseButton onClick = {() => trigger(true)}>
              <MdClose/>
            </CloseButton>
          </CloseButtonBox>
          <TextContainer>
            <TextInfo h1Text = {outerData.data?.goals.name} width = {100}/>
            <TextInfo h1Text = "Data de Criação" pText = {makeDueDate(outerData.data?.goals.creationDate)}/>
            <TextInfo h1Text = "Data Limite" pText = {makeDueDate(outerData.data?.goals.dueDate)}/>
            <TextInfo h1Text = "Valor" pText = {parseValueFromDb(outerData.data?.goals.finalValue)} isCash = {true}/>
            <TextInfo h1Text = "Último Depósito" pText = {makeDueDate(outerData.data?.goals.lastDeposit)}/>
          </TextContainer>
          <TransactionBox>
            <TransactionsContainer>
                {
                    data 
                    ? data.transactionHistory.map((value, index) => <TransactionCard key = {index} type={ value.type === "Deposit" ? "Depósito" : "Saque"} value={parseValueFromDb(value.value)} date={makeDueDate(value.date)}/>)
                    : <LittleLoadingComponent/>
                }
            </TransactionsContainer>
            <Button onClick = {() => setShowTransactionModal({activate: true, goalId: goalId})}>
              <p>
                Nova Transação
              </p>
            </Button>
          </TransactionBox>
          <LineChartBox data = {data}/>
        </RightSideContainer>
      </LeftSideContainer>
      <ModalServerResponse activate = {activeServerModal.activate} message = {activeServerModal.message} status = {activeServerModal.status}/>
    </CardContainer>
  );
};

export default ExpandedCard;
