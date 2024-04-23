import axios from 'axios';

export default async (req, res) => {
    console.log('calling image proxy');
    const url = encodeURI(decodeURIComponent(req.query.url));

    let result = null;

    try {
        const options = {
            method: 'GET',
            url,
            mode: 'no-cors',
            headers: {
                Cookie: `emk.previewDefaultContent=false;`,
                emauth: req.cookies.emauth,
                'X-APIKey': process.env.NEON_API_KEY
            },
            responseType: 'stream' as const
        };

        const response = await axios.request(options);
        result = response.data;
    } catch (e) {
        console.log(e);
    }

    result.pipe(res);
};
