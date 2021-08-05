<template>
  <Modal
    name="receipt_question"
    title="Разрешить доступ к камере устройства?"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <div class="receipt_question">
        <div class="receipt_question__footer">
          <button class="btn btn--default">отклонить</button>
          <button class="btn btn--primary">разрешить</button>
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
    beforeOpen() {},
  },
};
</script>
