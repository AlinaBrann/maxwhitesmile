<template>
  <div class="feedback-form">
    <form>
      <label
        class="form__field form__field--grey"
        :class="{
          error: validationStatus($v.name) || errorMessage.name,
        }"
      >
        <div class="form__caption">Имя</div>
        <input
          type="text"
          placeholder="Ваше имя"
          class="form__field-input form__field-input--md"
          v-model.trim="name"
          @focus="errorReset"
        />
        <div
          class="error-hint"
          v-if="errorMessage.name"
          v-html="
            (!$v.name.required && $v.name.$error
              ? 'Обязательное поле'
              : !$v.name.rus && $v.name.$error
              ? 'Введите текст на русском языке'
              : '') || this.errorMessage.name
          "
        ></div>
      </label>
      <label
        class="form__field form__field--grey"
        :class="{
          error: validationStatus($v.email) || errorMessage.email,
        }"
      >
        <div class="form__caption">Адресс эл. почты</div>
        <input
          type="email"
          placeholder="Email"
          class="form__field-input form__field-input--md"
          v-model.trim="email"
          @focus="errorReset"
        />
        <div
          class="error-hint"
          v-if="errorMessage.email"
          v-html="
            (!$v.email.required && $v.email.$error
              ? 'Обязательное поле'
              : '') || this.errorMessage.email
          "
        ></div>
      </label>
      <label
        class="form__field form__field--grey"
        :class="{
          error: validationStatus($v.phone) || errorMessage.phone,
        }"
      >
        <div class="form__caption">Номер телефона</div>
        <input
          type="tel"
          v-mask="'+7(###) ###-##-##'"
          placeholder="+7 (xxx)xxx-xx-xx"
          class="form__field-input form__field-input--md"
          v-model.trim="phone"
          @focus="errorReset"
        />
        <div
          class="error-hint"
          v-if="errorMessage.phone"
          v-html="
            (!$v.phone.required && $v.phone.$error
            ? 'Обязательное поле'
            : !$v.phone.minLength && $v.phone.$error
            ? 'Минимум ' + $v.phone.$params.minLength.min + ' символов'
            : '') || this.errorMessage.phone
          "
        ></div>
      </label>
      <label
        class="form__field form-textarea"
        :class="{
          error: validationStatus($v.message) || errorMessage.message,
        }"
      >
        <div class="form__caption">Сообщение</div>
        <textarea
          class="form__field-textarea"
          v-model.trim="message"
          @focus="errorReset"
        >
        </textarea>
        <div
          class="error-hint"
          v-if="errorMessage.message"
          v-html="
            (!$v.message.required && $v.message.$error
              ? 'Обязательное поле'
              : '') || this.errorMessage.message
          "
        ></div>
      </label>
      
      <div class="feedback__text">
        Персональные данные, отправленные через эту форму, будут использованы
        только для ответа на&nbsp;конкретный вопрос, а&nbsp;также в&nbsp;целях
        аналитики, и&nbsp;не&nbsp;будут использоватьсяв маркетинговых целях
        в&nbsp;соответствии с&nbsp;<a
          href="https://www.mars.com/privacy-policy-russia"
          target="_blank"
          class="_red"
          >Положением о&nbsp;конфиденциальности</a
        >.
      </div>
      <div class="feedback__checkbox_list">
        <label 
          class="form-checkbox"
          :class="{
            error: validationStatus($v.checkbox) || this.errorMessage.checkbox,
          }"
        >
          <input
            type="checkbox"
            class="form-checkbox__input"
            v-model.trim="checkbox"
          />
          <div class="form-checkbox__custom"></div>
          <div class="form-checkbox__caption">Мне исполнилось 18 лет.</div>
        </label>
        
      </div>
      <div class="feedback__footer">
        <button
          type="button"
          class="btn btn--primary"
          @click="submit()"
          :class="{ loading: submitStatus == 'PENDING' }"
        >
          Отправить<img src="../../assets/img/spinner.svg" alt="" />
        </button>
        <button class="btn btn--primary" type="button" @click.prevent="fieldsReset()">Сбросить</button>
      </div>
    </form>
  </div>
</template>

<script>

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
      phone: null,
      name: null,
      email: null,
      message: null,
      checkbox: false,
      errorMessage: {
        email: null,
        name: null,
        phone: null,
        message: null,
      },

      submitStatus: null,

      chosenFileName: {},
    };
  },

  validations: {
    message: { required },
    phone: { required },
    email: { required, email },
    name: { required, rus },
    checkbox: {
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
    fieldsReset() {
      this.name = null;
      this.email = null;
      this.message = null;
      this.checkbox = false;
      this.phone = null;
      this.submitStatus = null;
      this.errorReset();
      console.log(this.checkbox);
    },
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        email: null,
        name: null,
        phone: null,
        message: null,
        captcha: null,
      };
    },

    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    submit() {
      console.log("submit");
      this.$v.$touch();

      if (this.$v.$pendding || this.$v.$error) return;

      if (this.submitStatus !== "PENDING") {
        this.submitStatus = "PENDING";

        this.$store
          .dispatch("SendFeedback", {
            name: this.name,
            email: this.email,
            phone: this.phone,
            text: this.message,
          })
          .then((r) => {
            console.log(r);
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

              if (r.message && r.message.phone) {
                [this.errorMessage.phone] = r.message.phone;
                fieldsError = true;
              }

              if (r.message && r.message.text) {
                [this.errorMessage.message] = r.message.text;
                fieldsError = r.message;
              }
            } else {
              this.submitStatus = null;

              this.fieldsReset();
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
  },
};
</script>

<style lang="scss">
.feedback {
  &-form {
    padding: 0 rem(12px) rem(20px);
  }
  &__footer {
    display: flex;
    flex-direction: column;
    .btn:first-of-type {
      margin-bottom: rem(20px);
    }
  }
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
  @media (min-width: $sm) {
    &__footer {
      flex-direction: row;
      justify-content: space-between;
      .btn {
        margin-bottom: 0;
      }
    }
  }
  @media (min-width: $md) {
    &-form {
      padding: 0;
    }
  }
}
</style>
