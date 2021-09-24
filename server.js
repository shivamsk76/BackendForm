const express = require("express");
const registration = require("./routes/Admission");
const cors = require("cors");
const btoa = require("btoa");

// const dbConfig = require('./config/config')
const ingestDataAddress = process.env.ALLOWEDADDRESS;

var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors({ origin: "*" }));

// dbConfig.authenticate().then(() => {
//     console.log("database connected")
// }).catch(err => console.log('Error: ' + err))

app.post("/registration", registration);

app.post("/chatapi", (req, res) => {
  res.send(200);
});

const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: "shivamti7692@gmail.com",
      pass: "7692833267s",
    },
  })
);

app.post("/sendemail", (req, res) => {
  const { data, name, statement, to, rating } = req.body;
  console.log(req.body);

  // require("fs").writeFile(
  //   "./images/shivam.png",
  //   base64Data,
  //   "base64",
  //   function (err) {
  //     console.log(err);
  //   }
  // );

  var mailOptions1 = {
    from: "shivamti7692@gmail.com",
    to: to,
    attachments: [
      {
        filename: "image.png",
        path: data,
      },
    ],

    subject: "Feedback from WYNCAREER",
    html: `<body style="font-family: sans-serif;
        background-color: #d8dbdb;
        font-size: 18px;
        max-width: 700px;
        margin: 0 auto;
        padding: 2%;
        color: #565859;
        ">
        <div style="border-width: 5px; border: black;">

    <p>Dear ${name} ,</p>
    I hope you feel more confident about your upcoming interviews.Here is the feed back on your latest mock-interview with me.
    <p>Total Rating : ${rating}</p>
    <p>1. ${statement.paceStatements}</p>
    <p>2. ${statement.totalStatement}</p>
    <p>3. ${statement.fillerStatement}</p>
    <p>4. ${statement.intentStatement}</p>

    <p>Please work on the feedback, and PRACTICE speaking with me again whenever you are ready at <a href="https://www.wyncareer.com/tina-your-interview-coach">www.wyncareer.com/tina-your-interview-coach</a></p>.

    <p> If you have any questions or feedback, you can reply to me on this email,and I'll be happy to help you .</p>

    <div style="margin-top: -5px;"></div>
            <h4>Warmly,</h4>
            <p class="contact">
            Tina, your interview coach

            </p>
            </div>

    </div>

        </body>`,
  };

  transporter.sendMail(mailOptions1, async function (error, info) {
    if (error) {
      console.log("error is here");
      console.log(error);
      res.send({
        success: false,
        msg: "Something went wrong while sending Email, please try after some time",
      });
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("App is running on port " + port);
});
