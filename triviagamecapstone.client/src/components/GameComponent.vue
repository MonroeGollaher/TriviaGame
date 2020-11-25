<!-- //NOTE - This component that displays the title of a game that the host has created and allows them to launch the game or delete it -->
<template>
  <div class="game-component container-fluid">
    <div class="col-8">
      <div class="row justify-content-between align-items-center border-rounded bg-light shadow my-3 radius25">
        <div class="col-4">
          <h5 class="mb-0">
            {{ gameProp.title }}
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
</style>
