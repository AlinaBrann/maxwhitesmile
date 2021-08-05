<template>
  <Modal name="recover" title="восстановление пароля" @closeModal="closeModal">
    <template v-slot:content>
      <div class="authorization">
        <RecoverForm></RecoverForm>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";

import RecoverForm from "@/components/form/RecoverForm.vue";

export default {
  components: {
    Modal,
    RecoverForm,
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

<style lang="scss" scoped></style>
