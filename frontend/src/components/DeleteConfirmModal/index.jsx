import { Container, Modal, ButtonBox, Button } from './style';
import axios from 'axios'
import checkEnvironment from '../../keys';
import { useSWRConfig } from 'swr';

export const DeleteConfirmModal = ({ toggle, goalId, trigger, messageTrigger }) => {
    const { userId } = JSON.parse(localStorage.getItem("@myBank:user"))
    const { mutate } = useSWRConfig();

    const fetcher = () => {
        axios.delete(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/goalDelete/${userId}/${goalId}`)
        .then(res => {
            mutate(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/goalsList/${userId}`)
            messageTrigger({activate: true, message: "Meta deletada!", status: true})
        })
        .catch(err => {
            console.log(err.response)
            messageTrigger({activate: true, message: "Ocorreu um erro, tente novamente", status: false})
        })

        setTimeout(() => {
            messageTrigger({activate: false, message: '', status: false})
        }, 4500)
    }

    return (
        <Container onClick = {(e) => {
            e.stopPropagation()
            toggle(false)
        }}>
            <Modal onClick = {(e) => e.stopPropagation()}>
                <h1>Deseja excluir esta meta?</h1>
                <ButtonBox>
                    <Button onClick = {(e) => {
                        e.stopPropagation()
                        fetcher()
                        trigger(true)
                    }}>
                        Sim
                    </Button>
                    <Button onClick = {(e) => {
                        e.stopPropagation()
                        toggle(false)
                    }}>
                        Não
                    </Button>
                </ButtonBox>
            </Modal>
        </Container>
    )
}