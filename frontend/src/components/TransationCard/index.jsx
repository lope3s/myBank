import { Card, TextBox } from "./style"

export const TransactionCard = ({type, value, date}) => {
    return (
    <Card type = {type}>
        <TextBox>
            <p>{type}</p>
        </TextBox>
        <TextBox className = "value">
            <p>R$ {value}</p>
        </TextBox>
        <TextBox className = "value">
            <p>Data: {date}</p>
        </TextBox>
    </Card>
    )
}