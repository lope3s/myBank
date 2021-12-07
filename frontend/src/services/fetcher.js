import axios from 'axios';

const swrFetcher = async (url) => (
    await axios.get(url)
    .then(res => res.data)
)

export default swrFetcher