<template>
  <div class="game-component container-fluid">
    <div class="row justify-content-between align-items-center border-rounded bg-light shadow my-3">
      <div class="col-4">
        <h5 class="mb-0">
          Game Title
        </h5>
      </div>
      <div class="col-4 d-flex py-2 justify-content-end">
        <button class="btn btn-success" @click="startGame(game._id)">
          <i class="far fa-play-circle"></i>
        </button>
        <button class="btn btn-danger ml-1" @click="deleteGame(game._id)">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { computed } from 'vue'
// import { gameService } from '../services/GameService'

export default {
  name: 'GameComponent',
  props: {
    gameProp: Object
  },
  setup() {
    return {
      // game: computed(() => props.gameProp),
      // startGame(gameId) {
      //   router.push({ name: 'ActiveGame', params: { id: gameId } })
      // },
      // deleteGame(gameId) {
      //   gameService.deleteGame(gameId)
      // }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
  i {
    font-size: 1.25em;
  }
  .game-component {
    max-width: 40vw;
  }
</style>
