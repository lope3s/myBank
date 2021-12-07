import { Container, Modal, Form, Input, Select, Button, CloseButton, ErrorMessageStyled } from './style'
import { useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import checkEnvironment from '../../keys';
import { useSWRConfig } from 'swr';
import parseValueFromDb from '../../services/parseValueFromDb';
import makeDateOptions from '../../services/makeDateOptions';
import { useStoreActions } from 'easy-peasy';
import { LoadingComponent } from '../LoadingComponent';
import { useState } from 'react';

export const UpdateModal = ({ toggle, name, dueDate, value, goalId }) => {
    const { handleSubmit, formState: {errors}, register, reset } = useForm(); 
    const setActiveServerModal = useStoreActions(action => action.setActiveServerModal)
    const { userId } = JSON.parse(localStorage.getItem("@myBank:user"))
    const { mutate } = useSWRConfig();
    const [ isLoading, setIsLoading ] = useState(false)

    const postForm = (data) => {

        setIsLoading(true)
        
        if (data.name || data.finalValue || data.dueDate !== dueDate){
            let newData = {}

            Object.entries(data).forEach(value => {
                if(value[0] === "dueDate" && value[1] !== dueDate){
                    newData = {...newData, [value[0]]: value[1]}
                    return
                }

                if(value[0] !== "dueDate" && value[1]){
                    newData = {...newData, [value[0]]: value[1]}
                    return
                }
            })

            axios.put(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/goalUpdate/${userId}/${goalId}`, newData)
            .then(res => {
                console.log(res)
                mutate(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/goalsList/${userId}/${goalId}`)
                mutate(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/goalsList/${userId}`)
                reset()
                setIsLoading(false)
                setActiveServerModal({activate: true, message: res.data.message, status: true})
                toggle(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
                setActiveServerModal({activate: true, message: err.response.data.message, status: false})
            })

            setTimeout(() => {
                setActiveServerModal({activate: false, message: '', status: false})
            }, 4500)

            return
        }

        setIsLoading(false)
        setActiveServerModal({activate: true, message: 'Preencha ao menos um campo', status: false})

        setTimeout(() => {
            setActiveServerModal({activate: false, message: '', status: false})
        }, 4500)

        return
    }

    if (isLoading) {
        return <LoadingComponent/>
    }

    return (
        <Container onClick = {(e) => {
            e.stopPropagation()
            toggle(false)
        }}>
            <Modal onClick = {(e) => {
                e.stopPropagation();
            }}>
                <CloseButton onClick = {(e) => {
                    e.stopPropagation()
                    toggle(false)}}
                >
                    <MdClose/>  
                </CloseButton>
                <h1>Atualize aqui os seus dados</h1>
                <Form onSubmit = {handleSubmit(postForm)}>
                    <Input placeholder = {name} {...register("name", {required: false})}/>
                    <ErrorMessage
                        errors = {errors}
                        name = "name"
                        render = {({message}) => <ErrorMessageStyled>{message}</ErrorMessageStyled>}
                    />
                    <Input placeholder = {`R$ ${parseValueFromDb(value)}`} {...register("finalValue", {required: false, pattern: {value: /^[0-9]+\.?[0-9]{1,2}/, message: "Apenas números e pontos"} })}/>
                    <ErrorMessage
                        errors = {errors}
                        name = "finalValue"
                        render = {({message}) => <ErrorMessageStyled>{message}</ErrorMessageStyled>}
                    />
                    <Select {...register("dueDate")}>
                        <option>{dueDate}</option>
                        {
                            makeDateOptions(dueDate)
                        }
                    </Select>
                    <ErrorMessage
                        errors = {errors}
                        name = "dueDate"
                        render = {({message}) => <ErrorMessageStyled>{message}</ErrorMessageStyled>}
                    />
                    <Button>
                        Cadastrar
                    </Button>
                </Form>
            </Modal>
        </Container>
    )
}