<template>
  <Modal
    name="receipt_download"
    title="регистрация чека"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <div class="receipt_download">
        <label class="receipt_download__upload">
          <input
            name="receipt_download"
            type="file"
            class="receipt_download__input"
          />
          <div class="receipt_download__upload-custom">
            <svg
              class="receipt_download__upload-icon"
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3334 45.3333L32 56L42.6667 45.3333"
                stroke="#013F5D"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M32 32V56"
                stroke="#013F5D"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M55.68 48.2401C57.9984 46.6098 59.737 44.2832 60.6434 41.5978C61.5499 38.9125 61.5771 36.0081 60.7211 33.3063C59.865 30.6044 58.1703 28.2457 55.8829 26.5723C53.5954 24.8988 50.8342 23.9979 48 24.0001H44.64C43.838 20.8744 42.3373 17.9714 40.251 15.5096C38.1647 13.0479 35.5471 11.0914 32.5952 9.7877C29.6434 8.48395 26.4343 7.86683 23.2094 7.9828C19.9846 8.09877 16.828 8.94481 13.9775 10.4572C11.1269 11.9696 8.6566 14.109 6.7525 16.7143C4.84841 19.3196 3.56014 22.3229 2.9847 25.4981C2.40926 28.6733 2.56163 31.9377 3.43035 35.0455C4.29907 38.1533 5.8615 41.0235 8 43.4401"
                stroke="#013F5D"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="receipt_download__upload-caption">
            загрузить фотографию чека
          </div>
        </label>
        <div class="receipt_download__footer">
          <button
            class="btn btn--primary"
            @click.prevent="showModal('receipt_error')"
          >
            зарегистрировать чек
          </button>
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
