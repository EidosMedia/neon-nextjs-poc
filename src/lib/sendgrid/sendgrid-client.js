import BasicNewsletter from "../../components/Newsletter/BasicNewsletter";
import * as ReactDOMServer from 'react-dom/server';
import axios from "axios";

export async function sendgridCreateSingleSend() {
    let result = null;

    let template = (<BasicNewsletter/>)
    template = ReactDOMServer.renderToString(template)

    console.log(template)

    try {
        const options = {
            method: 'POST',
            url: process.env.SENDGRID_BASE_URL + 'v3/marketing/singlesends',
            mode: 'no-cors',
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            },
            data: {
                name: `'name_test'`,
                send_to: {
                    list_ids: ['fdfb87ee-7326-4f07-8cf3-31c31bda6e4a'],
                },
                email_config: {
                    subject: `'subject_test`,
                    html_content: template,
                    sender_id: 3780603,
                    suppression_group_id: 17849,
                },
            },
        };

        const response = await axios.request(options)
        result = response.data
    }
    catch (e) {
        console.log(e)
    }
    return result;
}

export async function sendGridGetRecipientLists(){
    let result = null;

    try {
        const options = {
            method: 'GET',
            url: process.env.SENDGRID_BASE_URL + 'v3/marketing/lists',
            mode: 'no-cors',
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            },
        };

        const response = await axios.request(options)
        result = response.data
    }
    catch (e) {
        console.log(e)
    }
    return result;
}