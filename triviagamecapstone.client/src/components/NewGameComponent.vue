<template>
  <div class="newGame-component container-fluid card shadow col-3 my-3 radius25">
    <h2 class="my-1">
      New Game
    </h2>
    <form @submit="createGame">
      <div class="form-group">
        <label for="exampleInputEmail1">Game Title</label>
        <input type="text"
               class="form-control"
               id="gameTitle"
               aria-describedby="gameTitle"
               placeholder="What do you want to call your game?"
               v-model="state.newGame.title"
        >
      </div>
      <div class="form-group">
        <label for="questionsAmount">Number of Questions</label>
        <input type="number" class="form-control" id="questionsAmount" v-model="state.newGame.numberOfQuestions">
      </div>
      <div class="form-group">
        <label for="questionsAmount">Room Code</label>
        <input class="form-control" id="questionsAmount">
      </div>
      <button type="submit" class="btn btn-primary mb-3" @click="getQuestions(state.newGame.numberOfQuestions)">
        Create game
      </button>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { gameService } from '../services/GameService'
export default {
  name: 'NewGameComponent',
  components: {},
  setup() {
    const state = reactive({
      newGame: {

      }
    })
    onMounted(async() => {
      await gameService.getGames()
    })
    return {
      state,
      createGame() {
        gameService.createGame(state.newGame)
      },
      getQuestions() {
        gameService.getQuestions(state.newGame.numberOfQuestions)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
