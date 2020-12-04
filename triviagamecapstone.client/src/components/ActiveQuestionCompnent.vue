<!--// NOTE - This component displays the current question to the host and teams, and displays the answer and next question option to the host -->
<template>
  <div class="activeQuestion-component container-fluid radius25 card shadow justify-content-center p-4">
    <h3>Question:</h3>
    <p v-html="activeQuestion.question" v-if="activeQuestion">
    </p>
    <div v-if="authService.hasRoles('Host')">
      <h3>Answer:</h3>
      <p v-html="activeQuestion.answer" v-if="activeQuestion">
      </p>
      <button @click="nextQuestion" class="btn btn-primary text-light">
        Next Question
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { questionService } from '../services/questionService'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'ActiveQuestionComponent',
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    onMounted(async() => {
      await questionService.showActiveQuestion()
    })
    return {
      activeQuestion: computed(() => AppState.activeQuestion),
      authService: computed(() => AuthService),
      async nextQuestion() {
        const nextQuestion = questionService.nextQuestion(route.params.gameId)
        // debugger
        if (await nextQuestion === AppState.gameQuestions.length) {
          router.push({ name: 'AdminHomePage' })
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
