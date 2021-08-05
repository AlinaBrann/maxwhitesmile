<template>
  <div class="signup">
    <div class="signup__row">
      <div class="signup__col">
        <inputText
          label="Фамилия"
          placeholder="Ваша фамилия"
          :field="lastname"
          :class="{
            error: validationStatus($v.lastname) || this.errorMessage.lastname,
          }"
          :error="
            (!$v.lastname.required && $v.lastname.$error
              ? 'Обязательное поле'
              : !$v.lastname.rus && $v.lastname.$error
              ? 'Введите текст на русском языке'
              : '') || this.errorMessage.lastname
          "
          @input="lastname = $event"
        />
        <inputText
          label="Имя"
          placeholder="Ваше имя"
          :field="name"
          :class="{
            error: validationStatus($v.name) || this.errorMessage.name,
          }"
          :error="
            (!$v.name.required && $v.name.$error
              ? 'Обязательное поле'
              : !$v.name.rus && $v.name.$error
              ? 'Введите текст на русском языке'
              : '') || this.errorMessage.name
          "
          errorType
          @input="name = $event"
        />
        <div class="form__field form__field--white">
          <div class="form__caption">Город</div>
          <vue-dadata 
            placeholder="Начните вводить"
            token="e3468f8470bd9bff626cc9a80dfc9cceb5d01020" 
            fromBound="city" 
            :onChange="selectSuggestion"
            toBound="city">
          </vue-dadata>
        </div>
      </div>
      
      <div class="signup__col">
        <inputText
          label="E-mail"
          placeholder="Ваш E-mail"
          :field="email"
          type="email"
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
          @input="email = $event"
        />
        <inputText
          label="Номер телефона"
          placeholder="+7 (xxx)xxx-xx-xx"
          :field="phone"
          :class="{
            error: validationStatus($v.phone) || this.errorMessage.phone,
          }"
          :error="
            (!$v.phone.required && $v.phone.$error
              ? 'Обязательное поле'
              : !$v.phone.minLength && $v.phone.$error
              ? 'Минимум ' + $v.phone.$params.minLength.min + ' символов'
              : '') || this.errorMessage.phone
          "
          @input="phone = $event"
          type="tel"
          :mask="'+7(###) ###-##-##'"
        />
      </div>
    </div>

    <div class="signup__checkbox_list">
      <checkBox
        label="Я&nbsp;ознакомился с&nbsp;<a href='' target='_blank'>Положением о&nbsp;конфиденциальности</a>, <a href='' target='_blank'>Правилами Акции</a> и&nbsp;даю свое согласие на&nbsp;обработку персональных данных."
        :field="checkbox"
        :class="{
          error: validationStatus($v.checkbox) || this.errorMessage.checkbox,
        }"
        :error="this.errorMessage.checkbox"
        @input="checkbox = $event"
      />
      <checkBox
        label="Мне исполнилось 18 лет."
        :field="checkbox3"
        :class="{
          error: validationStatus($v.checkbox3) || this.errorMessage.checkbox3,
        }"
        :error="this.errorMessage.checkbox3"
        @input="checkbox3 = $event"
      />
      <checkBox
        label="Я&nbsp;даю согласие на&nbsp;получение рекламной рассылки (в&nbsp;т.ч.&nbsp;в&nbsp;виде смс, электронных писем и/или через месенджеры)."
        :field="checkbox2"
        :class="{
          error: validationStatus($v.checkbox2) || this.errorMessage.checkbox2,
        }"
        :error="this.errorMessage.checkbox2"
        @input="checkbox2 = $event"
      />
    </div>
    <div class="signup__footer">
      <button
        type="button"
        class="btn btn--primary"
        @click="submit()"
        :class="{ loading: submitStatus == 'PENDING' }"
      >
        Зарегистрироваться<img src="../../assets/img/spinner.svg" alt="" />
      </button>
      <div class="modal__another-option">
        <p>Есть учетная запись?</p>
        <a href="#" @click="showLogInModal()">Войти</a>
      </div>
    </div>
  </div>
