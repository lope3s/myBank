import { Container, Text, Button } from "./style"

const NoContent = ({ trigger }) => {

    return (
        <Container>
            <Text>
                Parece que você ainda não tem nenhuma meta!
            </Text>
            <img src = "https://res.cloudinary.com/weex/image/upload/v1631283856/message-1_ibdlzh.svg" alt = "No content"/>
            <Button onClick = {() =>  trigger(true)}>
                Criar Meta
            </Button>
        </Container>
    )
}

export default NoContent