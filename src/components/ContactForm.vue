<template>
  <div>
    <v-card>
      <v-container>
        <h1 class="contact__title">お問い合わせ</h1>
        <v-form ref="form" v-model="contactFormValidation.valid" lazy-validation>
          <v-text-field
            v-model="contactForm.name"
            :rules="contactFormValidation.nameRules"
            ref="name"
            label="お名前（姓名）"
            required
          ></v-text-field>
          <v-text-field
            v-model="contactForm.furigana"
            :rules="contactFormValidation.furiganaRules"
            ref="furigana"
            label="お名前（ふりがな）"
            required
          ></v-text-field>
          <v-text-field v-model="contactForm.corp" ref="corp" label="社名"></v-text-field>
          <v-text-field
            v-model="contactForm.email"
            :rules="contactFormValidation.emailRules"
            ref="email"
            label="メールアドレス"
            required
          ></v-text-field>
          <v-text-field v-model="contactForm.zip" mask="###-####" ref="zip" label="郵便番号"></v-text-field>
          <v-text-field v-model="contactForm.address" ref="address" label="住所"></v-text-field>
          <v-text-field
            v-model="contactForm.tel"
            :rules="contactFormValidation.telRules"
            ref="tel"
            mask="###########"
            label="電話番号（ハイフンなし）"
          ></v-text-field>
          <v-radio-group v-model="contactForm.pkg" ref="pkg" label="どの製品について">
            <v-radio label="Aサービスについて" value="service-a"/>
            <v-radio label="Bサービスについて" value="service-b"/>
            <v-radio label="Cサービスについて" value="service-c"/>
            <v-radio label="その他" value="other"/>
          </v-radio-group>
          <v-text-field
            v-model="contactForm.subject"
            :rules="contactFormValidation.subjectRules"
            ref="subject"
            label="お問い合わせ件名"
            required
          ></v-text-field>
          <v-textarea
            v-model="contactForm.contents"
            :rules="contactFormValidation.contentsRules"
            ref="contents"
            label="お問い合わせ内容"
            required
          ></v-textarea>
          <section v-if="speech.enable">
            <h4 class="contact__subtitle">Chrome (PC / Android) のみ</h4>
            <p v-if="speech.activated">activated</p>
            <v-btn v-if="!speech.activated" @click="startRec()" :disabled="speech.enabled">音声入力開始</v-btn>
            <v-btn v-else @click="stopRec()">音声入力停止</v-btn>
            <v-checkbox v-model="speech.enableTimeStamp" label="timeStamp を付与する"></v-checkbox>
          </section>
          <div class="privacy-notes">
            <section class="privacy-notes__inner">
              <h4 class="privacy-notes__title">個人情報の取り扱いについて</h4>
              <section class="privacy-notes__section">
                <h5 class="privacy-notes__subtitle">【個人情報の利用目的】</h5>
                <p>当社は、下記の目的で個人情報を利用いたします。</p>
                <ol>
                  <li>問合せへの回答</li>
                  <li>資料送付</li>
                  <li>選考手続き</li>
                  <li>面接手続き</li>
                </ol>
              </section>
              <section class="privacy-notes__section">
                <h5 class="privacy-notes__subtitle">【個人情報の第三者への提供について】</h5>
                <p>当社は、下記の場合を除いて個人情報を第三者に提供することはありません。</p>
                <ol>
                  <li>本人の同意がある場合</li>
                  <li>法令に基づく場合</li>
                  <li>個人情報の保護に関する法律及びJISQ：15001によって認められている場合</li>
                </ol>
                <p>（この場合においても、適切な社内手続を経て行います）</p>
              </section>
              <section class="privacy-notes__section">
                <h5 class="privacy-notes__subtitle">【個人情報の取扱いを委託する場合】</h5>
                <p>当社は、利用目的の達成に必要な範囲内において個人情報の取扱いを第三者に委託する場合があります。この場合、法令及び当社の基準に従って委託先を選定し、機密保持契約を締結します。委託先に対しては個人情報の適切な取扱いを監督指導します。</p>
              </section>
              <section class="privacy-notes__section">
                <h5 class="privacy-notes__subtitle">【個人情報の開示等の請求について】</h5>
                <p>当社は、開示対象個人情報の「利用目的の通知」「開示」「訂正、追加、削除」「利用又は提供の拒否」の請求に応じております。</p>
                <p>上記事項を請求される場合は、当社「個人情報窓口」までお知らせください。</p>
              </section>
              <section class="privacy-notes__section">
                <h5 class="privacy-notes__subtitle">【個人情報提供の任意性及びその結果について】</h5>
                <p>当社に対して個人情報を提供する否かの判断は本人の任意です。ただし、提供頂けない個人情報の種類によっては、【個人情報の利用目的】に記載した業務ができない場合があります。</p>
              </section>
              <section class="privacy-notes__section">
                <h5 class="privacy-notes__subtitle">【個人情報に関するお問合せ先】</h5>
                <p>「開示等のご請求」「苦情・お問合せ」「個人情報保護方針」に関するお問合せは下記の窓口にお願いします。</p>
              </section>
              <section class="privacy-notes__section">
                <h5 class="privacy-notes__subtitle">【個人情報に関するお問合せ先】</h5>
                <p>
                  〒000-0000 東京都千代田区霞が関1丁目1−1
                  <br>株式会社 仕様「個人情報窓口」
                  <br>TEL: 00-0000-0000
                  <br>個人情報保護管理者：仕様 太郎
                </p>
              </section>
            </section>
          </div>
          <v-checkbox
            v-model="contactForm.approval"
            :rules="contactFormValidation.approvalRules"
            ref="approval"
            label="上記、個人情報に関する取扱いに同意する"
            required
          ></v-checkbox>
          <v-btn
            :loading="contactForm.loading"
            :disabled="!contactFormValidation.valid"
            @click="sendMail()"
            block
            large
            color="info"
            class="mt-4 font-weight-bold"
          >送信</v-btn>
        </v-form>
        <v-btn @click="showConsole()">showConsole</v-btn>
      </v-container>
    </v-card>
    <v-snackbar
      v-model="snackBar.show"
      :color="snackBar.color"
      bottom
      right
      :timeout="6000"
      class="font-weight-bold"
    >{{snackBar.message}}</v-snackbar>
  </div>
