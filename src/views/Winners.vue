<template>
  <div class="winners page" id="winners">
    <div class="container _full-height">
      <div class="page__content _lg _scrollable">
        <div class="winners__header">
          <h1 class="winners__title page__title"><span>Победители</span></h1>
          <div v-if="winners.length > 0" class="winners__search">
            <form
              class="winners__search-form"
              v-on:submit.prevent="searchForm"
              :class="{
                error:
                  validationStatus($v.searchQuery) ||
                  this.errorMessage.searchQuery,
              }"
            >
              <input
                class="winners__search-field"
                type="text"
                name="term"
                v-mask="'+7(###) ###-##-##'"
                v-model="searchQuery"
                @focus="errorReset()"
                placeholder="Поиск по номеру телефона"
              />
              <button 
                type="submit" 
                class="winners__search-button">
              </button>

              <div
                class="error-hint"
                v-if="
                  validationStatus($v.searchQuery) ||
                  this.errorMessage.searchQuery
                "
                v-html="
                  (!$v.searchQuery.required && $v.searchQuery.$error
                    ? 'Обязательное поле'
                    : !$v.searchQuery.email && $v.searchQuery.$error
                    ? 'Некорректный e-mail'
                    : '') || this.errorMessage.searchQuery
                "
              ></div>
            </form>
          </div>
        </div>
        <div v-if="winners.length == 0" class="no-winners">Розыгрыш еще не проводился</div>
        <Table
          :thead="['Имя', 'Город', 'Телефон', 'Приз', 'Дата<span class=hidden-xs> розыгрыша</span>']"
          v-else
        >
          <template v-slot:tbody>
            <tr v-for="(item, index) in winners" :key="index">
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.city }}
              </td>
              <td>
                {{ item.phone }}
              </td>
              <td>
                {{ item.prize }}
              </td>
              <td>
                {{ item.date }}
              </td>
            </tr>
          </template>
        </Table>

        <div class="no-results" v-if="noResults">Ничего не найдено</div>


        <ul class="winners__pagination" v-if="pages.length > 1">
          <li
            class="winners__pagination-item"
            v-if="page != 1"
            @click="page--, paginate()"
          >
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.292893 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM15 7L1 7V9L15 9V7Z"
                fill="white"
              />
            </svg>
          </li>
          <li
            class="winners__pagination-item"
            v-for="pageNumber in pages.length"
            :key="pageNumber"
            @click="(page = pageNumber), paginate()"
            :class="{
              current: page === pageNumber,
              last: pageNumber == pages.length && Math.abs(pageNumber - page) > 3,
              first: pageNumber == 1 && Math.abs(pageNumber - page) > 3,
              visible:
                Math.abs(pageNumber - page) < 3 ||
                pageNumber === pages.length ||
                pageNumber == 1,
            }"
          >
            {{ pageNumber }}
          </li>
          <li
            @click="page++, paginate()"
            v-if="page < pages.length"
            class="winners__pagination-item"
          >
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L8.34315 15.0711C7.95262 15.4616 7.31946 15.4616 6.92893 15.0711C6.53841 14.6805 6.53841 14.0474 6.92893 13.6569L12.5858 8L6.92893 2.34315C6.53841 1.95262 6.53841 1.31946 6.92893 0.928932C7.31946 0.538408 7.95262 0.538408 8.34315 0.928932L14.7071 7.29289ZM0 7L14 7V9L0 9L0 7Z"
                fill="white"
              />
            </svg>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import $ from "jquery";
import { required, email } from "vuelidate/lib/validators";

