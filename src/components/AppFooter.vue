<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__row">
        <div class="footer__col">
          <div class="footer__nav">
            <a
              v-for="(item, idx) in docs"
              :key="idx"
              class="footer__nav-link"
              :href="item.name ? `${publicPath}docs/${item.name}` : item.path"
              target="_blank"
            >
              {{ item.title }}
            </a>
          </div>
        </div>
        <div class="footer__col">
          <div class="footer__nav">
            <a href="#" class="footer__nav-link"> Доступность </a>
            <a href="https://www.mars.com/cookies-russia" target="_blank" class="footer__nav-link"> Файлы Cookies </a>
            <a href="https://www.mars.com/" target="_blank" class="footer__nav-link"> Владелец сайта </a>
            <a href="" @click.prevent="toFeedback()" class="footer__nav-link">
              Обратная связь
            </a>
          </div>
        </div>
      </div>
      <p class="footer__copyright">
        {{
          "© 2020 Mars, Incorporated и ее филиалы. Все права защищены."
            | typograf
        }}
      </p>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      docs: [
        {
          path: "https://www.mars.com/privacy-policy-russia",
          title: "Положение о конфиденциальности",
        },
        {
          path: "https://www.mars.com/legal-russia",
          title: "Правила использования сайта",
        },
        {
          name: "user_agreement.pdf",
          title: "Пользовательское соглашение",
        },
      ],
    };
  },
  methods: {
    toFeedback() {
      this.$modal.show("feedback");
    },
  },
};
</script>
<style scoped lang="scss">
.footer {
  padding: rem(70px) 0 rem(50px);
  text-align: left;
  background: #f6f6f6;

  .container {
    max-width: rem(970px);
    box-sizing: border-box;
  }

  &__row {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__col {
    display: flex;
    flex: 0 0 50%;
    flex-direction: column;
    align-items: center;
  }

  &__content {
    max-width: 852px;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__nav-link {
    position: relative;
    margin-bottom: rem(40px);
    font-size: rem(18px);
    text-align: center;
    line-height: rem(22px);
    color: $grey;
  }

  &__nav-link:last-child {
    margin-right: 0;
  }

  &__nav-link:hover {
    text-decoration: none;
  }

  &__copyright {
    margin: rem(60px) auto 0;
    font-size: rem(18px);
    text-align: center;
    color: $grey;
  }
  @media (min-width: $sm) {
    padding: rem(70px) rem(123px) rem(50px);
    &__row {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    }
    &__content {
      margin-right: 53px;
    }
    &__col {
      &:last-of-type {
        align-items: flex-end;
      }
    }
    &__nav {
      align-items: flex-start;
    }
    &__nav-link {
      margin-bottom: rem(30px);
      text-align: left;
    }
    &__copyright {
      margin-top: rem(40px);
      font-size: rem(14px);
    }
  }
  @media (min-width: $md) {
    padding: rem(83px) 0 rem(50px);
    &__nav-link {
      text-decoration-line: underline;
    }
    &__col {
      flex: 0 0 35%;
      &:last-of-type {
        align-items: flex-start;
      }
    }
    &__copyright {
      max-width: 30%;
      margin: rem(40px) auto 0;
      font-size: rem(14px);
    }
  }
}
</style>
