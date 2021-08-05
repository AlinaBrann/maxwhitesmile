<template>
  <div class="profile">
    <div class="account__header">
      <h2 class="account__header-title">личный кабинет</h2>
    </div>
    <div class="account__content">
      {{ lastname }} {{ name }}
      <div class="account__info">
        <span>Телефон: </span>
        <span>{{ phone }}</span>
      </div>
      <div class="account__info">
        <span>E-mail: </span>
        <span>{{ email }}</span>
      </div>
      <div class="account__info" v-if="city">
        <span>Город: </span>
        <span>{{ city }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";

const rus = (value) => /^[А-ЯЁа-яё ]+$/.test(value);

export default {
  components: {},
  data: function () {
    return {
      editMode: {
        current: null,
        age: null,
        male: null,
      },
      
      countChecks: 0,
      email: null,
      name: null,
      lastname: null,
      phone: null,
      password: null,
      passwordDub: null,
      city: null,
      errorMessage: {
        email: null,
        name: null,
        lastname: null,
        phone: null,
        password: null,
        passwordDub: null,
      },
      submitStatus: null,
    };
  },

  validations: {
    phone: { required },
    email: { required, email },
    name: { required, rus },
    lastname: { required, rus },
    password: { required, minLength: minLength(6) },
    passwordDub: { required, sameAsPassword: sameAs("password") },
  },

  methods: {
    setMale(male) {
      this.editMode.male = male;
    },

    getChecksCountTitle() {
      let declension = ["чек", "чека", "чеков"];
      let cases = [2, 0, 1, 1, 1, 2];
      return declension[
        this.countChecks % 100 > 4 && this.countChecks % 100 < 20
          ? 2
          : cases[this.countChecks % 10 < 5 ? this.countChecks % 10 : 5]
      ];
    },

    toCheckUpload() {
      let apmButton = document.querySelector("#apm-scan-qr .apm-action-button");
      if (apmButton) apmButton.click();
    },

    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        email: null,
        name: null,
        lastname: null,
        phone: null,
        password: null,
        passwordDub: null,
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
          .dispatch("UpdateProfile", {
            name: this.name,
            surname: this.lastname,
            phone: this.phone,
            password: this.password,
          })
          .then((r) => {
            if (r.error !== 0) {
              this.submitStatus = null;

              let fieldsError = null;

              if (r.message && r.message.name) {
                [this.errorMessage.name] = r.message.name;
                fieldsError = true;
              }

              if (r.message && r.message.phone) {
                [this.errorMessage.phone] = r.message.phone;
                fieldsError = true;
              }

              if (r.message && r.message.surname) {
                [this.errorMessage.lastname] = r.message.surname;
                fieldsError = true;
              }

              if (r.password && r.message.password) {
                [this.errorMessage.password] = r.message.password;
                fieldsError = true;
              }

              if (r.message && !fieldsError) {
                this.$modal.show("common_error", {
                  text: "Что-то пошло не так! " + r.message,
                });
              }
            } else {
              this.$modal.show("success_profile");
            }
          })
          .catch(() => {
            this.submitStatus = null;
          });
      }
    },

    showModal(name) {
      this.$modal.show(name);
    },
    closeModal(name) {
      this.$modal.hide(name);
    },

    logout() {
      this.$store.dispatch("LogOut");
      document.location.reload();
    },
  },
  mounted() {
    this.$store.dispatch("GetProfile").then((response) => {
      // console.log(response);

      this.name = response.result.profile.name;
      this.lastname = response.result.profile.surname;
      this.phone = response.result.profile.phone;
      this.email = response.result.profile.email;
      this.password = response.result.profile.password;
      this.countChecks = response.result.countChecks;
    });
  },
};
</script>

<style lang="scss" scoped>
.form__field--white {
  margin-bottom: 24px;

  .form__field-input {
    border-color: #fff;
  }
}
.form__field--blue {
  margin-bottom: 24px;

  .form__field-input {
    border-color: #eeb224;
    background-color: #fff;
  }
}

.form__field-input {
  font-size: 14px;
  font-weight: 700;
  color: #1a1511;
  background: #ffffff;
  border: 2px solid #eeb224;
  border-radius: 40px;
  /*text-transform: uppercase;*/
  padding: 8px 18px 7px;
  transition: all 0.3s ease-in-out;

  &--md {
    min-width: 250px;
  }
  &--lg {
    min-width: 320px;
    max-width: 100%;
  }

  &:focus {
    outline: none;
    border-color: #912982;
  }
  &[type="date"] {
    position: relative;
    -webkit-appearance: none;
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    &::-webkit-calendar-picker-indicator {
      background: url("../../assets/images/profile/calendar.svg") no-repeat
        center right 20px;
      bottom: 0;
      color: transparent;
      cursor: pointer;
      height: auto;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: auto;
    }
  }
}

.receipt_question {
  &__footer {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .btn {
      margin: 5px;
    }
  }
}

