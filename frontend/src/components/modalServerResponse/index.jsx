import { Container } from './style'

const ModalServerResponse = ({activate, message, status}) => {
    return (
        activate &&
        <Container status = {status}>
            <p>{ message }</p>
        </Container>
    )
}

export default ModalServerResponse