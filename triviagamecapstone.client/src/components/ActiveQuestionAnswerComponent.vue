<template>
  <div class="activeQuestionAnswerComponent container-fluid radius25 card shadow justify-content-center">
    <div class="col-10 d-flex">
      <div class="row justify-content-center">
        <h3>Question:</h3>
        <p>Active Question inserted here</p>
      </div>
    </div>
    <div class="col-10 d-flex">
      <div class="row justify-content-center">
        <h3>Answer:</h3>
        <p>Active Answer inserted here</p>
      </div>
    </div>
    <div class="col-10 mb-3">
      <button class="btn btn-primary text-light">
        Next Question
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActiveQuestionAnswerComponent',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