</template>

<script>
/* eslint-disable */
import { functions } from '@/plugins/firebase';

export default {
  data: () => ({
    contactForm: {
      name: '',
      furigana: '',
      corp: '',
      email: '',
      zip: '',
      address: '',
      tel: '',
      pkg: '',
      subject: '',
      contents: '',
      approval: false,
      loading: false
    },
    contactFormValidation: {
      valid: false,
      nameRules: [v => !!v || 'お名前（姓名）は必須項目です'],
      furiganaRules: [v => !!v || 'お名前（ふりがな）は必須項目です'],
      emailRules: [
        v => !!v || 'メールアドレスは必須項目です',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'メールアドレスを入力してください'
      ],
      subjectRules: [v => !!v || '件名は必須項目です'],
      contentsRules: [v => !!v || '内容は必須項目です'],
      approvalRules: [v => !!v || '']
    },
    snackBar: {
      show: false,
      color: '',
      message: ''
    },
    speech: {
      enable: false,
      activated: false,
      enableTimeStamp: false,
      speechstartTimeStamp: '',
      stopPhrase: '入力完了'
    }
  }),
  mounted: function() {
    // SpeechRecognition 判定
    if (!window.SpeechRecognition) {
      window.SpeechRecognition =
        window.webkitSpeechRecognition || window.mozSpeechRecognition;
    }
    this.speech.enable = !!window.SpeechRecognition;
  },
  methods: {
    // フォーム送信
    sendMail: function() {
      if (this.$refs.form.validate()) {
        this.contactForm.loading = true;
        const mailer = functions.httpsCallable('sendMail');

        mailer(this.contactForm)
          .then(() => {
            this.formReset();
            this.showSnackBar(
              'success',
              '送信しました'
            );
          })
          .catch(err => {
            this.showSnackBar(
              'error',
              '送信に失敗しました'
            );
            console.error(err);
          })
          .finally(() => {
            this.contactForm.loading = false;
          });
      }
    },
    // 音声入力開始
    startRec: function() {
      if (!this.speech.enable) {
        this.showSnackBar('error', 'SpeechRecognition is not available');
        console.log('SpeechRecognition is not available');
        return;
      }

      const speechRecognition = new window.webkitSpeechRecognition();
      this.speech.activated = true;
      this.showSnackBar('success', '音声入力開始');
      speechRecognition.start();
      console.log('speechRecognition.start()', speechRecognition);

      const stopListening = () => {
        this.speech.activated = false;
        speechRecognition.stop();
        this.showSnackBar('error', '音声入力終了');
      };

      const convertMsToSec = ms => {
        const h = String(Math.floor(ms / 3600000) + 100).substring(1);
        const m = String(Math.floor((ms - h * 3600000) / 60000) + 100).substring(1);
        const s = String(
          Math.round((ms - h * 3600000 - m * 60000) / 1000) + 100
        ).substring(1);
        return h + ':' + m + ':' + s;
      };

      const getRecognizedText = event => {
        const text = event.results[0][0].transcript;
        return text;
      }

      speechRecognition.addEventListener('error', event => {
        const message = event.message || String(event.error);
        console.error(message);
        stopListening();
      });

      speechRecognition.addEventListener('speechstart', event => {
        console.log('SpeechRecognition: onspeechstart');
        this.speech.speechstartTimeStamp = event.timeStamp;
      });

      speechRecognition.addEventListener('result', event => {
        console.log('SpeechRecognition: onresult', event);
        const text = getRecognizedText(event);
        console.log(text);
        if (text === this.speech.stopPhrase) {
          stopListening();
        } else {
          const speechstartTimeStampSec = this.speech.enableTimeStamp
            ? convertMsToSec(this.speech.speechstartTimeStamp)
            : '';
          this.contactForm.contents += `${speechstartTimeStampSec} ${text}\n`;
        }
      });

      speechRecognition.addEventListener('end', () => {
        console.log('SpeechRecogintion: end');
        if (this.speech.activated && !this.speech.errorMessage) {
          speechRecognition.start();
        }
      });
    },
    // 音声入力停止
    stopRec: function() {
      this.speech.activated = false;
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.stop();
      this.showSnackBar('error', '音声入力終了');
    },
    // console.table(formData)
    showConsole: function() {
      function formData(
        name,
        furigana,
        corp,
        email,
        zip,
        address,
        tel,
        pkg,
        subject,
        contents,
        approval
      ) {
        this.name = name;
        this.furigana = furigana;
        this.corp = corp;
        this.email = email;
        this.zip = zip;
        this.address = address;
        this.tel = tel;
        this.pkg = pkg;
        this.subject = subject;
        this.contents = contents;
        this.approval = approval;
      }

      const fData = new formData(
        this.$refs.name.value,
        this.$refs.furigana.value,
        this.$refs.corp.value,
        this.$refs.email.value,
        this.$refs.zip.value,
        this.$refs.address.value,
        this.$refs.tel.value,
        this.$refs.pkg.value,
        this.$refs.subject.value,
        this.$refs.contents.value,
        this.contactForm.approval
      );

      console.table(fData);
    },
    showSnackBar: function(color, message) {
      this.snackBar.message = message;
      this.snackBar.color = color;
      this.snackBar.show = true;
    },
    formReset: function() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style>
.contact__title {
  color: #4a4a4a;
  margin-bottom: 32px;
}
.contact__subtitle,
.privacy-notes {
  color: rgba(0, 0, 0, 0.54);
}
.privacy-notes {
  margin-top: 16px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.42);
  border-radius: 8px;
  text-align: left;
}
.privacy-notes__inner {
  height: 200px;
  overflow-y: auto;
}
.privacy-notes__title {
  margin-bottom: 0.8em;
}
.privacy-notes__section {
  margin-bottom: 1em;
}
.privacy-notes__subtitle {
  font-size: 1em;
  margin-bottom: 0.5em;
}
.privacy-notes__inner ol {
  padding-left: 2em;
}
.privacy-notes__inner p,
.privacy-notes__inner li {
  margin-bottom: 0.5em;
  font-size: 0.85rem;
}
.privacy-notes__inner p {
  line-height: 1.6;
}
</style>
