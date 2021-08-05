<template>
  <form class="authorization__signin">
    <div class="authorization__signin-fields">
      <inputText
        label="E-mail"
        size="md"
        placeholder="e-mail"
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
      <inputText
        size="md"
        label="Пароль"
        type="password"
        placeholder="Пароль"
        :field="password"
        :class="{
          error: validationStatus($v.password) || this.errorMessage.password,
        }"
        :error="
          (!$v.password.required && $v.password.$error
            ? 'Обязательное поле'
            : !$v.password.minLength && $v.password.$error
            ? 'Минимум ' + $v.password.$params.minLength.min + ' символов'
            : '') || this.errorMessage.password
        "
        @input="password = $event"
      />
      <a
        href="javascript:void(0)"
        class="forget-link"
        @click.prevent="switchToRecover()"
        >Забыли пароль?</a
      >
      <div
        class="captcha"
        :class="{
          error: validationStatus($v.captcha) || this.errorMessage.captcha,
        }"
      >
        <vue-recaptcha
          ref="recaptcha"
          size="270px"
          :loadRecaptchaScript="true"
          sitekey="6LcZvb0UAAAAAGWachHAtQkfEN1WtATm-nSiVDgJ"
          @verify="onVerify"
          @expired="onCaptchaExpired"
        />
        <div class="error-hint" v-if="errorMessage.captcha">
          {{ errorMessage.captcha }}
        </div>
      </div>

      <div class="authorization__signin-footer">
        <button
          type="button"
          class="btn btn--primary"
          @click="submit()"
          :class="{ loading: submitStatus == 'PENDING' }"
        >
          Войти<img src="../../assets/img/spinner.svg" alt="" />
        </button>
        <div class="modal__another-option">
          <p>Нет учётной записи?</p>
          <a href="#" @click="showSignUpModal()">Зарегистрироваться</a>
        </div>
        <div class="authorization__social">
          <div class="authorization__social-list">
            <a
              href="https://korkunov.emlsdr.ru/backend/site/eauth?service=vkontakte"
              class="authorization__social-item authorization__social-item--vk"
              target="_blank"
            >
              <img src="../../assets/images/vk.svg" alt="" />
            </a>
            <a
              href="https://korkunov.emlsdr.ru/backend/site/eauth?service=facebook"
              class="authorization__social-item authorization__social-item--fb"
              target="_blank"
            >
              <img src="../../assets/images/facebook.svg" alt="" />
            </a>
          </div>
          <div class="authorization__social-caption">
            Вход через социальные сети. Доступ&nbsp;только после регистрации
            в&nbsp;личном кабинете.
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import inputText from "@/components/form/inputText.vue";
import VueRecaptcha from "vue-recaptcha";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "LoginForm",
  data() {
    return {
      ready: false,
      captcha: null,
      email: null,
      password: null,

      errorMessage: {
        email: null,
        password: null,
        captcha: null,
      },

      submitStatus: null,
    };
  },

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    captcha: { required },
  },

  methods: {
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        email: null,
        password: null,
        captcha: null,
      };
    },

    close() {
      this.$store.commit("SHOW_POPUP_CONTENT", false);
    },
    switchToRecover() {
      this.$modal.hide("authorization");
      this.$modal.show("recover");
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
          .dispatch("SignIn", {
            login: this.email,
            password: this.password,
            "g-recaptcha-response": this.captcha,
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

              if (r.message && r.message.password) {
                [this.errorMessage.password] = r.message.password;
                fieldsError = true;
              }

              if (r.message && r.message.recaptcha) {
                [this.errorMessage.captcha] = r.message.recaptcha;
                fieldsError = true;
              }

              if (r.message && !fieldsError) {
                this.$modal.show("common_error", {
                  text: "Что-то пошло не так! " + r.message,
                });
              }
            } else {
              this.submitStatus = null;

              this.$store.commit("SET_TOKEN", r.auth_key);

              this.$store.dispatch("GetProfile").then((res) => {
                if (res.error !== 0) {
                  this.$router.push("/");
                } else {
                  this.$root.$emit("onLogined");
                  this.$modal.hide("authorization");
                  this.$router.push("/account");
                }
              });
            }
          })
          .catch(() => {
            this.submitStatus = null;
          });
      }
    },
    showSignUpModal() {
      this.$modal.hide("authorization");
      this.$modal.show("signup");
    },
    onVerify(response) {
      this.captcha = response;
    },

    onCaptchaExpired() {
      this.captcha = null;
    },
  },
  mounted() {},
  components: {
    inputText,
    VueRecaptcha,
  },
};
</script>

<style lang="scss" scoped>
.authorization {
  h3 {
    text-align: center;
    margin-top: 8px;
  }

  &__signin {
    max-width: rem(270px);
    margin: auto;
    &-fields {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &-footer {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .btn {
      min-width: rem(200px);
    }
    .forget-link {
      margin-top: rem(-10px);
      margin-bottom: rem(20px);
      font-size: rem(14px);
      color: $red_font;
      text-decoration-line: underline;
      text-transform: none;
      align-self: flex-end;
    }

    .forget-link:hover {
      text-decoration: none;
    }
  }

  &__social {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }

  &__social-caption {
    text-align: center;
    font-size: rem(14px);
    line-height: rem(17px);
  }

  &__social-list {
    display: flex;
    margin-bottom: rem(15px);
  }

  &__social-item {
    width: rem(37px);
    height: rem(37px);
    margin: 0 rem(9px);
  }

  @media (min-width: $md) {
  }
}
</style>
