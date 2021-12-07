import { Container, CenterContainer, LoadingBox } from "./style"

export const LittleLoadingComponent = (shrink) => {

    console.log(shrink)
    return (
        <Container shrink = {shrink}>
            <CenterContainer>
                <LoadingBox/>
                <p>Carregando...</p>
            </CenterContainer>
        </Container>
    )
}