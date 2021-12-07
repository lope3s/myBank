import { Container } from './style';

export const TextInfo = ({h1Text, pText, width, isCash}) => {

    return (
        <Container width = {width}>
            <h1>{h1Text}</h1>
            {
                pText
                && <p>{isCash ? `R$ ${pText}` : pText}</p>
            }
        </Container>
    )
}