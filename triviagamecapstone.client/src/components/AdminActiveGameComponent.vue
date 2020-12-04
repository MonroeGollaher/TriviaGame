<!-- //NOTE - This is the game board that the host sees. It displays the question/answer, the team's responses, and the leaderboard for the current game -->
<template>
  <div class="adminActiveGameComponent container-fluid">
    <div class="container">
      <h1 class="mt-3">
        {{ activeGame.title }}
      </h1>
      <p class="lead">
        Room Code: {{ activeGame.roomPin }}
      </p>
    </div>
    <div class="row text-center justify-content-around p-4">
      <div class="col-5">
        <!-- //NOTE - Displays current question, the correct answer, and the button to move to the next question -->
        <active-question-compnent />
      </div>
      <div class="col-5 card shadow radius25 text-left p-4">
        <h3 class="my-2">
          Team Answers
        </h3>
        <div class="row">
          <div class="col-12 d-flex justify-content-between border-bottom border-dark mb-2">
            <p>Answer</p>
            <p>Approve</p>
          </div>
        </div>
        <!-- //NOTE - This displays each team's answer to the current question and allows the admin to approve each response to award points -->
        <team-answers-component v-for="answer in answers" :answers-prop="answer" :key="answer._id" />
      </div>
    </div>
    <div class="row mt-5 justify-content-center">
      <div class="col-10 card shadow radius25 p-4">
        <h3>Team Standings:</h3>
        <!-- //NOTE - live updates of the current points each team has earned so far during the game -->
        <GameLeaderBoard v-for="t in teamRanking" :key="t" :team-prop="t" />
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-4 mt-5 mb-5 d-flex justify-content-end mr-4">
        <button @click="pauseGame" class="btn btn-warning ml-5 mr-2">
          Pause Game
        </button>
        <button @click="endGame(activeGame._id)" class="btn btn-danger ml-5 mr-5">
          End Game
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { answerService } from '../services/AnswerService'
import ActiveQuestionCompnent from '../components/ActiveQuestionCompnent'
import TeamAnswersComponent from '../components/TeamAnswersComponent'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import { gameService } from '../services/GameService'

export default {
  name: 'AdminActiveGameComponent',
  components: { ActiveQuestionCompnent, TeamAnswersComponent },
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(async() => {
      await gameService.getActiveGame(route.params.gameId)
      await answerService.getResponses()
      await gameService.getGameTeams(route.params.gameId)
    })
    return {
      activeQuestion: computed(() => AppState.activeQuestion),
      activeGame: computed(() => AppState.activeGame),
      answers: computed(() => AppState.teamAnswers),
      teams: computed(() => AppState.gameTeams),
      teamRanking: computed(AppState.teamRanking = () => AppState.gameTeams.sort((a, b) => b.currentPoints - a.currentPoints)),
      pauseGame() {
        router.push({ name: 'AdminHomePage' })
        // gameService.endGame()
      },
      endGame(gameId) {
        gameService.endGame(gameId)
        router.push({ name: 'AdminHomePage' })
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
