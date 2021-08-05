<template>
  <div id="apm-widget"></div>
</template>

<script>
export default {
  name: "Apmcheck",

  data() {
    return {
      ready: false,
    };
  },

  methods: {},

  mounted() {
    this.ready = true;

    const t = this;

    //console.log("apm");

    const widgetParams = {
      api: "https://api.apmcheck.ru",
      apiKey: "ee0fed8c-f363-402a-a887-298ed00076c2",
      userUuid: this.$store.getters.user.profile.userUuid,
      callbacks: {
        onReceiptSentSuccess: function () {
          t.$root.$emit("onCheckSended");
        },
      },
      i18n: {
        labels: {
          mainButton: "Сканировать QR-код",
          manualQrButton: "Ввести вручную",
          uploadPhotosButton: "Выберите фото чека",
          submitManualQrButton: "Отправить",
          addPhotoButton: "загрузить фотографию чека",
          submitPhotosButton: "Отправить",
        },
        screens: {
          scanQr: {
            header: "регистрация чека",
            subheader:
              'Изображения чека должно быть загружено полностью!<br><a href="" class="_red" target="_blank">Требования к кассовому чеку</a><br><a href="" class="_red" target="_blank">Требования к электронному чеку</a>',
          },
          cameraNotAvailable: {
            subheader:
              '<span class="apm-title">загрузка чека</span><span class="amp-error">Мы не можем получить доступ к камере устройства. <br><br>Разрешите браузеру обращаться к камере или введите данные с чека вручную</span>',
          },
          qrParsed: {
            header: "Благодарим!",
            subheader: "Ваш чек принят в обработку.",
          },
          uploadFiles: {
            header: "Загрузка фото",
            subheader: "Добавьте фото чека (до 5 частей)",
            fileTooLargeError:
              "Файл больше 10 МБ. Загрузите файл меньшего размера.",
          },
          sentReceiptFailed: {
            header: "Не удалось отправить чек!",
          },
        },
      },
    };

    window.qrWidget.init("apm-widget", widgetParams);
  },

  components: {},
};
</script>

