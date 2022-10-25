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
                Cookie: "emk.previewDefaultContent=false; emk.previewToken=" + previewToken + ";"
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