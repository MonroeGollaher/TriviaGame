<!-- //NOTE - This page is displayed after a team has logged in and allows the team to input a room code and join the active game -->
<template>
  <div class="TeamJoinGame container-fluid">
    <div class="row text-center mt-5">
      <h3 class="col-12 col-lg-6 font-weight-bold">
        Join A Game
      </h3>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <p class="text-center">
          Please enter team name & room code
          <!-- TODO  need to add game id to profile under currentGame -->
        </p>
        <form @submit.prevent="joinGame()" class="d-flex flex-column justify-content-center align-items-center">
          <div class="p-2">
            <input type="text" placeholder="Team Name" v-model="state.profile.teamName">
          </div>
          <div class="p-2">
            <input type="text" placeholder="Room Pin" v-model="state.profile.roomPin">
          </div>
          <div class="p-2 align-self-start ml-5 pl-4">
            <button type="submit" class="btn btn-dark text-white">
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { gameService } from '../services/GameService'
import { logger } from '../utils/Logger'
import { useRouter } from 'vue-router'

export default {
  name: 'TeamJoinGame',
  setup() {
    const state = reactive({
      profile: {}
    })
    const router = useRouter()
    return {
      state,
      async joinGame() {
        const teamProfile = await gameService.joinGame(state.profile)
        logger.log(teamProfile)
        router.push({ name: 'ActiveGamePage', params: { gameId: teamProfile.currentGame } })
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.TeamJoinGame {
  background-color: var(--secondary);
}
h3, p {
  color:  #ebebeb;
}
</style>
