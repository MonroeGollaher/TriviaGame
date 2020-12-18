<!-- //NOTE - This page holds the current game and displays the host or team view depending on who is logged in to the app -->
<template>
  <div class="ActiveGamePage container-fluid">
    <!-- //NOTE - This component is the view that is displayed to the host -->
    <AdminActiveGameComponent v-if="authService.hasRoles('Host')" />
    <!-- //NOTE - This component is the view that is displayed to the teams -->
    <TeamActiveGameComponent v-if="!authService.hasRoles('Host')" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import socketService from '../services/SocketService'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { gameService } from '../services/GameService'
import { questionService } from '../services/questionService'

export default {
  name: 'ActiveGamePage',
  components: { },
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await gameService.getGames()
      await gameService.getActiveGame(route.params.gameId)
      await questionService.getQuestionsByGameId(route.params.gameId)
      await questionService.showActiveQuestion()
      socketService.joinRoom('activeGame')
    })
    onBeforeRouteLeave((to, from, next) => {
      socketService.leaveRoom('activeGame')
      next()
    })
    return {
      user: computed(() => AppState.user),
      authService: computed(() => AuthService)
    }
  }
}
</script>

<style lang="scss" scoped>
.ActiveGamePage {
  background-color: var(--secondary);
}
</style>
