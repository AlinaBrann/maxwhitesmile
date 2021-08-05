<template>
  <Modal name="check_photo" size="md" @closeModal="closeModal">
    <template v-slot:content>
      <div class="success_modal">
        <img :src="image" alt="" class="success_modal-image" />
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { set } from "lodash";

export default {
  components: {
    Modal,
  },
  data: function () {
    return {
      image: null,
    };
  },
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen(event) {
      this.image = event.params.image;
      this.formData = event.params.formData;
    },
  },
  mounted() {},
};
</script>