</template>

<script>
import inputText from "@/components/form/inputText.vue";
import checkBox from "@/components/form/checkBox.vue";
import VueDadata from 'vue-dadata';
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
const rus = (value) => /^[А-ЯЁа-яё ]+$/.test(value);

export default {
  name: "SignupForm",
  props: ["network"],
  data() {
    return {
      ready: false,

      email: null,
      name: null,
      lastname: null,
      phone: null,
      city: '',

      checkbox: false,
      checkbox2: false,
      checkbox3: false,

      errorMessage: {
        email: null,
        name: null,
        lastname: null,
        phone: null,
        city: null,
      },

      submitStatus: null,
    };
  },

  validations: {
    phone: { required, minLength: minLength(11) },
    email: { required, email },
    name: { required, rus },
    lastname: { required, rus },
    city: { required },
    checkbox: {
      required,
      sameAs: sameAs(() => true),
    },
    /*checkbox2: {
      required,
      sameAs: sameAs(() => true),
    },*/
    checkbox3: {
      required,
      sameAs: sameAs(() => true),
    },
  },

  methods: {
    selectSuggestion(suggestion) {
      this.city = suggestion.data.city
    },
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        email: null,
        name: null,
        lastname: null,
        phone: null,
        city: null,
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
        const formData = {
          login: this.email,
          name: this.name,
          surname: this.lastname,
          phone: this.phone,
          city: this.city,
          network: 1,
          personal_data_processing_agreement: 1,
        };
        this.$store
          .dispatch("SignUp", formData)
          .then((r) => {
            console.log(r);
            if (r.error !== 0) {
              this.submitStatus = null;

              let fieldsError = null;

              if (r.message && r.message.email) {
                [this.errorMessage.email] = r.message.email || "";
                fieldsError = true;
              } else if (r.message && r.message.login) {
                [this.errorMessage.email] = r.message.login;
                fieldsError = true;
              }

              if (r.message && r.message.name) {
                [this.errorMessage.name] = r.message.name;
                fieldsError = true;
                console.log(r.message.name);
              }

              if (r.message && r.message.phone) {
                [this.errorMessage.phone] = r.message.phone;
                fieldsError = true;
              }

              if (r.message && r.message.surname) {
                [this.errorMessage.lastname] = r.message.surname;
                fieldsError = true;
              }

              if (r.message && r.message.city) {
                [this.errorMessage.city] = r.message.city;
                fieldsError = true;
              }

              if (r.message && !fieldsError) {
                this.$modal.show("common_error", {
                  text: "Что-то пошло не так! " + r.message,
                });
              }
            } else {
              this.$modal.hide("signup");
              this.$modal.show("success_signup");
            }
          })
          .catch((e) => {
            this.submitStatus = null;
            console.log(e);
          });
      }
    },
    showLogInModal() {
      this.$modal.hide("signup");
      this.$modal.show("authorization");
    },
  },
  mounted() {},
  components: {
    inputText,
    checkBox,
    'vue-dadata': VueDadata
    
  },
};
</script>

<style lang="scss" scoped>
.signup {
  &__row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__checkbox_list {
    margin-bottom: rem(30px);
  }
  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: $sm) {
    padding: 0 rem(65px);
    &__row {
      flex-direction: row;
    }
  }
}

</style>
<style lang="scss">
.vue-dadata__input {
  width: rem(270px);
  max-width: 100%;
  height: rem(54px);
  appearance: none;
  font-size: rem(14px);
  background: #ffffff;
  border: 1px solid #a4a4a4 !important;
  border-radius: 0px !important;
  /*text-transform: uppercase;*/
  padding: 0 rem(15px) 0 !important;
  transition: all 0.3s ease-in-out;
  color: #1a1511;

  &:focus {
    outline: none;
    border-color: $red_font !important;
    box-shadow: none !important;
  }
}
.vue-dadata__suggestions {
  mark {
    background: rgba($yellow, 0.5) !important;
  }
}
</style>