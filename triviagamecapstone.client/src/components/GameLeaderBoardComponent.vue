<!-- //NOTE - This component displays the team's name, current score, and allows the host to disqualify a team if necessary -->
<template>
  <div class="GameLeaderBoard container-fluid">
    <div class="row p-2 mb-2">
      <div class="col-6 d-flex align-items-center">
        <p class="mb-0">
          {{ team.teamName }}
        </p>
        <p class="ml-3 mb-0">
          {{ team.currentPoints }}
        </p>
      </div>
      <div class="col-6 d-flex justify-content-end align-items-center">
        <button class="btn btn-sm btn-danger" @click="removeTeam()">
          Disqualify
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { gameService } from '../services/GameService'
export default {
  name: 'GameLeaderBoard',
  props: {
    teamProp: Object
  },
  setup(props) {
    return {
      team: computed(() => props.teamProp),
      removeTeam() {
        gameService.removeTeam(teamId)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
