import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    bottom: 50px;
    left: 50px;
    width: 250px;
    height: 150px;
    background-color: #E9ECEF;
    border-radius: 50px;
    border: 5px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Red Hat Display";
    font-size: 1.5rem;
    color: #232323;
    box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.43);
    animation: growth 1s ease forwards, shrink 1s ease 2.5s forwards;
    z-index: 2000000;
    text-align: center;

    @keyframes growth {
        from {
            font-size: 0;
            width: 0;
            height: 0;
            border: 0px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.43);
        } to {
            font-size: 1.5rem;
            width: 250px;
            height: 100px;
            border: 5px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
            box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.43);
        }
    }

    @keyframes shrink {
        0% {
            font-size: 1.5rem;
            width: 250px;
            height: 100px;
            border: 5px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
            box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.43);
        } 10% {
            font-size: 1.8rem;
            width: 280px;
            height: 120px;
            border: 5px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
            box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.43);
        } 100% {
            font-size: 0px;
            width: 0px;
            height: 0px;
            border: 0px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.43);
        }
    }

    @media screen and (min-width: 280px) and (max-width: 539px){
        bottom: 20px;
        left: 30px;
        @keyframes growth {
            from {
                font-size: 0;
                width: 0;
                height: 0;
                border: 0px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.43);
            } to {
                font-size: 1.1rem;
                width: 165px;
                height: 60px;
                border: 5px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
                box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.43);
            }
        }

        @keyframes shrink {
            0% {
                font-size: 1.1rem;
                width: 165px;
                height: 60px;
                border: 5px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
                box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.43);
            } 10% {
                font-size: 1.25rem;
                width: 180px;
                height: 70px;
                border: 5px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
                box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.43);
            } 100% {
                font-size: 0px;
                width: 0px;
                height: 0px;
                border: 0px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.43);
            }
        }
    }

    @media screen and (min-width: 540px) and (max-width: 767px){
        @keyframes growth {
            from {
                font-size: 0;
                width: 0;
                height: 0;
                border: 0px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.43);
            } to {
                font-size: 1.1rem;
                width: 200px;
                height: 70px;
                border: 5px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
                box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.43);
            }
        }

        @keyframes shrink {
            0% {
                font-size: 1.1rem;
                width: 200px;
                height: 70px;
                border: 5px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
                box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.43);
            } 10% {
                font-size: 1.25rem;
                width: 230px;
                height: 90px;
                border: 5px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
                box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.43);
            } 100% {
                font-size: 0px;
                width: 0px;
                height: 0px;
                border: 0px solid ${props => props.status ? "#1E7789" : "#E34B5F"};
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.43);
            }
        }
    }

`