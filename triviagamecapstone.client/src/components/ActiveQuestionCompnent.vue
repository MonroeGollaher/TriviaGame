<!--// NOTE - This component displays the current question to the host and teams, and displays the answer and next question option to the host -->
<template>
  <div class="activeQuestion-component container-fluid radius25 card shadow justify-content-center p-2">
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
import { useRoute } from 'vue-router'

export default {
  name: 'ActiveQuestionComponent',
  setup(props) {
    const route = useRoute()
    onMounted(async() => {
      await questionService.showActiveQuestion()
    })
    return {
      activeQuestion: computed(() => AppState.activeQuestion),
      authService: computed(() => AuthService),
      nextQuestion() {
        questionService.nextQuestion(route.params.gameId)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
