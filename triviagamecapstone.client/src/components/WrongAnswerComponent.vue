<template>
  <div class="WrongAnswerComponent">
    <p v-html="wrongAnswer">
    </p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'WrongAnswerComponent',
  props: {
    wrongAnswerProp: String
  },
  setup(props) {
    return {
      wrongAnswer: computed(() => props.wrongAnswerProp),
      activeQuestion: computed(() => AppState.activeQuestion)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
