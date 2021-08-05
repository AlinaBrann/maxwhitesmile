<template>
  <form class="recover">
    <div class="modal__text">Введите ваш e-mail адрес</div>
    <inputText
      size="md"
      placeholder="Введите ваш e-mail"
      :field="email"
      @input="email = $event"
      :class="{ error: validationStatus($v.email) || this.errorMessage.email }"
      :error="this.errorMessage.email"
    />

    <div class="recover__signin-footer">
      <button
        type="button"
        class="btn btn--primary"
        @click="submit()"
        :class="{ loading: submitStatus == 'PENDING' }"
      >
        Восстановить<img src="../../assets/img/spinner.svg" alt="" />
      </button>
    </div>
  </form>
</template>

<script>
import inputText from "@/components/form/inputText.vue";

import { required, email } from "vuelidate/lib/validators";

export default {
  name: "RecoverForm",
  data() {
    return {
      ready: false,

      email: null,

      errorMessage: {
        email: null,
      },

      submitStatus: null,
    };
  },

  validations: {
    email: { required, email },
  },

  methods: {
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        email: null,
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
          .dispatch("Recover", {
            email: this.email,
          })
          .then((r) => {
            if (r.error !== 0) {
              this.submitStatus = null;

              this.$refs.recaptcha.reset();

              let fieldsError = null;

              if (r.message && r.message.email) {
                [this.errorMessage.email] = r.message.email;
                fieldsError = true;
              } else if (r.message && r.message.login) {
                [this.errorMessage.email] = r.message.login;
                fieldsError = true;
              }

              if (r.message && !fieldsError) {
                this.$modal.show("common_error", {
                  text: "Что-то пошло не так! " + r.message,
                });
              }
            } else {
              this.submitStatus = null;

              this.$modal.hide("recover");
              this.$modal.show("success_recover");
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
  },
};
</script>

<style lang="scss">
.recover {
  margin: auto;

  &__signup-footer {
    margin-top: 30px;
    text-align: center;
  }
  .btn {
    min-width: rem(200px);
  }
  @media (max-width: 650px) {
    max-width: 100%;
    &__signin {
      max-width: none;
      padding: 30px 20px;
      margin: 30px -30px 0;

      .form__field-input {
        width: 100%;
        margin-top: 15px;
      }
    }
    &__social {
      flex-direction: column;
      padding: 30px 20px;
      margin: 0 -30px 40px;
    }

    &__social-caption {
      margin-bottom: 15px;
    }

    &__social-item:first-child {
      margin-left: 0;
    }

    &__signup-row {
      flex-direction: column;
      margin: 0 -52px;
    }

    &__signup-column {
      width: 100%;
    }
  }
}
</style>

<style>
.captcha {
  width: 100%;
  overflow: hidden;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.captcha.error {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
</style>
