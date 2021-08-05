<template>
  <Modal size="md" title="ВХОД" name="authorization" @closeModal="closeModal">
    <template v-slot:content>
      <LoginForm></LoginForm>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

import LoginForm from "@/components/form/LoginForm.vue";

export default {
  components: {
    Modal,
    LoginForm,
  },
  data: function () {
    return {};
  },

  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen() {},
  },
};
</script>

<style lang="scss" scoped>
.modal {
  align-self: flex-start;
}
</style>

<style lang="scss"></style>
