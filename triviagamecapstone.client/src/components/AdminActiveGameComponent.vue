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
    <div class="row text-center justify-content-around p-2">
      <div class="col-5">
        <active-question-compnent />
      </div>
      <div class="col-5 card shadow radius25 text-left p-2">
        <h3 class="my-2">
          Team Answers
        </h3>
        <div class="row">
          <div class="col-12 d-flex justify-content-between border-bottom mb-2">
            <p>Answer</p>
            <p>Approve</p>
          </div>
        </div>
        <team-answers-component v-for="answer in answers" :answers-prop="answer" :key="answer._id" />
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-4 mt-5 d-flex justify-content-end mr-4">
        <button @click="endGame" class="btn btn-danger ml-5 mr-3">
          End game
        </button>
      </div>
    </div>
    <div class="row mt-5 justify-content-center">
      <div class="col-10 card shadow radius25">
        <h3>Team Standings:</h3>
        <GameLeaderBoard v-for="team in gameTeams" :key="team._id" />
      </div>
    </div>
  </div>
</template>

<script>
import { questionService } from '../services/questionService'
import { answerService } from '../services/AnswerService'
import ActiveQuestionCompnent from '../components/ActiveQuestionCompnent'
import TeamAnswersComponent from '../components/TeamAnswersComponent'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'AdminActiveGameComponent',
  components: { ActiveQuestionCompnent, TeamAnswersComponent },
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async() => {
      await questionService.getQuestionsByGameId(route.params.gameId)
      await questionService.showActiveQuestion()
      await answerService.getResponses()
    })
    return {
      activeQuestion: computed(() => AppState.activeQuestion),
      answers: computed(() => AppState.teamAnswers),
      endGame() {
        router.push({ name: 'AdminHomePage' })
        // gameService.endGame()
      }
      // getResponses() {
      //   gameService.getResponses()
      // }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
