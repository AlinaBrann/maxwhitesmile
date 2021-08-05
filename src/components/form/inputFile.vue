<template>
  <label class="form-file">
    <div class="form-file__caption">{{ label }}</div>
    <input
      type="file"
      class="form-file__input"
      @input="(e) => submitMedia(e.target.files)"
    />
    <div class="form-file__custom">
      <span class="form-file__caption">Прикрепить изображение</span>

      <div class="form-file__btn btn btn--sm btn--secondary">выбрать</div>
    </div>
    <div class="form-file__chosen" v-if="chosenFileName[0]">
      {{ chosenFileName[0].name }}
      <div class="form-file__del" @click.prevent="deleteFile">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.74605 9.06099L4.80698 6.00005L1.74605 2.93911C1.41558 2.60864 1.41558 2.07661 1.74605 1.74614C2.07652 1.41567 2.60855 1.41567 2.93901 1.74614L5.99995 4.80708L9.06089 1.74614C9.39136 1.41567 9.92339 1.41567 10.2539 1.74614C10.5843 2.07661 10.5843 2.60864 10.2539 2.93911L7.19292 6.00005L10.2539 9.06099C10.5843 9.39146 10.5843 9.92349 10.2539 10.254C9.92339 10.5844 9.39136 10.5844 9.06089 10.254L5.99995 7.19302L2.93901 10.254C2.60855 10.5844 2.07652 10.5844 1.74605 10.254C1.41792 9.92349 1.41792 9.38911 1.74605 9.06099Z"
            fill="#000000"
          />
        </svg>
      </div>
    </div>
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    chosenFileName: {
      type: [FileList, Object],
    },
  },
  data: function () {
    return {
      // chosenFileName: ""
    };
  },
  methods: {
    submitMedia(e) {
      this.$emit("submitMedia", e);
    },
    deleteFile() {
      this.$emit("deleteFile");
    },
  },
};
</script>

<style lang="scss" scoped>
.form-file {
  display: block;
  max-width: 300px;
  margin: 0 auto 30px;
  &__input {
    position: absolute;
    left: -9999px;
    opacity: 0;
    visibility: hidden;
  }

  &__custom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__caption {
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    text-transform: none;
  }

  &__btn {
    height: 40px;
    margin-bottom: 10px;
    line-height: 40px;
    padding: 0 28px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.5);
  }

  &__chosen {
    position: relative;
    padding: 11px 25px 11px 13px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(255, 255, 255, 0.2);
    color: #1a1511;
    font-size: 11px;
  }

  &__del {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 8px;
    display: flex;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    border-radius: 50%;
    opacity: 0.3;
    svg {
      margin: auto;
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>
