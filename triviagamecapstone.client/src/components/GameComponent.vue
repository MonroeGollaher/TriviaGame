<!-- //NOTE - This component that displays the title of a game that the host has created and allows them to launch the game or delete it -->
<template>
  <div class="game-component container-fluid">
    <div class="row align-items-center border-rounded bg-light shadow my-3 radius25 p-4">
      <div class="col-10 align-items-center">
        <h5 class="mb-0">
          {{ gameProp.title }}
        </h5>
      </div>
      <div class="col-2 d-flex">
        <button class="btn bg-transparent text-success" @click="startGame(game._id)">
          <i class="far fa-play-circle"></i>
        </button>
        <button class="btn bg-transparent text-danger" @click="deleteGame(game._id)">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { gameService } from '../services/GameService'
import { useRouter } from 'vue-router'
import { questionService } from '../services/questionService'

export default {
  name: 'GameComponent',
  props: {
    gameProp: Object
  },
  setup(props) {
    const router = useRouter()
    onMounted(async() => {
      await questionService.getQuestions(props.gameProp.numberOfQuestions, props.gameProp._id)
    }
    )
    return {
      game: computed(() => props.gameProp),
      startGame(gameId) {
        router.push({ name: 'ActiveGamePage', params: { gameId: gameId } })
      },
      deleteGame(gameId) {
        gameService.deleteGame(gameId)
      }
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
  // h5 {
  //   color: var(--dark);
  // }
</style>
