const Mail = require("../services/Mail");

class PurchaseMail {
  get key() {
    return "PurchaseMail";
  }

  async handle(job, done) {
    const { ad, content, user } = job.data;

    await Mail.sendMail({
      from: '"Edilmar Santos Nascimento" <support@support.com.br>',
      to: ad.author.email,
      subject: `Solicitação de compra: ${ad.title}`,
      template: "purchase",
      context: { user, content, ad }
    });

    return done();
  }
}

module.exports = new PurchaseMail();
