const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const adminEmail = functions.config().admin.email;

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

const adminContents = data => {
  return `以下内容でコーポレートサイトよりお問い合わせを受けました。

お名前（姓名）：
${data.name}

お名前（ふりがな）：
${data.furigana}

社名：
${data.corp}

メールアドレス：
${data.email}

郵便番号：
${data.zip}

住所：
${data.address}

電話番号：
${data.tel}

どの製品について：
${data.pkg}

お問い合わせ件名：
${data.subject}

お問い合わせ内容：
${data.contents}

個人情報の保持の同意：
${data.approval}
`;
};

exports.sendMail = functions.https.onCall((data, context) => {
  const adminMail = {
    from: gmailEmail,
    to: adminEmail,
    subject: 'vue-form-test よりお問い合わせ',
    text: adminContents(data)
  };

  mailTransport.sendMail(adminMail, (err, info) => {
    if (err) {
      return console.error(`send failed. ${err}`);
    }
    return console.log('send success.');
  });
});
