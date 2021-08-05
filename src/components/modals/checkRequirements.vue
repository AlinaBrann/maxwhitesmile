<template>
  <Modal
    name="check_requirements"
    title="Требования <br>к чеку"
    size="md"
    @closeModal="closeModal"
  >
    <template v-slot:content>
      <ul class="modal__list">
        <li 
          class="modal__list-item"
          v-for="(item,idx) in requirements"
          :key="idx"
        >
          {{ item | typograf }} 
        </li>
      </ul>
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
    return {
      requirements: [
        'Наличие в чеке Продукции Mars от 150 рублей без учёта другойпродукции и после применениявсех скидок, купонов, бонусов по картам программы лояльности',
        'Наименование магазина “Мегамарт”',
        'Номер чека',
        'Дата и время совершения покупки',
        'Итоговая сумму покупки',
        'ИНН магазина ',
        'Отсутствие QR-кода - ФН, ФД, ФП'
      ]
    };
  },
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
      let apmButton = document.querySelector(
          "#apm-scan-qr .apm-action-button"
        );
        if (apmButton) apmButton.click();
    },
    beforeOpen() {},
  },
};
</script>