<style lang="scss">
.apm-modal-backdrop {
  background: rgba(0, 0, 0, 0.8) !important;
}
#apm-widget {
  left: -100%;
  position: absolute;
}
#apm-modal {
  .apm-qr-video {
    border: 1px dashed $red_font;
    background: url("../assets/images/camera.svg") no-repeat center;
    background-size: 20%;
  }
  .apm-modal-header {
    padding: 0;
    position: absolute;
    top: rem(10px);
    right: rem(5px);
  }
  .apm-modal-content {
    position: relative;
    border-radius: 0;
    border: 0;
    background-color: #fff;
    padding: rem(65px) rem(25px);
  }
  .apm-modal-body {
    width: rem(270px);
    max-width: 100%;
    margin: auto;
    padding: 0;
  }
  .apm-modal-dialog {
    max-width: rem(574px);
  }
  .apm-title {
    display: block;
    margin-bottom: rem(30px);
    color: $red_font;
    text-transform: uppercase;
    font-size: rem(28px);
    font-family: "Bold";
    line-height: 1.2;
    text-align: center;
  }
  .amp-error {
    display: block;
    max-width: rem(256px);
    margin: auto;
    padding: rem(19px) rem(22px) rem(25px);
    color: rgba(#000, 0.6);
    font-size: rem(10px);
    line-height: rem(12px);
    background: rgba(#a4a4a4, 0.1);
    &::before {
      content: "";
      display: block;
      width: rem(60px);
      height: rem(60px);
      margin: 0 auto rem(16px);
      background: url("../assets/images/error.svg") no-repeat center;
      background-size: contain;
    }
  }
  .apm-p-input {
    color: #a4a4a4;
  }
  #apm-submit-qr {
    margin-top: 36px;
  }
  .apm-qr-input {
    outline: none !important;
  }
  .apm-validation-error {
    text-align: center;
  }
  #apm-upload-button {
    display: flex;
    align-items: center;
    height: 180px;
    background: #fff;
    border: 1px dashed $red_font;
    box-sizing: border-box;
    border-radius: 0px;
    .btn-content {
      font-weight: bold;
      font-size: rem(18px);
      line-height: rem(21px);
      text-align: center;
      text-transform: uppercase;
      color: #000 !important;
      &:before {
        content: "";
        display: block;
        width: rem(64px);
        height: rem(48px);
        margin: 0 auto rem(19px);
        background: url("../assets/images/upload.svg") no-repeat center;
        background-size: contain;
      }
    }
  }
  .apm-close {
    cursor: pointer;
    position: absolute;
    top: rem(3px);
    right: rem(3px);
    width: rem(48px);
    height: rem(48px);
    max-width: none;
    max-height: none;
    background-color: transparent !important;
    background-image: url("../assets/images/close_icon.svg");
    background-repeat: no-repeat;
    background-size: rem(26px);
    background-position: center;
    border-radius: 0px;
    transition: 0.4s;

    &:before,
    &:after {
      display: none;
    }
  }

  .apm-photo-thumbnail-image {
    object-fit: contain;
    border-radius: 8px;
  }

  .apm-photo-thumbnail-wrapper {
    border: 2px solid $red_font;
    &:first-of-type {
      margin-top: 40px;
    }
  }

  .apm-remove-photo-button {
    background-color: $yellow;
  }
  .apm-block-btn {
    width: 100%;
  }
  .apm-btn {
    width: 100%;
    max-width: 100%;
    height: rem(54px);
    text-align: center;
    background: $yellow;
    padding: rem(14px) rem(25px) rem(16px);
    line-height: 1;
    color: #000;
    letter-spacing: normal;
    border: 2px solid $yellow;
    border-radius: 0px;
    transition: all 0.3s ease-in-out;

    .btn-content {
      font-family: "Light" !important;
      font-size: rem(16px);
      text-transform: none;
      letter-spacing: normal;
      color: #000;
      transition: all 0.3s ease-in-out;
    }

    &:hover {
      background: transparent;
    }
  }

  .apm-p-input {
    font-size: rem(14px);
    padding: 0;
    font-family: "Light" !important;
  }

  .apm-block-qr-video {
    margin-bottom: 2.5rem;
  }
  .apm-qr-input {
    width: rem(270px);
    height: rem(54px);
    margin: rem(6px) 0 rem(18px);
    font-size: rem(14px);
    background: #ffffff;
    border: 1px solid #a4a4a4;
    border-radius: 0px;
    text-align: left;
    padding: 0 rem(14px);
    transition: all 0.3s ease-in-out;
    font-family: "Light" !important;
  }
  .apm-action-button {
    box-shadow: none;
    margin: 0 auto;
    height: rem(54px);
    text-align: center;
    background: $yellow;
    padding: rem(16px) rem(25px) rem(16px);
    line-height: 1;
    color: #000;
    border: 2px solid $yellow;
    border-radius: 0px;
    transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;

    .btn-content,
    .apm-qr-btn-text {
      transition: all 0.3s ease-in-out;
      color: #000;
      font-size: rem(16px);
      font-family: "Light";
      letter-spacing: normal;
      text-transform: none;
    }

    &:hover {
      color: #000;
      background-color: transparent;

      .btn-content {
        color: #000 !important;
      }

      .apm-qr-btn-text {
        color: #000;
      }
    }
  }
  .apm-p {
    padding-bottom: 1.3rem;
    color: #000;
    a._red {
      display: inline-block;
      margin-top: rem(14px);
    }
  }
  .apm-img-error {
    display: none;
  }
  #apm-scan-qr-dupe {
    .apm-action-button-dupe {
      padding: rem(16px) rem(30px) rem(14px) rem(40px);
      background: $yellow url("../assets/images/qr.svg") no-repeat center left
        rem(20px);
      &:hover {
        background-color: transparent;
      }
    }
  }
  @media (min-width: $sm) {
    .apm-block-btn,
    .apm-btn {
      width: rem(256px);
    }
  }
  @media (min-width: $md) {
    .apm-modal-content {
      padding: rem(43px);
    }
  }
}
</style>
