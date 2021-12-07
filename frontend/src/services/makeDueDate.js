const makeDueDate = (date) => {
    const makeDateObj = new Date(date)
    const day = makeDateObj.getDate()
    const month = String(makeDateObj.getMonth() + 1).padStart(2, "0")
    const year = makeDateObj.getFullYear()
    const fullDate = `${day}/${month}/${year}`
    return fullDate
}

export default makeDueDate