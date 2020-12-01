import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  // listener
  profile: {},
  games: [],
  activeGame: {},
  questions: [],
  // listener
  activeQuestion: {},
  gameQuestions: [],
  // listener
  teamAnswers: [],
  // listener
  gameTeams: []
})
