<!-- //NOTE - This is a form that allows a host to create a new game and determine the number of questions to get from the api -->
<template>
  <div class="newGame-component container-fluid card shadow col-12 my-3 radius25 p-4">
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
        <input type="number"
               class="form-control"
               id="questionsAmount"
               placeholder="20 questions max"
               max="20"
               min="1"
               v-model="state.newGame.numberOfQuestions"
        >
      </div>
      <!-- <div class="form-group">
        <label for="questionsAmount">Room Pin</label>
        <input class="form-control" id="questionsAmount" placeholder="Please enter a 8 digit code" minlength="8" v-model="state.newGame.roomPin">
      </div> -->
      <button type="submit" class="btn btn-primary mb-3">
        Create game
      </button>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { gameService } from '../services/GameService'
// import { logger } from '../utils/Logger'
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
        // logger.log(state.newGame)
        gameService.createGame(state.newGame)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
