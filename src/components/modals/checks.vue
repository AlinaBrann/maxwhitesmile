<template>
  <Modal name="checks" title="список чеков" size="lg" @closeModal="closeModal">
    <template v-slot:content>
      <div class="success_modal">
        <Table :thead="['Дата', 'Фото', 'Статус']" v-if="checks.length">
          <template v-slot:tbody>
            <tr
              v-for="(item, index) in checks"
              :key="index"
              :class="
                item.status.type === 'bad'
                  ? '_not-accepted'
                  : item.status.type === 'good'
                  ? '_accepted'
                  : item.status.type === 'done'
                  ? '_received'
                  : ''
              "
            >
              <td>{{ item.date_create }}</td>
              <td @click="openPhoto(item.photo)" class="_clickable">
                <svg
                  width="21"
                  height="26"
                  viewBox="0 0 21 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.4019 0.778166C18.9771 0.580751 18.4687 0.65852 18.1217 0.97558L16.4586 2.44722L14.2033 0.425212C13.7487 0.0184188 13.0607 0.0184188 12.606 0.425212L10.3507 2.44123L8.09543 0.425212C7.64078 0.0184188 6.95282 0.0184188 6.49816 0.425212L4.23687 2.44722L2.57979 0.97558C2.08924 0.538875 1.33548 0.586733 0.898772 1.0713C0.701358 1.29264 0.599659 1.57381 0.599659 1.86694V23.9116C0.593677 24.5696 1.1261 25.102 1.78415 25.108C2.07728 25.108 2.36442 25.0003 2.57979 24.8089L4.24285 23.3373L6.49816 25.3652C6.95282 25.772 7.64078 25.772 8.09543 25.3652L10.3507 23.3492L12.606 25.3652C13.0607 25.772 13.7487 25.772 14.2033 25.3652L16.4646 23.3432L18.1277 24.8149C18.6182 25.2516 19.366 25.2097 19.8027 24.7192C20.0001 24.4978 20.1078 24.2167 20.1018 23.9235V1.87292C20.1078 1.40032 19.8326 0.969598 19.4019 0.778166ZM17.2543 22.4459C16.7996 22.0451 16.1176 22.0451 15.663 22.4519L13.4077 24.4679L11.1524 22.4519C10.6977 22.0451 10.0097 22.0451 9.5551 22.4519L7.2938 24.4679L5.03251 22.4459C4.58384 22.0391 3.90187 22.0391 3.44721 22.4399L1.79611 23.9175V20.729L1.79013 1.87292L3.44721 3.34455C3.90187 3.74537 4.58384 3.74537 5.03849 3.33857L7.2938 1.31657L9.54912 3.33259C10.0038 3.73938 10.6917 3.73938 11.1464 3.33259L13.4077 1.31657L15.669 3.33857C16.1176 3.74537 16.7996 3.74537 17.2543 3.34455L18.9054 1.87292V17.026L18.9113 23.9175L17.2543 22.4459Z"
                    fill="#A5A5A5"
                  />
                  <path
                    d="M16.0197 12.2941H4.67733C4.3483 12.2941 4.0791 12.5633 4.0791 12.8923C4.0791 13.2213 4.3483 13.4905 4.67733 13.4905H16.0197C16.3487 13.4905 16.6179 13.2213 16.6179 12.8923C16.6179 12.5633 16.3487 12.2941 16.0197 12.2941Z"
                    fill="#A5A5A5"
                  />
                  <path
                    d="M10.6357 8.70453H4.67733C4.3483 8.70453 4.0791 8.97373 4.0791 9.30275C4.0791 9.63178 4.3483 9.90098 4.67733 9.90098H10.6357C10.9647 9.90098 11.2339 9.63178 11.2339 9.30275C11.2339 8.97373 10.9647 8.70453 10.6357 8.70453Z"
                    fill="#A5A5A5"
                  />
                  <path
                    d="M16.0197 15.8835H4.67733C4.3483 15.8835 4.0791 16.1527 4.0791 16.4818C4.0791 16.8108 4.3483 17.08 4.67733 17.08H16.0197C16.3487 17.08 16.6179 16.8108 16.6179 16.4818C16.6179 16.1527 16.3487 15.8835 16.0197 15.8835Z"
                    fill="#A5A5A5"
                  />
                </svg>
              </td>
              <td>
                <span v-if="item.status.text">
                  {{ item.status.text }}
                </span>
                <span
                  v-else
                  v-html="
                    item.status.type === 'bad'
                      ? 'Не принят'
                      : item.status.type === 'good'
                      ? 'Принят'
                      : item.status.type === 'done'
                      ? 'Получены баллы'
                      : 'На проверке'
                  "
                >
                </span>
              </td>
            </tr>
          </template>
        </Table>
        <div class="modal__text" v-else>Чеков пока нет</div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import Table from "@/components/Table.vue";

export default {
  components: {
    Modal,
    Table,
  },
  data: function () {
    return {
      checks: [],
      checksTest: [
        {
          date_create: "29.03",
          photo: require("../../assets/images/prizes/prize_6.png"),
          status: {
            type: "bad",
          },
        },
        {
          date_create: "29.03",
          photo: require("../../assets/images/prizes/prize_3.png"),
          status: {
            type: "good",
          },
        },
        {
          date_create: "29.03",
          photo: require("../../assets/images/prizes/prize_6.png"),
          status: {
            type: "done",
          },
        },
        {
          date_create: "29.03",
          photo: require("../../assets/images/prizes/prize_6.png"),
          status: {
            type: "moderation",
          },
        },
        {
          date_create: "29.03",
          photo: require("../../assets/images/prizes/prize_6.png"),
          status: {
            type: "bad",
          },
        },
        {
          date_create: "29.03",
          photo: require("../../assets/images/prizes/prize_6.png"),
          status: {
            type: "good",
          },
        },
        {
          date_create: "29.03",
          photo: require("../../assets/images/prizes/prize_6.png"),
          status: {
            type: "done",
          },
        },
        {
          date_create: "29.03",
          photo: require("../../assets/images/prizes/prize_6.png"),
          status: {
            type: "moderation",
          },
        },
      ],
    };
  },
  methods: {
    closeModal(name) {
      this.$modal.hide(name);
    },
    beforeOpen() {},
    openPhoto(item) {
      this.$modal.show("check_photo", { image: item });
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    if (this.$store.getters.user) {
      this.$store.dispatch("GetChecks").then((response) => {
        this.checks = response.result;
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>
