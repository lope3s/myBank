import makeDueDate from "./makeDueDate"

const makeDateOptions = (dueDate) => {
    const availableOptions = [
        "(1 mês)",
        "(2 meses)",
        "(3 meses)",
        "(4 meses)",
        "(5 meses)",
        "(6 meses)",
        "(7 meses)",
        "(8 meses)",
        "(9 meses)",
        "(10 meses)",
        "(11 meses)",
        "(12 meses)"
    ]

    return (
        availableOptions.map((value, index) => <option value = {index + 1}>
            {makeDueDate(new Date(dueDate.split("/")[2], parseInt(dueDate.split("/")[1]) + index, dueDate.split("/")[0]))} {value}
        </option>)
    )
}

export default makeDateOptions