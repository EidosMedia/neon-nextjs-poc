export default async (req, res) => {
    const url = encodeURI(decodeURIComponent(req.query.url));
    const previewToken = url.substring(url.indexOf('token=')+6)
    console.log(url)
    const result = await fetch(url, {
        headers: {
            'Cookie':"emk.previewDefaultContent=false; emk.previewToken="+previewToken+";"
        }
    });
    console.log(result)
    const body = result.body;
    console.log(body)
    body.pipe(res);
  };