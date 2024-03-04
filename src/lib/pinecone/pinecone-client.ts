import axios from 'axios';

/**
 *
 * @param query
 */
export async function pineconeRequest(query) {
    const payload = {
        input: query,
        label: '',
        count: 20,
        includeSimilarities: true
    };
    const options = {
        method: 'POST',
        url: process.env.PINECONE_URL,
        mode: 'no-cors',
        data: payload,
        headers: {
            'x-api-key': process.env.PINECONE_API_KEY,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };

    return axios.request(options);
}