.to-logout {
  color: #e50044;
  font-size: 18px;
  position: absolute;
  right: 35px;
  top: 5px;
}

.receipt_error {
  text-align: center;
  &__icon {
    margin: 0 auto;
  }

  &__footer {
    margin-top: 20px;
  }
}

.success_modal {
  text-align: center;
  &__text {
    font-size: 13px;
    margin-top: 20px;
  }

  &__footer {
    text-align: center;
    margin-top: 19px;
  }
}
.receipt_download {
  &__upload {
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 260px;
    height: 220px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 25px;
    padding: 20px;
    margin-top: 25px;
  }

  &__upload:before {
    content: "";
    position: absolute;
    top: 7px;
    left: 7px;
    right: 7px;
    bottom: 7px;
    border: 3px dashed #8accd9;
    border-radius: 20px;
  }

  &__input {
    position: absolute;
    left: -9999px;
    opacity: 0;
    visibility: hidden;
  }

  &__upload-caption {
    max-width: 170px;
    margin: 0 auto;
    margin-top: 8px;
  }

  &__footer {
    text-align: center;
    margin-top: 20px;
  }
}

.profile {
  &__form {
    display: flex;
  }

  &__title {
    font-size: 21px;
    line-height: 1.3;
    margin-bottom: 18px;
  }

  &__title--accent {
    color: #e50044;
  }

  &__player {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  &__col {
    flex: 0 0 0;
    padding: 0 60px;
    &:first-child {
      border-right: 3px dashed #a8a8a8;
    }
  }

  &__info {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
  }

  &__save {
    position: relative;
    width: 100%;
    margin-top: 34px;
    font-size: 16px;
    .btn {
      position: relative;
      padding-left: 50px;
      padding-right: 50px;
      z-index: 1;
    }

    .btn:hover {
      background-color: #fff;
    }
  }

  &__reg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 300px;
    background: #c4e5ec;
    padding: 50px 30px;
    border-radius: 20px;
  }

  &__reg-title {
    font-size: 13px;
  }

  &__reg-amount {
    position: relative;
  }

  &__reg-amount-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 13px;
  }

  &__reg-amount-num {
    font-size: 36px;
    line-height: 1.1;
  }

  .cancel-icon,
  .save-icon {
    display: block;
    height: 10px;
    width: 10px;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.61544 0.205305C9.1996 -0.143589 8.61792 -0.0368381 8.31505 0.442241L3.99085 7.29515L1.60882 4.50139C1.25788 4.06918 0.668985 4.04835 0.294013 4.45453C-0.0809596 4.8581 -0.100189 5.53766 0.25315 5.96727C0.25315 5.96727 3.14717 9.4458 3.563 9.7947C3.97884 10.1436 4.56052 10.0368 4.86339 9.55776L9.82215 1.70243C10.125 1.22074 10.0313 0.551596 9.61544 0.205305Z' fill='white'/%3E%3C/svg%3E%0A");
    background-size: contain;
    background-repeat: no-repeat;
  }

  .cancel-icon {
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.275283 8.39971L3.675 5L0.275283 1.60029C-0.0917616 1.23324 -0.0917616 0.642327 0.275283 0.275283C0.642327 -0.091761 1.23324 -0.091761 1.60029 0.275283L5 3.675L8.39971 0.275283C8.76676 -0.091761 9.35767 -0.091761 9.72472 0.275283C10.0918 0.642327 10.0918 1.23324 9.72472 1.60029L6.325 5L9.72472 8.39971C10.0918 8.76676 10.0918 9.35767 9.72472 9.72472C9.35767 10.0918 8.76676 10.0918 8.39971 9.72472L5 6.325L1.60029 9.72472C1.23324 10.0918 0.642327 10.0918 0.275283 9.72472C-0.0891581 9.35767 -0.0891581 8.76416 0.275283 8.39971Z' fill='white'/%3E%3C/svg%3E%0A");
  }

  @media (max-width: 1216px) {
    &__info {
      margin-right: 30px;
    }

    &__player {
      padding-right: 30px;
    }
  }

  @media (max-width: 1023px) {
    &__form {
      flex-direction: column;
      align-items: center;
    }

    &__info {
      margin-right: 0;
      justify-content: center;
    }

    &__player {
      padding-right: 0;
      border-right: 0;
    }

    &__title {
      text-align: center;
      margin-top: 10px;
    }

    &__reg {
      margin-top: 40px;
    }

    .to-logout {
      right: 15px;
    }
    .form__field-input--lg {
      min-width: 280px;
    }
  }

  @media (max-width: 650px) {
    &__info {
      flex-direction: column;
      align-items: center;
    }

    &__player {
      flex-direction: column;
      padding-bottom: 17px;
      margin-bottom: 20px;
    }

    &__reg {
      width: 100%;
      padding: 30px;
    }
    .form__field-input--lg {
      min-width: 280px;
    }
  }
}
</style>
