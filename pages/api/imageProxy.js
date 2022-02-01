import axios from "axios";

export default async (req, res) => {
    const url = decodeURIComponent(req.query.url);
    const emauth = url.substring(url.indexOf('emauth=')+7,url.indexOf('&'))
    const previewToken = url.substring(url.indexOf('token=')+6)

    const result = await fetch(url, {
        headers: {
            'Cookie':"emk.previewDefaultContent=false; emk.previewToken="+previewToken+"; emauth="+emauth
        }
    });
    const body = await result.body;
    body.pipe(res);
  };