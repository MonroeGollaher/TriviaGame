<!--// NOTE - This component displays the current question to the host and teams, and displays the answer and next question option to the host -->
<template>
  <div class="activeQuestion-component container-fluid radius25 card shadow justify-content-center p-4" v-if="activeQuestion && lastQuestion">
    <h3>Question:</h3>
    <p v-html="activeQuestion.question">
    </p>
    <div v-if="authService.hasRoles('Host')">
      <h3>Answer:</h3>
      <p v-html="activeQuestion.answer">
      </p>
      <h3>Wrong Answers:</h3>
      <wrong-answer-component v-for="wrongAnswer in wrongAnswers" :wrong-answer-prop="wrongAnswer" :key="wrongAnswer" />
      <div class="d-flex justify-content-between">
        <button @click="previousQuestion" class="btn btn-warning text-light">
          Previous
        </button>
        <button @click="nextQuestion" class="btn btn-primary text-light" v-if="activeQuestion._id !== lastQuestion._id">
          Next Question
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { questionService } from '../services/questionService'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { useRoute } from 'vue-router'

export default {
  name: 'ActiveQuestionComponent',
  setup(props) {
    const route = useRoute()
    // const router = useRouter()
    onMounted(async() => {
      await questionService.showActiveQuestion()
    })
    return {
      activeQuestion: computed(() => AppState.activeQuestion),
      wrongAnswers: computed(() => AppState.wrongAnswers),
      lastQuestion: computed(() => AppState.gameQuestions[AppState.gameQuestions.length - 1]),
      authService: computed(() => AuthService),
      async nextQuestion() {
        questionService.nextQuestion(route.params.gameId)
      },
      async previousQuestion() {
        questionService.previousQuestion(route.params.gameId)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