export default {
  components: {
    Table,
  },
  data: function () {
    return {
      page: 1,
      perPage: 1,
      pages: [],
      searchQuery: null,
      date: null,
      total: 0,
      noResults: false,
      errorMessage: {
        date: null,
        searchQuery: null,
      },

      winners: [ ],
    };
  },
  validations: {
    searchQuery: { required, email },
  },
  methods: {
    errorReset() {
      this.$v.$reset();

      this.errorMessage = {
        searchQuery: null,
      };
    },
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },
    setPages(total) {
      this.pages = [];
      if (total) {
        for (let index = 1; index <= total.length; index++) {
          this.pages.push(index);
        }
      }
    },
    paginate() {
      let page = this.page;
      this.$store.dispatch("GetWinners", { page: page }).then((response) => {
        this.winners = response.result;
      });
    },
    searchForm() {
      this.$v.$touch();
      if (this.$v.$pendding || this.$v.$error) return;
      this.page = 1;
      this.$store
        .dispatch("SearchWinners", { term: this.searchQuery })
        .then((response) => {
          this.winners = response.result;
          if (!this.winners) {
            this.noResults = true;
          } else {
            this.noResults = false;
          }
        });
    },
    formReset() {
      this.$v.$reset();
      this.searchQuery = null;
      this.$store
        .dispatch("GetWinners", { page: this.page })
        .then((response) => {
          this.winners = response.result;
        });
    },
  },
  mounted() {},
  created() {
    this.$store.dispatch("GetWinners").then((response) => {
      this.total = response.paging.total;
      this.winners = response.result;
    });
  },
  watch: {
    winners() {
      this.setPages(this.winners);
    },
  },
  computed: {
    // displayedWinners() {
    //   return this.paginate(this.winners);
    // },
  },
};
</script>

<style lang="scss">
.winners {
  position: relative;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  &__header {
    display: flex;
    flex-direction: column;
    margin-bottom: rem(35px);
    padding: rem(5px) rem(8px);
  }
  &__title {
    margin-bottom: rem(15px);
    margin-right: auto;
  }
  .container {
    position: relative;
  }
  &__search {
    width: 100%;
  }
  &__search-field {
    width: 100%;
    padding: 0 rem(30px) 0 rem(10px);
    height: rem(34px);
    background: transparent;
    border-radius: rem(7px);
    border: rem(3px) solid $red;
    font-size: rem(18px);
    color: #595655;
    outline: none;
    &::placeholder {
      color: #595655;
    }
  }
  &__search-form {
    position: relative;
    max-width: 100%;
  }
  &__search-button {
    position: absolute;
    top: 50%;
    right: rem(10px);
    transform: translateY(-50%);
    width: rem(18px);
    height: rem(21px);
    background: url("../assets/images/icons/search.svg") no-repeat center;
    background-size: contain;
  }
  &__search-clear {
    position: absolute;
    top: 0;
    right: rem(8px);
    width: rem(22px);
    height: 100%;
    background: url("../assets/images/error.svg") no-repeat center;
    background-size: 100%;
    cursor: pointer;
  }
  &__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: rem(30px);
    color: #fff;
    &-item {
      display: none;
      margin: 0 rem(8px);
      font-size: rem(19px);
      background: none;
      cursor: pointer;
      &:first-of-type,
      &:last-of-type {
        display: block !important;
      }
      &.current {
        font-family: "Bold";
        cursor: default;
      }
      &.visible {
        display: block;
      }
      &.first::after {
        content: "...";
        margin-left: rem(8px);
      }
      &.last::before {
        content: "...";
        margin-right: rem(8px);
      }
    }
  }

  &-tab-desktop {
    display: none;
  }
  &-tab-mobile {
    color: #fff;
    font-size: rem(14px);
    &__inner {
      padding-bottom: rem(7px);
      margin-bottom: rem(7px);
      border-bottom: 1px solid #fff;
      tr {
        &:last-of-type {
          td {
            padding-bottom: rem(20px);
          }
        }
      }
      td {
        padding: rem(7px) 0;
        &:first-of-type {
          font-family: "Bold";
          padding-right: rem(20px);
        }
      }
    }
  }
  .no-results {
    text-align: center;
  }
  .no-winners {
    text-align: center;
    color: #595655;
  }
  @media (min-width: $sm) {
    &-tab-desktop {
      display: block;
    }
    &-tab-mobile {
      display: none;
    }
    &__header {
      flex-direction: row;
      align-items: center;
    }
    &__title {
      margin-bottom: 0;
    }
    &__search {
      width: rem(290px);
    }
  }
  @media (min-width: $md) {
    padding: rem(100px) 0;
    &__background {
      display: block;
    }
    &__header {
      padding: 0;
      margin-bottom: rem(40px);
    }
    // &__search-form {
    //   margin: 0px auto rem(48px);
    // }
    .no-winners { 
      font-size: rem(25px);
    }
  }
}
</style>
