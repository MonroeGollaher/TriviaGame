<!-- //NOTE - This page displays the form for the host to create a new game and the games that the host has already created -->
<template>
  <div class="adminHomePage container-fluid">
    <div class="container">
      <h1 class="text-center my-5">
        Welcome, {{ profile.name }}!
      </h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-4">
        <NewGame-component />
      </div>
      <div class="col-6">
        <game-component v-for="g in games" :key="g" :game-prop="g" />
      </div>
    </div>
  </div>
</template>

<script>
import NewGameComponent from '../components/NewGameComponent'
import GameComponent from '../components/GameComponent'
import { computed, onMounted } from 'vue'
import { gameService } from '../services/GameService'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
export default {
  name: 'AdminHomePage',
  components: { NewGameComponent, GameComponent },
  setup() {
    onMounted(async() => {
      await gameService.getGames()
      await profileService.getProfile()
    })
    return {
      games: computed(() => AppState.games),
      profile: computed(() => AppState.profile)
    }
  }
}
</script>

<style lang="scss" scoped>
.adminHomePage{
  background-color: var(--secondary);
}
h1{
  color:  #ebebeb;
}
</style>
