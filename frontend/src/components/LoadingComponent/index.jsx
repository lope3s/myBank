import { Container, CenterContainer, LoadingBox } from "./style"

export const LoadingComponent = (shrink) => {
    return (
        <Container shrink = {shrink}>
            <CenterContainer>
                <LoadingBox/>
                <p>Carregando...</p>
            </CenterContainer>
        </Container>
    )
}