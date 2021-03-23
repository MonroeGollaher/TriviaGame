<!-- //NOTE - This is the view that each team sees when playing the game. It displays their current points, the round number, the current question, and a form to allow the team to wager points and answer a question. -->
<template>
  <div class="TeamActiveGame container-fluid">
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6 text-center">
        <h5 class="lead text-light pt-3">
          Point Standing: {{ profile.currentPoints }}
        </h5>
        <p class="lead text-light">
          Round: RoundNumber
        </p>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <h3 class="mb-2 lead text-center text-light">
          Current Question:
        </h3>
        <h3>
          <!-- //NOTE - This component displays the current question for the team -->
          <active-question-component />
        </h3>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6" v-if="activeQuestion">
        <form @submit.prevent="teamAnswer(activeQuestion._id)" class="d-flex flex-column my-1">
          <input type="text" v-model="state.answer.wager" placeholder="Point Wager" class="my-1 border border-0 radius5">
          <input type="text" v-model="state.answer.answer" placeholder="Team Answer" class="my-1 border border-0 radius5">
          <button type="submit" class="btn btn-success my-1 radius10">
            Submit Answer
          </button>
        </form>
      </div>
    </div>
    <div class="row justify-content-end align-items-end">
      <div class="col-12 col-6-lg">
        <button @click="removeTeam(profile.id)" class="btn btn-sm btn-danger mt-5 radius10">
          Forfiet Game?
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import ActiveQuestionComponent from '../components/ActiveQuestionCompnent'
import { AppState } from '../AppState'
import { answerService } from '../services/AnswerService'
import { gameService } from '../services/GameService'
import { useRouter } from 'vue-router'
// import { logger } from '../utils/Logger'
export default {
  name: 'TeamActiveGameComponent',
  setup() {
    const router = useRouter()
    const state = reactive({
      answer: {
        // questionId: AppState.activeQuestion.id
      }
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      gameQuestions: computed(() => AppState.gameQuestions),
      activeQuestion: computed(() => AppState.activeQuestion),
      teamAnswer(questionId) {
        // logger.log('TeamActiveGame', AppState.activeQuestion)
        answerService.submitAnswer(state.answer, questionId)
        state.answer = {}
      },
      removeTeam(profileId) {
        gameService.removeTeam(profileId)
        router.push({ name: 'TeamJoinGame' })
      }
    }
  },
  components: { ActiveQuestionComponent }
}
</script>

<style lang="scss" scoped>
</style>
