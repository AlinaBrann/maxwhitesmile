<template>
  <div class="feedback page">
    <div class="container">
      <div class="page__content _md">
        <h1 class="page__title">Обратная связь</h1>
        <FeedbackForm />
      </div>
    </div>

  </div>
</template>

<script>
import FeedbackForm from "../components/form/FeedbackForm.vue";
  export default {
    components: { FeedbackForm }
}
</script>

<style lang="scss" scoped>

</style>