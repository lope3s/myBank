import { Container, Card, Button, CardForm, Input, SubmitButotn, Select, ErrorMessageStyled, FieldsBox } from './style';
import { MdClose } from 'react-icons/md'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import checkEnvironment from '../../keys';
import { useSWRConfig } from 'swr';
import { AiOutlineDollar } from 'react-icons/ai';
import { GoDiffRenamed } from 'react-icons/go';
import { MdTimer } from 'react-icons/md';
import { useStoreActions } from "easy-peasy";

export const NewGoal = ({ trigger }) => {
    const { register, reset, handleSubmit, formState: {errors}, setFocus} = useForm();
    const { mutate } = useSWRConfig();
    const user = JSON.parse(localStorage.getItem("@myBank:user"))
    const setActiveServerModal = useStoreActions((action) => action.setActiveServerModal)

    const postForm = (data) => {
        data["userId"] = user.userId

        axios.post(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/goalRegister`, data)
        .then(res => {
            console.log(res)
            reset()
            setFocus('value')
            mutate(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/goalsList/${user.userId}`)
            setActiveServerModal({activate: true, message: res.data.message, status: true})
            trigger(false)
        })
        .catch(err => {
            console.log(err)
            setActiveServerModal({activate: true, message: err.response?.data.message, status: false})
        })
        setTimeout(() => {
            setActiveServerModal({activate: false, message: '', status: false})
        }, 4500)
    }

    return (
        <Container onClick = {() => trigger(false)}>
            <Card onClick = {(e) => e.stopPropagation()}>
                <Button onClick = {() => trigger(false)}>
                    <MdClose/>
                </Button>
                <h1>Nova Meta</h1>
                <CardForm onSubmit = {handleSubmit(postForm)}>
                    <FieldsBox error = {errors?.name?.message}>
                        <AiOutlineDollar/>
                        <Input error = {errors?.name?.message} {...register('value', {required: 'Insira o valor', pattern: {value: /^\d+\.?\d{0,2}$/, message: "Apenas números e pontos"}})} placeholder = 'Valor'/>
                    </FieldsBox>
                    <ErrorMessage
                        errors = {errors}
                        name = 'value'
                        render = {({message}) => (
                            <ErrorMessageStyled>{message}</ErrorMessageStyled>
                        )}
                    />
                    <FieldsBox>
                        <GoDiffRenamed/>
                        <Input {...register('name', {required: 'Defina um nome para a sua meta'})} placeholder = 'Nome da Meta'/>
                    </FieldsBox>
                    <ErrorMessage
                        errors = {errors}
                        name = 'name'
                        render = {({message}) => (
                            <ErrorMessageStyled>{message}</ErrorMessageStyled>
                        )}
                    />
                    <FieldsBox>
                        <MdTimer/>
                        <Select {...register('dueDate', {required: 'Selecione um prazo', validate: value => value !== "Tempo Limite" || "Determine um prazo"})}>
                            <option> Tempo Limite </option>
                            <option value = {1}> 1 mês</option>
                            <option value = {2}> 2 meses</option>
                            <option value = {3}> 3 meses</option>
                            <option value = {4}> 4 meses</option>
                            <option value = {5}> 5 meses</option>
                            <option value = {6}> 6 meses</option>
                            <option value = {7}> 7 meses</option>
                            <option value = {8}> 8 meses</option>
                            <option value = {9}> 9 meses</option>
                            <option value = {10}> 10 meses</option>
                            <option value = {11}> 11 meses</option>
                            <option value = {12}> 12 meses</option>
                        </Select>
                    </FieldsBox>
                    <ErrorMessage
                        errors = {errors}
                        name = 'dueDate'
                        render = {({message}) => (
                            <ErrorMessageStyled>{message}</ErrorMessageStyled>
                        )}
                    />
                    <SubmitButotn type = 'submit'>
                        Criar Meta
                    </SubmitButotn>
                </CardForm>
            </Card>
        </Container>
    )
}