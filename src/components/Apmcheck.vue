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
  created() {},
  mounted() {
    this.ready = true;

    const t = this;

    //console.log("apm");

    const widgetParams = {
      api: "https://api.apmcheck.ru",
      apiKey: "76bb9ca6-80af-45eb-9630-7acbe6c002b7",
      userUuid: localStorage.getItem('uuid'),
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
              'Изображения чека должно быть загружено полностью!<br><a href="#" class="_red modal-trigger">Требования к кассовому чеку</a>',
          },
          cameraNotAvailable: {
            subheader:
              '<span class="apm-title">загрузка чека</span><span class="amp-error">Мы не&nbsp;можем получить доступ к&nbsp;камере устройства. <br><br>Разрешите браузеру обращаться к&nbsp;камере или введите данные с&nbsp;чека вручную</span>',
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
    border: 1px dashed $red;
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
    border-radius: rem(7px);
    border: 0;
    background-color: #fff;
    padding: rem(40px) rem(45px) rem(46px);
  }
  .apm-modal-body {
    max-width: 100%;
    width: rem(320px);
    margin: auto;
    padding: 0;
  }
  .apm-modal-dialog {
    max-width: rem(574px);
  }
  .apm-title {
    display: block;
    margin-bottom: rem(60px);
    color: $red;
    text-transform: uppercase;
    font-size: rem(35px);
    font-family: "Bold";
    line-height: 1.2;
    text-align: center;
    & + .apm-description-title {
      margin-top: rem(-40px);
      margin-bottom: rem(30px);
      .apm-p {
        font-size: rem(18px);
        font-family: "Reg";
      }
    }
  }
  .amp-error {
    display: block;
    max-width: rem(320px);
    margin: auto;
    padding: rem(19px) rem(22px) rem(25px);
    color: rgba(#000, 0.6);
    font-size: rem(16px);
    line-height: 1.3;
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
    border: 1px dashed $red;
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
    &:hover {
      background-color: transparent !important;
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
    background-image: url("../assets/images/icons/close_icon.svg");
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
    border: 2px solid $red;
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
  .apm-btn,
  .apm-action-button {
    display: inline-block;
    height: rem(42px);
    max-width: 100%;
    cursor: pointer;
    text-align: center;
    font-family: "Light";
    font-size: rem(29px);
    padding: 0 rem(15px);
    font-weight: 600;
    line-height: 1;
    padding-bottom: rem(3px);
    border-radius: rem(7px);
    border: rem(3px) solid $red;
    background: $red;
    white-space: nowrap;
    box-shadow: none;
    transition: all 0.3s ease-in-out;
    box-sizing: border-box;

    .btn-content,
    .apm-qr-btn-text {
      font-family: "Light" !important;
      font-size: rem(24px);
      text-transform: none;
      letter-spacing: normal;
      color: #FFF;
      transition: all 0.3s ease-in-out;
    }

    &:hover {
      background-color: #c11216 !important;
      border-color: #c11216;
    }
    @media (max-width: $sm) {
      width: 100%;
      .btn-content,
      .apm-qr-btn-text {
        font-size: rem(18px);
      }
    }
  }
  .apm-btn-manual-input {
    margin: 0;
  }
  #apm-scan-qr-dupe {
    .apm-action-button-dupe {
      padding-left: rem(40px);
      background: $red url("../assets/images/qr.svg") no-repeat center left
        rem(20px);
    }
  }
  .apm-p-input {
    font-size: rem(16px);
    padding: 0;
    color: #000;
    font-family: "Reg" !important;
  }

  .apm-block-qr-video {
    margin-bottom: 2.5rem;
  }
  .apm-qr-input {
    width: rem(340px);
    max-width: 100%;
    height: rem(40px);
    margin: rem(6px) 0 rem(20px);
    appearance: none;
    font-size: rem(18px);
    background: none;
    border: 1px solid #595655;
    border-radius: rem(7px);
    /*text-transform: uppercase;*/
    padding: 0 rem(15px) 0;
    font-family: "Reg";
    transition: all 0.3s ease-in-out;
    color: #000;
    text-align: left;
    &:focus {
      outline: none;
      border-color: $red;
      outline: none !important;
      box-shadow: none !important;
    }
    &::placeholder {
      color: #000;
    }
  }
  // .apm-action-button {
  //   box-shadow: none;
  //   margin: 0 auto;
  //   height: rem(54px);
  //   text-align: center;
  //   background: $yellow;
  //   padding: rem(16px) rem(25px) rem(16px);
  //   line-height: 1;
  //   color: #000;
  //   border: 2px solid $yellow;
  //   border-radius: 0px;
  //   transition: all 0.3s ease-in-out;

  //   .btn-content,
  //   .apm-qr-btn-text {
  //     transition: all 0.3s ease-in-out;
  //     color: #000;
  //     font-size: rem(16px);
  //     font-family: "Light";
  //     letter-spacing: normal;
  //     text-transform: none;
  //   }

  //   &:hover {
  //     color: #000;
  //     background-color: transparent;

  //     .btn-content {
  //       color: #000 !important;
  //     }

  //     .apm-qr-btn-text {
  //       color: #000;
  //     }
  //   }
  // }
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
  
  @media (min-width: $sm) {
    .apm-block-btn,
    .apm-btn {
      width: rem(320px);
    }
  }
  @media (min-width: $md) {
    .apm-modal-content {
      padding: rem(43px);
    }
  }
}
</style>
