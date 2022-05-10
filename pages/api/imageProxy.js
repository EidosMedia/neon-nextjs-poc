export default async (req, res) => {
    const url = encodeURI(decodeURIComponent(req.query.url));
    const previewToken = url.substring(url.indexOf('token=')+6)

    const result = await fetch(url, {
        headers: {
            'Cookie':"emk.previewDefaultContent=false; emk.previewToken="+previewToken+";"
        }
    });
    const body = await result.body;
    body.pipe(res);
  };