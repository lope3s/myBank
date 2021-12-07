import { useEffect } from "react";
import { useStoreActions } from "easy-peasy";
import axios from "axios";
import checkEnvironment from "../keys";
import { Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...refs}) => {
    const toggle = useStoreActions((actions) => actions.toggle);
    const status = useStoreActions((actions) => actions.toggleStatus)
    const { token } = JSON.parse(localStorage.getItem("@myBank:user"))
    
    useEffect(() => {
        axios.post(`${checkEnvironment(process.env.REACT_APP_STAGE).envUrl}/checkLogin`, {token: token})
        .then(_res => {
            toggle(true)
            status(false)
        })
        .catch(err => {
            console.log(err)
            toggle(false)
            status(false)
        })
    }, [token, toggle, status])

    return (
        <Route {...refs} render = {props => <Component {...props}/>}/>
    )
}

export default PrivateRoute