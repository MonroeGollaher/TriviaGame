<template>
  <div class="TeamProfile container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6 d-flex flex-column align-items-center">
        <img src="//placehold.it/200" alt="team picture" class="border-circle">
        <h2>
          team.name
        </h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6">
        <!-- NOTE - League Leaderboard component -->
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6 d-flex flex-column align-items-center">
        <h5>Team Members</h5>
        <form @submit.prevent="addTeamMember()">
          <input type="text" v-model="state.newMember">
          <button type="submit">
            <i class="far fa-plus-square"></i>
          </button>
        </form>
        <ul>
          <li>
            team.memberName
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'TeamProfile',
  // props: {
  //   teamProp: Object
  // },
  setup() {
    const state = reactive({
      newMember: {}
    })
    return {
      state
      // team: computed(() => props.teamProp)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
