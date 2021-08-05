<template>
  <div class="feedback">
    <form>
      <inputText
        label="Ваше имя"
        :field="email"
        @input="name = $event"
        :class="{ error: validationStatus($v.name) || this.errorMessage.name }"
        :error="
          (!$v.name.required && $v.name.$error ? 'Обязательное поле' : '') ||
          this.errorMessage.name
        "
      />
      <inputText
        label="E-mail"
        :field="email"
        @input="email = $event"
        :class="{
          error: validationStatus($v.email) || this.errorMessage.email,
        }"
        :error="
          (!$v.email.required && $v.email.$error
            ? 'Обязательное поле'
            : !$v.email.email && $v.email.$error
            ? 'Некорректный e-mail'
            : '') || this.errorMessage.email
        "
      />

      <textArea
        label="Сообщение"
        :field="message"
        @input="message = $event"
        :class="{
          error: validationStatus($v.message) || this.errorMessage.message,
        }"
        :error="
          (!$v.message.required && $v.message.$error
            ? 'Обязательное поле'
            : '') || this.errorMessage.message
        "
      />
      <div class="feedback__text">
        Персональные данные, отправленные через эту форму, будут использованы только для ответа на&nbsp;конкретный вопрос, а&nbsp;также в&nbsp;целях аналитики, и&nbsp;не&nbsp;будут использоватьсяв маркетинговых целях в&nbsp;соответствии с&nbsp;<a href='https://www.mars.com/privacy-policy-russia' target='_blank' class='_red'>Положением о&nbsp;конфиденциальности</a>.
      </div>
      <div class="feedback__checkbox_list">

        <checkBox
          label="Мне исполнилось 18 лет."
          :field="checkbox"
          :class="{
            error:
              validationStatus($v.checkbox) || this.errorMessage.checkbox,
          }"
          :error="this.errorMessage.checkbox"
          @input="checkbox = $event"
        />
      </div>
      <div class="feedback__footer">
        <button
          type="button"
          class="btn btn--primary loading"
          @click="submit()"
          :class="{ loading: submitStatus == 'PENDING' }"
        >
          Отправить<img src="../../assets/img/spinner.svg" alt="" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import inputText from "@/components/form/inputText.vue";
import checkBox from "@/components/form/checkBox.vue";
import textArea from "@/components/form/textArea.vue";

import { required, email, sameAs } from "vuelidate/lib/validators";
const rus = (value) => /^[А-ЯЁа-яё ]+$/.test(value);

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  name: "FeedbackForm",
  data() {
    return {
      ready: false,

      name: null,
      email: null,
      message: null,
      checkbox: false,
      checkbox3: false,
      errorMessage: {
        email: null,
        name: null,
        message: null,
      },

      submitStatus: null,

      chosenFileName: {},
    };
  },

  validations: {
    message: { required },
    email: { required, email },
    name: { required, rus },
    checkbox: {
      required,
      sameAs: sameAs(() => true),
    },

    checkbox3: {
      required,
      sameAs: sameAs(() => true),
    },
  },

  methods: {
    submitMedia(e) {
      let t = this;

      this.chosenFileName = e;

      if (this.chosenFileName.length) {
        getBase64(this.chosenFileName[0]).then(function (data) {
          t.attach = data;
        });
      }
    },
    deleteFile() {
      this.chosenFileName = {};
      this.attach = "";
    },

    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        email: null,
        name: null,
        message: null,
        captcha: null,
      };
    },

    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    submit() {
      this.$v.$touch();

      if (this.$v.$pendding || this.$v.$error) return;

      if (this.submitStatus !== "PENDING") {
        this.submitStatus = "PENDING";

        this.$store
          .dispatch("SendFeedback", {
            name: this.name,
            email: this.email,
            message: this.message,
          })
          .then((r) => {
            if (r.error !== 0) {
              this.submitStatus = null;

              this.$refs.recaptcha.reset();
              this.captcha = null;

              let fieldsError = null;

              if (r.message && r.message.email) {
                [this.errorMessage.email] = r.message.email;
                fieldsError = true;
              } else if (r.message && r.message.login) {
                [this.errorMessage.email] = r.message.login;
                fieldsError = true;
              }

              if (r.message && r.message.name) {
                [this.errorMessage.name] = r.message.name;
                fieldsError = true;
              }

              if (r.message && r.message.text) {
                [this.errorMessage.message] = r.message.text;
                fieldsError = r.message;
              }
            } else {
              this.submitStatus = null;

              this.$modal.hide("feedback");
              this.$modal.show("success_feedback");
            }
          })
          .catch(() => {
            this.submitStatus = null;
          });
      }
    },
  },
  mounted() {},
  components: {
    inputText,
    textArea,
    checkBox,
  },
};
</script>

<style lang="scss">
.feedback {
  max-width: rem(360px);
  margin: auto;
  .form-checkbox__caption {
    margin-left: rem(18px);
  }
  &__text {
    margin-bottom: rem(20px);
    padding-right: rem(10px);
    font-size: rem(12px);
  }
  &__checkbox_list {
    margin-bottom: rem(30px);
  }
}
</style>
