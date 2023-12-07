import BasicNewsletter from "../../components/Newsletter/BasicNewsletter";
import * as ReactDOMServer from "react-dom/server";
import axios from "axios";
import RenderContentElement from "../../components/RenderContent/RenderContentElement";
import { findElementsInContentJson } from "../../utils/ContentUtil";

export async function sendgridCreateSingleSend(listId, neonData) {
  let result = null;

  let template = <BasicNewsletter neonData={neonData} />;
  template = ReactDOMServer.renderToString(template).replaceAll("&quot;", '"');

  let subject = null;
  try {
    subject = neonData.object.data.title;
  } catch (e) {}

  let listIds = [];
  listIds.push(listId);

  try {
    const options = {
      method: "POST",
      url: process.env.SENDGRID_BASE_URL + "v3/marketing/singlesends",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      data: {
        name: subject.substring(0, 90),
        send_to: {
          list_ids: listIds,
        },
        email_config: {
          subject: subject,
          html_content: template,
          sender_id: 3780603,
          suppression_group_id: 17849,
        },
      },
    };

    const response = await axios.request(options);
    result = response.data;
  } catch (e) {
    console.log(e.response.data);
  }
  return result;
}

export async function sendgridUpdateSingleSend(newsletterId, listId, neonData) {
  let result = null;

  let template = <BasicNewsletter neonData={neonData} />;
  template = ReactDOMServer.renderToString(template).replaceAll("&quot;", '"');

  let subject = null;
  try {
    subject = neonData.object.data.title;
  } catch (e) {}

  let listIds = [];
  listIds.push(listId);

  try {
    const options = {
      method: "PATCH",
      url:
        process.env.SENDGRID_BASE_URL +
        "v3/marketing/singlesends/" +
        newsletterId,
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      data: {
        name: subject.substring(0, 90),
        send_to: {
          list_ids: listIds,
        },
        email_config: {
          subject: subject,
          html_content: template,
          sender_id: 3780603,
          suppression_group_id: 17849,
        },
      },
    };

    const response = await axios.request(options);
    result = response.data;
  } catch (e) {
    console.log(e.response.data);
  }
  return result;
}

export async function sendgridSendSingleSend(newsletterId) {
  let result = null;
  try {
    const options = {
      method: "PUT",
      url:
        process.env.SENDGRID_BASE_URL +
        "v3/marketing/singlesends/" +
        newsletterId +
        "/schedule",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      data: {
        send_at: "now",
      },
    };

    const response = await axios.request(options);
    result = response.data;
  } catch (e) {
    console.log(e);
    console.log(e.response.data);
  }
  return result;
}

export async function sendgridTestSingleSend(newsletterId) {
  let result = null;
  let emails = [];
  emails.push("fvermaut@gmail.com");

  try {
    const options = {
      method: "POST",
      url: process.env.SENDGRID_BASE_URL + "v3/marketing/test/send_email",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      data: {
        template_id: newsletterId,
        sender_id: 3780603,
        emails: emails,
      },
    };

    const response = await axios.request(options);
    console.log(response.status);
    result = response.data;
  } catch (e) {
    console.log(e.response.data);
  }
  return result;
}

export async function sendgridGetSingleSend(newsletterId) {
  let result = null;

  try {
    const options = {
      method: "GET",
      url:
        process.env.SENDGRID_BASE_URL +
        "v3/marketing/singlesends/" +
        newsletterId,
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
    };

    const response = await axios.request(options);
    result = response.data;
  } catch (e) {
    console.log(e.response.data);
  }
  return result;
}

export async function sendGridGetRecipientLists() {
  let result = null;

  try {
    const options = {
      method: "GET",
      url: process.env.SENDGRID_BASE_URL + "v3/marketing/lists",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
    };

    const response = await axios.request(options);
    result = response.data;
  } catch (e) {
    console.log(e.response.data);
  }
  return result;
}
