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
          Room Code
        </p>
        <form @submit="joinGame()">
          <input type="text" v-model="state.activeGame.roomNumber">
          <button type="submit" class="btn btn-success">
            Join
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'TeamJoinGame',
  setup() {
    const state = reactive({
      activeGame: {}
    })
    return {
      state,
      joinGame() { }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
