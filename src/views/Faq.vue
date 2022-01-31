<template>
  <div class="faq page" id="faq">
    <div class="container _full-height">
      <div class="page__content _lg _scrollable">
        <div class="faq__header">
          <h2 class="faq__title _red">
            <span>{{ "ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ ОБ АКЦИИ" | typograf }}</span>
          </h2>
        </div>
        <div class="faq__row">
          <div class="faq__content">
            <div class="faq__list">
              <div
                class="faq__item"
                v-for="(item, index) in items"
                :key="index"
                :class="item.isActive ? 'faq__item--active' : ''"
              >
                <div
                  class="faq__item-header"
                  @click="item.isActive = !item.isActive"
                >
                  <h2 class="faq__item-title">
                    <span v-html="item.title"></span>
                  </h2>
                  <div class="faq__item-trigger">
                    <img src="../assets/images/icons/arrow-down.png" alt="" />
                  </div>
                </div>
                <div
                  class="faq__item-content"
                  v-if="item.isActive"
                  v-html="item.text"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    styleType: String,
  },
  data: () => ({
    items: [
      {
        title: "Кто организатор акции? ",
        text: "Организатором акции по&nbsp;поручению Акционерного общества &laquo;Колгейт&nbsp;&mdash; Палмолив&raquo; является Общество с&nbsp;ограниченной ответственностью &laquo;ДЭЙЛИ ПАРНЕРС&raquo; (ИНН: 7730677060, КПП: 772701001).",
        isActive: false,
      },
      {
        title: "Где проходит акция?",
        text: "Акция проводится на территории Российской Федерации",
        isActive: false,
      },
      {
        title: "Каковы сроки проведения акции?",
        text: "Период осуществления покупки и регистрации чека: c 01 февраля 2022 года по 31 марта 2022 года включительно",
        isActive: false,
      },
      {
        title: "Какое количество подарков разыгрывается в акции?",
        text: "Смартфон Apple iPhone 13&nbsp;mini 128GB (2&nbsp;шт.)<br>Игровая приставка Sony PlayStation&nbsp;5 (825&nbsp;Гб, белый) (2&nbsp;шт.)<br>Беспроводные наушники Apple AirPods (14&nbsp;шт.)<br>Подписка Яндекс плюс на&nbsp;3&nbsp;месяца (300&nbsp;шт.) ",
        isActive: false,
      },
      {
        title: "Где можно ознакомиться с&nbsp;правилами акции?",
        text: "С&nbsp;правилами акции можно ознакомиться в&nbsp;разделе &laquo;Правила акции&raquo; на&nbsp;сайте <a href='www.maxwhitesmile.ru' target='blank'>www.maxwhitesmile.ru</a>",
        isActive: false,
      },
      {
        title: "Условия акции",
        text: "Для участия в&nbsp;акции необходимо приобрести в&nbsp;любом магазине торговой сети на&nbsp;территории Российской Федерации не&nbsp;менее одного любого акционного продукта под товарными знаками Colgate<br>Получить и&nbsp;сохранить кассовый чек за&nbsp;покупку до&nbsp;окончания Акции. <br>Зарегистрироваться в&nbsp;качестве Участника Акции, загрузив чек на&nbsp;Сайте Промо-акции www.maxwhitesmile.ru и&nbsp;указав все обязательные для заполнения заявки данные: Имя, Фамилия, Номер телефона, E-mail, Город совершения покупки ",
        isActive: false,
      },
      {
        title: "Сколько чеков может зарегистрировать один участник?",
        text: "Количество чеков, зарегистрированных одним Участником, не&nbsp;ограничено, при условии, что участником приобретено необходимое количество Товара, участвующего в&nbsp;Акции.",
        isActive: false,
      },
      {
        title: "Кто может участвовать в&nbsp;акции?",
        text: "В&nbsp;Акции &laquo;Colgate&nbsp;&mdash; Максимум твоей улыбки!&raquo; могут принимать участие дееспособные физические лица, граждане Российской Федерации старше 18&nbsp;лет, постоянно проживающие на&nbsp;территории РФ. Участниками Акции &laquo;Colgate&nbsp;&mdash; Максимум твоей улыбки!&raquo; не&nbsp;могут быть сотрудники и&nbsp;представители Организатора, аффилированные с&nbsp;Организатором лица, члены их&nbsp;семей, а&nbsp;также работники других юридических лиц и/или индивидуальных предпринимателей, причастных к&nbsp;организации и&nbsp;проведению Акции, и&nbsp;члены их&nbsp;семей. ",
        isActive: false,
      },
      {
        title: "Как проходит выбор победителей?",
        text: "Организатор акции формирует реестр участников, определяет общее число Заявок (чеков) и&nbsp;определяет победителей из&nbsp;реестра случайным образом, через генератор случайных чисел с&nbsp;определением количества случайных чисел, соответствующих количеству разыгрываемых Призов. Процедура повторяется по&nbsp;количеству уровней призов.",
        isActive: false,
      },
      {
        title: "График проведения розыгрышей?",
        text: "Определение Победителей проводится в&nbsp;срок с&nbsp;01&nbsp;апреля 2022г.&nbsp;до&nbsp;15&nbsp;апреля 2022г. включительно",
        isActive: false,
      },
      {
        title: "Когда можно узнать о&nbsp;победителях и&nbsp;где?",
        text: "Результаты розыгрыша призового фонда Акции можно узнать на&nbsp;Сайте после 16&nbsp;апреля 2022г.",
        isActive: false,
      },
      {
        title: "Как организатор связывается с&nbsp;победителями?",
        text: "Определение Победителей проводится в&nbsp;срок с&nbsp;01&nbsp;апреля 2022г.&nbsp;до&nbsp;15&nbsp;апреля 2022г. включительно",
        isActive: false,
      },
      {
        title: "В&nbsp;какие сроки победитель должен выйти на&nbsp;связь с&nbsp;организатором?",
        text: "В&nbsp;течение&nbsp;2 (двух) дней с&nbsp;момента получения от&nbsp;Организатора информации.",
        isActive: false,
      },
      {
        title: "Как получить подарок?",
        text: "Главный приз, призы второго, третьего уровня вручаются Победителю курьерской службой. Приз четвертого уровня вручаются Победителю путем направления кода активации подписки на&nbsp;электронную почту Победителя",
        isActive: false,
      },
      {
        title: "Какие сроки выдачи подарков?",
        text: "Вручение всех Призов осуществляется с&nbsp;16&nbsp;апреля 2022г.&nbsp;по&nbsp;30&nbsp;апреля 2022 года включительно",
        isActive: false,
      },
      {
        title: "Какая продукция Colgate участвует в&nbsp;акции?",
        text: "Полный список продукции, участвующей в&nbsp;Акции указан в&nbsp;Правилах Акции в&nbsp;п.2.4",
        isActive: false,
      },
      {
        title: "Можно купить любой продукт Colgate?",
        text: "Для участия в&nbsp;акции необходимо приобрести не&nbsp;менее одного любого продукта, принимающих участие в&nbsp;акции.<br>Полный список продукции, участвующей в&nbsp;Акции указан в&nbsp;Правил Акции в&nbsp;п.2.4",
        isActive: false,
      },
    ],
  }),
  methods: {
    toFeedback() {
      this.$modal.show("feedback");
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.faq {
  position: relative;
  padding-bottom: rem(70px);
  z-index: 1;
  &__header {
    display: flex;
  }
  &__content {
    width: 100%;
  }
  &__row {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__item {
    padding: rem(16px) rem(10px) rem(0px);
    border-bottom: 1px solid #595655;
    color: #595655;
  }

  &__item--active {
    .faq__item-trigger {
      img {
        transform: rotate(180deg);
      }
    }
  }

  &__item-header {
    cursor: pointer;
    position: relative;
    margin-bottom: rem(18px);
  }
  &__title {
    margin-left: rem(10px);
    margin-bottom: rem(12px);
    font-size: rem(25px);
    font-family: "Bold";
    text-transform: uppercase;
  }
  &__item-trigger {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: rem(28px);
    height: rem(21px);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
  &__item-title {
    display: flex;
    padding-right: rem(45px);
    font-size: rem(18px);
    line-height: 1.1;
    text-transform: none;
    transition: color 0.3s ease-in-out;
    span {
      display: inline-block;
      vertical-align: top;
    }
  }

  &__item-content {
    width: 90%;
    margin-bottom: rem(18px);
    font-size: rem(16px);
    text-transform: none;
    color: #000;
  }
  @media (min-width: $sm) {
    height: calc(100vh - #{rem(47px)});
    padding-top: rem(130px);
    padding-bottom: rem(99px);
    &__title {
      margin-bottom: rem(39px);
      font-size: rem(33px);
    }
    &__item {
      padding: rem(15px) 0px rem(7px) 0px;
    }
    &__item-header,
    &__item-content {
      margin-bottom: rem(15px);
    }
    &__item-title {
      padding-right: rem(50px);
      font-size: rem(25px);
    }
    
  }
  @media (min-width: $md) {
    height: 100%;
    padding-top: rem(70px);
    &__title {
      margin-bottom: rem(42px);
      font-size: rem(35px);
    }
    &__item-title {
      padding-right: rem(70px);
      font-size: rem(35px);
    }
    &__item-trigger {
      width: rem(33px);
      height: rem(25px);
    }
  }
}
</style>
<style lang="scss">
.link {
  color: $red;
  text-decoration: underline;
  ._pink & {
    color: #fff;
  }
}
</style>
