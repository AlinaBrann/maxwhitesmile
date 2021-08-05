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
        <div class="modal__subtitle">Вы успешно зарегестрировались!</div>
        <p class="modal__text">
          {{
            "На вашу электронную почту был направлен пароль и ссылка для подтверждения электронной почты и завершении регистрации"
              | typograf
          }}
        </p>
        <div class="success_modal__footer">
          <div class="success_modal-back">
            Через <span id="countdowntimer">5</span> секунд вы вернетесь на
            главную
          </div>
        </div>
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
    countDown() {
      let timeleft = 5;
      let downloadTimer = setInterval(
        function () {
          if (timeleft <= 0) {
            this.closeModal("success_signup");
            this.$router.push("/");
            clearInterval(downloadTimer);
          } else {
            document.getElementById("countdowntimer").textContent = timeleft;
          }
          timeleft -= 1;
        }.bind(this),
        1000
      );
    },
    beforeOpen() {
      this.countDown();
    },
  },
};
</script>
