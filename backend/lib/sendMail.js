import FormData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(FormData);
const sandbox = "sandbox4772d961c0324582bf788c1be8b528d7.mailgun.org";

const defaultOptions = {
  to: ["test@test.de"],
  subject: "Hello",
  html: "<h1>Testing some Mailgun awesomeness!</h1>",
};

let mg;

export const sendMail = ({ to, subject, html } = defaultOptions) => {
  if (!mg) {
    mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY,
    });
  }

  return mg.messages.create(sandbox, {
    from: `Excited User <mailgun@${sandbox}>`,
    to: to,
    subject: subject,
    html: html,
  });
};
