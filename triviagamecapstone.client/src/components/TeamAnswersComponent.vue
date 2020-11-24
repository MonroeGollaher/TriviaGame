<template>
  <div class="teamAnswers-component container-fluid">
    <p>Team answer test</p>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
export default {
  name: 'TeamAnswersComponent',
  components: {},
  props: {
    answersProp: Object
  },
  setup(props) {
    return {
      answers: computed(() => AppState.teamAnswers)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
