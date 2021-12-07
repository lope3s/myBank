import { PieChart, Pie, Cell, Label } from "recharts";
import { ChartContainer } from "./styles";
import parseValueFromDb from "../../services/parseValueFromDb";

const PieChartBox = ({resize, width, height, balance, finalValue}) => {
    const data01 = [
        {
          "name": "Meta",
          "value": finalValue - balance
        },
        {
          "name": "Valor",
          "value": balance
        },
    ]

    return (
        <ChartContainer onClick = {(e) => e.stopPropagation() }>
            <PieChart width = {width} height = {height}>
                <Pie data = {data01} cx="50%" cy="50%" outerRadius={resize > 280 ? 60 : 50} innerRadius={resize > 280 ? 60 : 30} startAngle = {90} endAngle = {450} >
                    {
                        data01.map((entry, index) => (
                                <Cell key={index} fill = {entry.name === "Meta" ? "#EBD09C" : "#8A9DFF"} />
                        ))
                    }
                    <Label value = {((balance/finalValue)*100).toFixed(2) + "%"} position = "center"/>
                </Pie>
            </PieChart>
            <div>
                <h1>Pago:</h1>
                <h1>R$ {parseValueFromDb(balance)}</h1>
            </div>
        </ChartContainer>
    )
}

export default PieChartBox