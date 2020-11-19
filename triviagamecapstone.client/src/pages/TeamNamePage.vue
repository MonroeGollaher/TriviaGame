<template>
  <div class="TeamName container-fluid">
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <h3>
          Set Team Name
        </h3>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <form @submit="setTeamName()">
          <input type="text" v-model="state.team.name">
          <button type="submit" class="btn btn-success">
            Play
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'TeamName',
  setup() {
    const state = reactive({
      team: {}
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
