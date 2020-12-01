<!-- //NOTE - This is the view that each team sees when playing the game. It displays their current points, the round number, the current question, and a form to allow the team to wager points and answer a question. -->
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
          CurrentQuestion:
          <!-- //NOTE - This component displays the current question for the team -->
          <active-question-component />
        </h3>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6" v-if="activeQuestion">
        <form @submit.prevent="teamAnswer(activeQuestion._id)" class="d-flex flex-column">
          <input type="text" v-model="state.answer.wager" placeholder="Point Wager">
          <input type="text" v-model="state.answer.answer" placeholder="Team Answer">
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
import { computed, onMounted, reactive } from 'vue'
import ActiveQuestionComponent from '../components/ActiveQuestionCompnent'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { questionService } from '../services/questionService'
import { answerService } from '../services/AnswerService'
// import { logger } from '../utils/Logger'
export default {
  name: 'TeamActiveGameComponent',
  setup() {
    const state = reactive({
      answer: {
        // questionId: AppState.activeQuestion.id
      }
    })
    const route = useRoute()
    onMounted(async() => {
      await questionService.getQuestionsByGameId(route.params.gameId)
      await questionService.showActiveQuestion()
    })
    return {
      state,
      activeQuestion: computed(() => AppState.activeQuestion),
      teamAnswer(questionId) {
        // logger.log('TeamActiveGame', AppState.activeQuestion)
        answerService.submitAnswer(state.answer, questionId)
      }
    }
  },
  components: { ActiveQuestionComponent }
}
</script>

<style lang="scss" scoped>

</style>
