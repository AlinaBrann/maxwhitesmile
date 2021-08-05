<template>
  <form class="">
    <inputText
      size="md"
      placeholder="e-mail"
      type="email"
      :field="email"
      @input="email = $event"
      :class="{ error: validationStatus($v.email) || this.errorMessage.email }"
      :error="this.errorMessage.email"
    />
    <div class="authorization__signin-footer">
      <button
        type="button"
        class="btn btn--primary"
        @click="submit()"
        :class="{ loading: submitStatus == 'PENDING' }"
      >
        Отправить<img src="../../assets/img/spinner.svg" alt="" />
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

        let params = null;

        if (this.socId.indexOf("vk.com") > -1) {
          params = {
            email: this.login,
            identity_vk: this.socId,
          };
        } else if (this.socId.indexOf("ok.ru") > -1) {
          params = {
            email: this.login,
            identity_ok: this.socId,
          };
        } else {
          params = {
            email: this.login,
            identity_fb: this.socId,
          };
        }

        this.$store
          .dispatch("RegisterByEmailSoc", params)
          .then((r) => {
            if (r.error !== 0) {
              this.submitStatus = null;

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

              this.$modal.hide("soc_signup");
              this.$modal.show("success_signup");
            }
          })
          .catch(() => {
            this.submitStatus = null;
          });
      }
    },
  },
  mounted() {
    this.socId = this.$store.getters.signupSocId;
    this.$store.commit("SIGNUP_SOC_ID", null);
  },
  components: {
    inputText,
  },
};
</script>

<style lang="scss" scoped>
.authorization__signin-footer {
  display: flex;
  .btn {
    margin: 0 auto;
  }
}
</style>
