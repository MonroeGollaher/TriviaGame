<template>
  <div class="GameLeaderBoard container-fluid">
    <div class="row p-2 mb-2">
      <div class="col-6 d-flex align-items-center">
        <p class="mb-0">
          TeamName
        </p>
        <p class="ml-3 mb-0">
          TeamPoints
        </p>
      </div>
      <div class="col-6 d-flex justify-content-end align-items-center">
        <button class="btn btn-danger">
          Disqualify
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { gameService } from '../services/GameService'
import { useRoute } from 'vue-router'
export default {
  name: 'GameLeaderBoard',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await gameService.getGameTeams(route.params.gameId)
    })
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
