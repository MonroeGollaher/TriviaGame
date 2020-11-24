<template>
  <div class="activeQuestion-component container-fluid radius25 card shadow justify-content-center p-2">
    <h3>Question:</h3>
    <p v-if="activeQuestion">
      {{ activeQuestion.question }}
    </p>
    <div v-if="authService.hasRoles('Host')">
      <h3>Answer:</h3>
      <p v-if="activeQuestion">
        {{ activeQuestion.answer }}
      </p>
      <button @click="nextQuestion" class="btn btn-primary text-light">
        Next Question
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { gameService } from '../services/GameService'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'

export default {
  name: 'ActiveQuestionComponent',
  setup(props) {
    onMounted(async() => {
      await gameService.showActiveQuestion()
    })
    return {
      activeQuestion: computed(() => AppState.activeQuestion),
      authService: computed(() => AuthService),
      nextQuestion() {
        gameService.nextQuestion()
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
