<template>
  <Modal size="lg" title="Регистрация" name="signup" @closeModal="closeModal">
    <template v-slot:content>
      <SignupForm :network="network"></SignupForm>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

import SignupForm from "@/components/form/SignupForm.vue";

export default {
  props: ["network"],
  components: {
    Modal,
    SignupForm,
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
