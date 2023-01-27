import axios from 'axios'

export default async (req, res) => {
    const url = encodeURI(decodeURIComponent(req.query.url));
    const previewToken = url.substring(url.indexOf('token=') + 6)

    let result = null;

    try {
        const options = {
            method: 'GET',
            url: url,
            mode: 'no-cors',
            headers: {
                Cookie: "emk.previewDefaultContent=false; emk.previewToken=" + previewToken + ";",
                'X-APIKey': process.env.COBALT_API_KEY,
            },
            responseType: 'stream'

        };

        const response = await axios.request(options)
        result = response.data
    }
    catch (e) {
        console.log(e)
    }

    result.pipe(res);
};