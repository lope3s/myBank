import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import makeDueDate from "../../services/makeDueDate";
import { useState, useEffect, useCallback } from 'react';

export const LineChartBox = ({data}) => {
  const [ resize, setResize ] = useState(window.innerWidth)

  const makeDimensions = () => {
    if (resize >= 1280){
      return 730
    }

    if (resize >= 768 && resize < 1280){
      return 600
    }

    if (resize >= 540 && resize < 768){
      return 400
    }

    if (resize >= 360 && resize < 540){
      return 300
    }

    if (resize >= 280 && resize < 359){
      return 230
    }
  }

  const useResize = useCallback(() => {
    setResize(window.innerWidth)
  }, [])

  useEffect (() => {
    window.addEventListener("resize", useResize)
  }, [useResize])

  let treatedData = []

  data?.transactionHistory.forEach(value => {
    treatedData.push({name:makeDueDate(value.date) , Valor: value.finalValue})
  })
 
    return (
        <LineChart width={makeDimensions()} height={280} data={treatedData}
        margin={{ top: 5, right: resize < 359 ? 15 : 5, left: resize <= 540 ? -25 : 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="natural" dataKey="Valor" stroke="#E7CE9C" />
        </LineChart>
    )
}