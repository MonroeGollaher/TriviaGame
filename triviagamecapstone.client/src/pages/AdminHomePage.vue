<!-- //NOTE - This page displays the form for the host to create a new game and the games that the host has already created -->
<template>
  <div class="adminHomePage container-fluid">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4 text-center">
          Welcome, host name!
        </h1>
      </div>
    </div>
    <div class="row">
      <NewGame-component />
      <game-component v-for="g in games" :key="g" :game-prop="g" />
    </div>
  </div>
</template>

<script>
import NewGameComponent from '../components/NewGameComponent'
import GameComponent from '../components/GameComponent'
import { computed, onMounted } from 'vue'
import { gameService } from '../services/GameService'
import { AppState } from '../AppState'
export default {
  name: 'AdminHomePage',
  components: { NewGameComponent, GameComponent },
  setup() {
    onMounted(async() => {
      await gameService.getGames()
    })
    return {
      games: computed(() => AppState.games)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
