import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  // listener, completed
  profile: {},
  games: [],
  activeGame: {},
  questions: [],
  // listener. completed.
  activeQuestion: {},
  wrongAnswers: [],
  gameQuestions: [],
  // listener
  teamAnswers: [],
  // listener, completed
  gameTeams: [],
  teamRanking: []
})
