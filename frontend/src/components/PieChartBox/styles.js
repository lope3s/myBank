import styled from 'styled-components';

export const ChartContainer = styled.div`
    color: #000;
    text-align: center;
    margin-right: 1.5rem;
    .recharts-text{
        font-size: 0.65rem;
        font-weight: bold;
        font-family: "Red Hat Display";
        animation: reveal 4s ease forwards;

        @keyframes reveal {
            from {
                opacity: 0;
            } to {
                opacity: 1
            }
        }
    }

    :hover {
        cursor:default;
    }

    @media screen and (min-width: 280px) and (max-width: 539px){
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        h1 {
            font-size: 15px;
        }
    }
`
