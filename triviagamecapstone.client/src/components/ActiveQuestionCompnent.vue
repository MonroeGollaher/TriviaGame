<template>
  <div class="activeQuestion-component container-fluid radius25 card shadow justify-content-center">
    <p v-if="activeQuestion">
      {{ activeQuestion.question }}
    </p>
    <div v-if="authService.hasRoles('Host')">
      <p v-if="activeQuestion">
        {{ activeQuestion.answer }}
      </p>
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
      authService: computed(() => AuthService)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
