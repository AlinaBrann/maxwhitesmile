<template>
  <div>
    <div
      class="parallax__background"
      :class="item.class ? item.class : '_full-width'"
      v-for="(item, idx) in items"
      :key="idx"
      :data-value="item.value"
    >
      <img :src="item.img" class="parallax__background-image" :style="{width: item.width}" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],
  mounted() {
    const parallaxBloks = document.querySelectorAll(".parallax__background");
    document.addEventListener("mousemove", parallax);
    function parallax(e) {
      parallaxBloks.forEach(function (move) {
        var moving_value = move.getAttribute("data-value");
        var x = (e.clientX * moving_value) / 250;
        var y = (e.clientY * moving_value) / 250;

        move.style.transform =
          "translateX(" + x + "px) translateY(" + y + "px)";
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.parallax__background {
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &-image {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: none;
    transform: translate(-50%, -50%);
  }
  &._full-width {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &._separate {
    top: 80%;
    right: 4%;
    left: auto;
    width: rem(280px);
    height: rem(280px);
  }
  @media (min-width: $md) {
    display: block;
  }
}
</style>
