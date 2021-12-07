import styled from 'styled-components'

export const Container = styled.div`
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E9ECEF90;
    z-index: 1;
`

export const CenterContainer = styled.div`
    p {
        font-family: "Red Hat Display";
        font-size: 1.5rem;
        color: #252525;
        margin: 0 auto;
    }
`

export const LoadingBox = styled.div`
    margin: 10px auto;
    width: 50px;
    height: 50px;
    border: 10px solid #252525;
    border-right-color: #E7CE9C;
    border-radius: 50%;
    animation: spin 1.5s linear infinite;

    @keyframes spin {
        from {
            transform: rotate(0deg)
        } to {
            transform: rotate(360deg)
        }
    }

`