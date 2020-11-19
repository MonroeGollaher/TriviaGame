<template>
  <div class="TeamHalfTime container-fluid">
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <h5>
          Point Standing: TeamPoints
        </h5>
        <p>
          Half-Time Question
        </p>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <h3>
          HalfTimeQuestion
        </h3>
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <form @submit="teamAnswer()">
          <input type="text" v-model="state.question.pointWager" placeholder="Point Wager">
          <input type="text" v-model="state.question.answer" placeholder="Team Answer">
          <button type="submit" class="btn btn-success">
            Submit Answer
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-6">
        <button>
          View Standings (launch sweet alert with standings)
          <!-- NOTE - Standings Component in alert -->
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-6-lg">
        <button @click="forfietGame()" class="btn btn-danger">
          Forfiet Game?
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamHalfTime',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
