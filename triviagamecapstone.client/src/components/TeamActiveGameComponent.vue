<template>
  <div class="TeamActiveGame container-fluid">
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <h5>
          Point Standing: TeamPoints
        </h5>
        <p>
          Round: RoundNumber
        </p>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <h3>
          CurrentQuestion
        </h3>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <form @submit="teamAnswer()" class="d-flex flex-column">
          <input type="text" v-model="state.question.pointWager" placeholder="Point Wager">
          <input type="text" v-model="state.question.answer" placeholder="Team Answer">
          <button type="submit" class="btn btn-success">
            Submit Answer
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-6-lg">
        <button @click="forfietGame()" class="btn btn-danger">
          Forfiet Game?
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'TeamActiveGameComponent',
  setup() {
    const state = reactive({
      question: {}
    })
    return {
      state

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
