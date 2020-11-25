<!-- //NOTE - This component collects the team's answers to the current question and allows the host to award points to correct answers -->

<template>
  <div class="teamAnswers-component container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-between">
        <p>{{ answers.answer }}</p>
        <input type="checkbox" @change="toggleApproval(answers._id)">
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { answerService } from '../services/AnswerService'
export default {
  name: 'TeamAnswersComponent',
  components: {},
  props: {
    answersProp: Object
  },
  setup(props) {
    return {
      answers: computed(() => props.answersProp),
      toggleApproval(answersId) {
        answerService.toggleApproval(answersId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
