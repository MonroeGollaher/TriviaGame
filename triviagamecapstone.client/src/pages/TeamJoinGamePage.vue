<!-- //NOTE - This page is displayed after a team has logged in and allows the team to input a room code and join the active game -->
<template>
  <div class="TeamJoinGame container-fluid align-items-center">
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <h3 class="font-weight-bold">
          Join A Game
        </h3>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <p>
          Please enter team name & room code
          <!-- TODO  need to add game id to profile under currentGame -->
        </p>
        <form @submit="joinGame()">
          <div class="p-2">
            <input type="text" placeholder="Team Name" v-model="state.profile.teamName">
          </div>
          <div class="p-2">
            <input type="text" placeholder="Room Code" v-model="state.profile.gameId">
          </div>
          <div class="p-2">
            <button type="submit" class="btn btn-success">
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
      joinGame() {
        gameService.joinGame(state.profile)
        router.push({ name: 'ActiveGamePage', params: { gameId: state.profile.gameId } })
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
