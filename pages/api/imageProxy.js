export default async (req, res) => {
    console.log("HERE1")
    const url = encodeURI(decodeURIComponent(req.query.url));
    const previewToken = url.substring(url.indexOf('token=')+6)

    const result = await fetch(url, {
        headers: {
            'Cookie':"emk.previewDefaultContent=false; emk.previewToken="+previewToken+";"
        }
    });
    const body = await result.body;
    console.log("HERE")
    console.log(body)
    body.pipe(res);
  };