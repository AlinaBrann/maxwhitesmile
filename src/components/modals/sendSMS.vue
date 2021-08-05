<template>
  <Modal
    name="send_sms"
    title="Подтвердите номер телефона"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <div class="success_modal">
        <p class="modal__text">
          Отправить SMS-код на номер
          <span>{{ phone }}</span>
        </p>
        <div class="success_modal__footer">
          <SendSmsForm :phone="phone" :formData="formData" />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import SendSmsForm from "@/components/form/SendSmsForm.vue";
export default {
  components: {
    Modal,
    SendSmsForm,
  },
  data: function () {
    return {
      phone: null,
      formData: null,
    };
  },
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen(event) {
      this.phone = event.params.phone;
      this.formData = event.params.formData;
    },
  },
  mounted() {},
};
</script>
