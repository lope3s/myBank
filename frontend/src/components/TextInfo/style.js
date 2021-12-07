import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: ${props => props.width ? `${props.width}%` : "50%"};
    align-items: center;

    h1 {
        font-size: ${props => props.width && "3rem"};
        margin-bottom: ${props => props.width && "30px"};
    }

    @media screen and (min-width: 768px) and (max-width: 1279px){
        justify-content: space-between;
        align-items: center;

        h1{
            font-size: 1rem;
            text-align: center;
            margin-bottom: ${props => props.width && "15px"};
        }
    }

    @media screen and (min-width: 540px) and (max-width: 767px){
        justify-content: space-between;
        align-items: center;

        h1{
            font-size: 1.3rem;
            text-align: center;
            margin-bottom: ${props => props.width && "15px"};
        }
    }

    @media screen and (min-width: 280px) and (max-width: 539px){
        justify-content: space-between;
        align-items: center;

        h1{
            font-size: 1rem;
            text-align: center;
            margin-bottom: ${props => props.width && "15px"};
        }
    }
`