<template>
  <div class="prizes" id="prizes">
    <div class="prizes__list">
      <div class="prizes__item" v-for="(item, index) in prizes" :key="index">
        <div class="prizes__item-img-wrapper">
          <img
            v-if="item.img2x"
            :src="require(`../assets/images/prizes/${item.img}`)"
            :srcset="`${item.img2x} 2x`"
            alt=""
            class="prizes__item-img"
          />
          <img
            v-else-if="item.img"
            :src="require(`../assets/images/prizes/${item.img}`)"
            alt=""
            class="prizes__item-img"
          />
        </div>

        <div class="prizes__item-info">
          <p class="prizes__item-text" v-if="item.text" v-html="item.text"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    styleType: String,
  },
  data: function () {
    return {
      prizes: [
        {
          img: "prize_1.png",
          text: "Беспроводные<br>наушники",
        },
        {
          img: "prize_2.png",
          text: "Игровая приставка <br>5-го поколения",
        },
        {
          img: "prize_3.png",
          text: "<span class='_red'><b>Главный приз!</b><br>Смартфон 13</span>",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.prizes {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1;
  padding: rem(50px) 0 rem(20px);

  .container {
    position: relative;
  }

  &__list {
    display: flex;
    margin: 0 auto;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  &__item {
    display: flex;
    width: 49%;
    flex-direction: column;
    margin-bottom: rem(50px);
  }


  &__item-title {
    text-align: center;
    text-transform: uppercase;
    font-size: rem(18px);
    font-family: "Bold";
    margin-bottom: rem(20px);
  }
  &__item-img {
    height: 100%;
  }
  &__item-img-wrapper {
    position: relative;
    margin-bottom: rem(16px);
    
  }
  &__item-descr {
    margin-bottom: 12px;
    text-align: center;
    font-size: 28px;
    line-height: 32px;
  }

  &__item-text {
    font-size: rem(17px);
    line-height: rem(20px);
    text-transform: none;
    white-space: nowrap;
    color: #5f5e5e;
  }
  @media (max-width: $sm - 1px) {
    padding-bottom: 0;
    &__item {
      margin-bottom: rem(25px);
      &:last-of-type {
        width: 100%;
        flex-direction: row;
        align-items: center;
        .prizes__item-img-wrapper {
          margin: 0 auto;
          height: rem(236px);
        }
        .prizes__item-info {
          order: -1;
        }
        .prizes__item-title {
          font-size: rem(21px);
        }
      }
    }
  }
  @media (min-width: $sm) {
    &__item {
      flex: 0 0 auto;
      width: 30%;
      align-items: center;
      margin-bottom: 0;
    }
    &__list {
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: nowrap;
    }
  }
  @media (min-width: $md) {
    margin-bottom: rem(-40px);
    &__list {
      align-items: center;
    }
    &__item {
      width: 30%;
      &:nth-child(2) {
        margin: 0 rem(50px);
      }
    }
    &__item-text {
      font-size: rem(21px);
      line-height: rem(24px);
    }
  }
}
</style>
