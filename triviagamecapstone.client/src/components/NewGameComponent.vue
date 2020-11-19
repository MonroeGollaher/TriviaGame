<template>
  <div class="newGame-component container-fluid card shadow col-3 my-3 radius25">
    <h2 class="my-1">
      New Game
    </h2>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Game Title</label>
        <input type="text" class="form-control" id="gameTitle" aria-describedby="gameTitle" placeholder="What do you want to call your game?">
      </div>
      <div class="form-group">
        <label for="questionsAmount">Number of Questions</label>
        <input type="number" class="form-control" id="questionsAmount">
      </div>
      <div class="form-group">
        <label for="questionsAmount">Room Code</label>
        <input class="form-control" id="questionsAmount">
      </div>
      <button type="submit" class="btn btn-primary mb-3">
        Create game
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewGameComponent',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
