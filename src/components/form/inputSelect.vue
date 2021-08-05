<template>
  <div class="form-select">
    <div class="form__caption" v-if="labelText">{{ labelText }}</div>
    <v-select
      :searchable="false"
      :options="options"
      v-model.trim="retValue"
      :name="name"
      @focus="errorReset()"
      @change="onInput()"
      @input="onInput()"
      :class="className"
    >
      <span slot="no-options">Ничего не найдено</span>
    </v-select>

    <div class="error-hint" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      retValue: this.field,
    };
  },

  methods: {
    errorReset() {
      this.$parent.errorReset();
    },

    onInput() {
      this.$emit("input", this.retValue);
    },
  },
  props: ["options", "field", "name", "error", "labelText", "className"],
};
</script>

<style lang="scss">
.form-select {
  max-width: 300px;
  margin: 0 auto 13px;
  .v-select {
    height: 100%;
    &._bordered {
      .vs__open-indicator {
        width: 12px;
        height: 6px;
        background-image: url("../../assets/images/select_arrow-2.svg");
        background-repeat: no-repeat;
        background-size: contain;
      }
      .vs__selected {
        position: relative;
        color: #1a1511;
        padding: 2px 5px 0 0;
      }
      .vs__dropdown-toggle {
        border: 2px solid #912982;
        border-radius: 20px;
      }
      .vs__dropdown-menu {
        width: 100%;
        min-width: auto;
      }
    }
  }
  .vs__dropdown-toggle {
    position: relative;
    display: flex;
    align-items: center;
    line-height: 1;
    height: 100%;
    z-index: 1001;
    background: #ffffff;
    border-radius: 40px;
    border: 2px solid #ffffff;
    padding: 0px 16px;
  }

  .vs__selected-options {
    padding: 0;
  }

  .vs--open .vs__dropdown-toggle {
    border-radius: 40px;
  }

  .vs__search {
    padding: 0;
    margin: 0;
    border: 0;
    color: #1a1511;
    font-size: 13px;
    text-transform: uppercase;

    &:focus {
      border: 0;
      padding: 0;
      margin: 0;
      font-size: 13px;
    }
  }

  .vs__actions {
    padding: 0px 0px 0 3px;
  }

  .vs__clear {
    display: none;
  }

  .vs__open-indicator {
    width: 16px;
    height: 16px;
    background-image: url("../../assets/images/select_arrow.svg");
    path {
      display: none;
    }
  }

  .vs__selected {
    bottom: 0;
    padding: 0;
    margin: 0;
    color: #912982;
    font-size: 13px;
  }

  .vs--single.vs--open .vs__selected {
    position: relative;
    opacity: 1;
  }

  .vs__dropdown-menu {
    border: 0;
    margin-top: -35px;
    padding-top: 38px;
    // background: rgba(238, 178, 36, 0.5);
    box-shadow: 0px 4px 4px rgba(99, 89, 66, 0.25);
    border-radius: 19px;
  }

  .vs__dropdown-option {
    color: #1a1511;
    font-size: 13px;
    padding: 7px 18px 6px;
  }

  .vs__dropdown-option--highlight {
    color: #1a1511;
    background-color: rgba(238, 178, 36, 1);
  }
}
</style>
