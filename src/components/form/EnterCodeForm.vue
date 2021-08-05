<template>
  <div>
    <form @submit.prevent="submitSendCode()">
      <input type="hidden" name="phone" v-model="phoneNumber" />
      <inputText
        placeholder="****"
        :field="code"
        @input="code = $event"
        :class="{
          error: validationStatus($v.email) || this.errorMessage.email,
        }"
        :error="
          (!$v.code.required && $v.code.$error
            ? 'Обязательное поле'
            : !$v.code.minLength && $v.code.$error
            ? 'Минимум ' + $v.code.$params.minLength.min + ' символов'
            : !$v.code.maxLength && $v.code.$error
            ? 'Максимум ' + $v.code.$params.maxLength.max + ' символов'
            : '') || this.errorMessage.email
        "
      />
      <button
        class="btn btn--primary"
        type="submit"
        :class="{ loading: submitStatus == 'PENDING' }"
      >
        Отправить
      </button>
    </form>
  </div>
</template>

<script>
import inputText from "@/components/form/inputText.vue";

import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  props: ["phone", "formData"],
  components: {
    inputText,
  },
  data() {
    return {
      ready: false,
      code: null,
      phoneNumber: this.phone,
      errorMessage: {
        phone: null,
        code: null,
      },

      submitStatus: null,
    };
  },
  validations: {
    phoneNumber: {
      required,
    },
    code: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(4),
    },
  },
  methods: {
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        phoneNumber: null,
        code: null,
      };
    },
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    submitSendCode() {
      console.log("submit");
      this.$v.$touch();

      if (this.$v.$pendding || this.$v.$error) return;

      if (this.submitStatus !== "PENDING") {
        this.submitStatus = "PENDING";

        this.$store
          .dispatch("SendCode", {
            phone: this.phoneNumber,
            code: this.code,
          })
          .then((r) => {
            console.log(r);
            if (r.error !== 0) {
              this.submitStatus = null;
              let fieldsError = null;
              if (r.message && r.message.phone) {
                [this.errorMessage.phoneNumber] = r.message.phone;
                fieldsError = true;
              }
              if (r.message && r.message.code) {
                [this.errorMessage.code] = r.message.code;
                fieldsError = true;
              }
            } else {
              this.submitStatus = null;

              this.$modal.hide("enter_code");
              this.$store
                .dispatch("SignUp", this.formData)
                .then((r) => {
                  console.log(r);
                  if (r.error !== 0) {
                    this.submitStatus = null;

                    let fieldsError = null;

                    if (r.message && r.message.phone) {
                      [this.errorMessage.phone] = r.message.phone;
                      fieldsError = true;
                    }

                    if (r.message && r.message.code) {
                      [this.errorMessage.code] = r.message.code;
                      fieldsError = true;
                    }

                    if (r.message && !fieldsError) {
                      this.$modal.show("common_error", {
                        text: "Что-то пошло не так! " + r.message,
                      });
                    }
                  } else {
                    this.$modal.hide("enter_code");
                    this.$modal.show("success_signup");
                  }
                })
                .catch((e) => {
                  this.submitStatus = null;
                  console.log(e);
                });
            }
          })
          .catch(() => {
            this.submitStatus = null;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form__field {
  max-width: 180px;
  margin: 0 auto rem(20px);
  .form__field-input {
    z-index: 0;
  }
  @media (max-width: 650px) {
  }
}
</style>
