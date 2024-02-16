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
    let response = null;
    try {
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

        response = await axios.request(options);
    } catch (e) {
        console.log(e);
    }
    return response.data;
}
