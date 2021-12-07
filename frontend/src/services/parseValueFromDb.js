const parseValueFromDb = (value) => {
    const splitedValue = String(value).split('.')

    if (splitedValue.length > 1) {
        const finalValue = `${splitedValue[0]},${splitedValue[1].padEnd(2, '0')}`

        return finalValue
    }

    return `${splitedValue[0]},00`
}

export default parseValueFromDb