import { Container, Card, Button, CardForm, Input, SubmitButotn, Select, ErrorMessageStyled, FieldsBox } from './style';
import { MdClose } from 'react-icons/md'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import checkEnvironment from '../../keys';
import { useSWRConfig } from 'swr';
import ModalServerResponse from '../modalServerResponse';
import { useState } from 'react';
import { AiOutlineDollar } from 'react-icons/ai';
import { AiOutlineTransaction } from 'react-icons/ai';

export const NewTransaction = ({ trigger, goalId, onExpandedCard }) => {
    const [ activeServerModal, setActiveServerModal ] = useState({activate: false, message: '', status: false});
    const { register, reset, handleSubmit, formState: {errors}, setFocus} = useForm();
    const { mutate } = useSWRConfig();
    const user = JSON.parse(localStorage.getItem("@myBank:user"))

    const postForm = (data) => {
        data["userId"] = user.userId
        data["goalId"] = parseInt(goalId)

        axios.post(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/createTransaction`, data)
        .then(res => {
            reset()
            setFocus('value')
            mutate(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/goalsList/${user.userId}`)
            mutate(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/transactionList/${user.userId}/${goalId}`)
            mutate(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/goalsList/${user.userId}/${goalId}`)
            setActiveServerModal({activate: true, message: res.data.message, status: true})
            setTimeout(() => {
                setActiveServerModal({activate: false, message: '', status: false})
            }, 4500)
        })
        .catch(err => {
            console.log(err)
            setActiveServerModal({activate: true, message: err.response.data.message, status: false})

            setTimeout(() => {
                setActiveServerModal({activate: false, message: '', status: false})
            }, 4500)
        })
    }

    return (
        <Container onClick = {(e) => {
            e.stopPropagation()
            trigger({activate: false, goalId: ""})
            }} onExpandedCard = {onExpandedCard}>
            <Card onClick = {(e) => e.stopPropagation()}>
                <Button onClick = {() => trigger({activate: false, goalId: ""})}>
                    <MdClose/>
                </Button>
                <h1>Nova Transação</h1>
                <CardForm onSubmit = {handleSubmit(postForm)}>
                    <FieldsBox>
                        <AiOutlineDollar/>
                        <Input {...register('value', {required: 'Insira o valor', pattern: {value: /^\d+\.?\d{1,2}$/, message: "Apenas números e pontos"}})} placeholder = 'Valor'/>
                    </FieldsBox>
                    <ErrorMessage
                        errors = {errors}
                        name = 'value'
                        render = {({message}) => (
                            <ErrorMessageStyled>{message}</ErrorMessageStyled>
                        )}
                    />
                    <FieldsBox>
                        <AiOutlineTransaction/>
                        <Select {...register('type', {required: 'Selecione o  tipo da transação', validate: value => value !== "Tipo da transação" || "Determine o tipo da transação"})}>
                            <option> Tipo da transação </option>
                            <option value = "Deposit"> Depósito </option>
                            <option value = "Withdraw"> Saque </option>
                        </Select>
                    </FieldsBox>
                    <ErrorMessage
                        errors = {errors}
                        name = 'type'
                        render = {({message}) => (
                            <ErrorMessageStyled>{message}</ErrorMessageStyled>
                        )}
                    />
                    <SubmitButotn type = 'submit'>
                        Confirmar Transação
                    </SubmitButotn>
                </CardForm>
            </Card>
            <ModalServerResponse activate = {activeServerModal.activate} message = {activeServerModal.message} status = {activeServerModal.status}/>
        </Container>
    )
}