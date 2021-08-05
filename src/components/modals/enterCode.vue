<template>
  <Modal
    name="enter_code"
    size="md"
    title="Введите код из&nbsp;SMS"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <div class="success_modal">
        <div class="success_modal__footer">
          <EnterCodeForm :phone="phone" :formData="formData" />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import EnterCodeForm from "@/components/form/EnterCodeForm.vue";
export default {
  components: {
    Modal,
    EnterCodeForm,
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
