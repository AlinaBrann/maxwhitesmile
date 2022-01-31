<template>
  <Modal
    name="success_signup"
    :success="true"
    title="Спасибо!"
    size="md"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <div class="success_modal">
        <div class="modal__subtitle">Вы успешно зарегистрировались!</div>
        <p class="modal__text">
          {{
            "На вашу электронную почту был направлен пароль и ссылка для подтверждения электронной почты и завершении регистрации"
              | typograf
          }}
        </p>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Modal,
  },
  data: function () {
    return {};
  },
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
  
    beforeOpen() {
    },
  },
};
</script>
