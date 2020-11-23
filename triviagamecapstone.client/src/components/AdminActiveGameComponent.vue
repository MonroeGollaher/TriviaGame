<template>
  <div class="adminActiveGameComponent container-fluid">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">
          Active Game Title
        </h1>
        <p class="lead">
          Room Code:
        </p>
      </div>
    </div>
    <div class="row text-center justify-content-around">
      <div class="col-2">
        <active-question-compnent />
        <Active-question-answer-component />
      </div>
      <div class="col-4 card shadow radius25 text-left">
        <h3 class="my-2">
          Team Answers
        </h3>
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-4 mt-5">
        <button class="btn btn-danger ml-5">
          End game
        </button>
      </div>
    </div>
    <div class="row mt-5 justify-content-center">
      <div class="col-10 card shadow radius25">
        <h3>Team Standings:</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { gameService } from '../services/GameService'
import ActiveQuestionAnswerComponent from '../components/ActiveQuestionAnswerComponent'
import ActiveQuestionCompnent from '../components/ActiveQuestionCompnent'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  name: 'AdminActiveGameComponent',
  components: { ActiveQuestionAnswerComponent, ActiveQuestionCompnent },
  setup() {
    const route = useRoute()
    onMounted(async() => {
      // await gameService.getActiveQuestion()
      await gameService.getQuestionsByGameId(route.params.gameId)
    })
    return {
      activeQuestion: computed(() => AppState.activeQuestion)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
