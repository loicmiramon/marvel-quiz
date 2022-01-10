import React, { Component } from 'react'
import Levels from '../levels'
import ProgressBar from '../ProgressBar'
import { QuizMarvel } from '../quizMarvel'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import QuizOver from '../quizzOver'
import { FaChevronRight } from 'react-icons/fa'

toast.configure()

const levelNames = ["debutant", "confirme", "expert"]
const initialState = {
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestion: [],
  question: null,
  options: [],
  idQuestion: 0,
  btnDisabled: true,
  userAnswer: null,
  score: 0,
  showWelcomeMsg: false,
  quizEnd: false,
  percent: null
};

class Quiz extends Component {

  constructor(props) {
    super(props)

    this.state = initialState;
    this.storedDataRef = React.createRef();

  }


  loadQuestion = quizz => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    if(fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz
      const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => {
        return keepRest
      })
      this.setState({
        storedQuestion: newArray
      })
    }
  };

  showToastMsg = pseudo => {
    if(!this.state.showWelcomeMsg) {
      this.setState({
        showWelcomeMsg: true
      })
      toast.warn(`Bienvenue ${pseudo}, et bonne chance`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });
    }
  }

  componentDidMount() {
    this.loadQuestion(levelNames[this.state.quizLevel])
  }

  componentDidUpdate(prevProps, prevState) {

    const {
      maxQuestions,
      storedQuestion,
      idQuestion,
      quizEnd,
      score
    } = this.state

    if((storedQuestion !== prevState.storedQuestion) && storedQuestion.length) {
      this.setState({
        question: storedQuestion[idQuestion].question,
        options: storedQuestion[idQuestion].options
      })
    }

    if((idQuestion !== prevState.idQuestion) && storedQuestion.length) {
      this.setState({
        question: storedQuestion[idQuestion].question,
        options: storedQuestion[idQuestion].options,
        userAnswer: null,
        btnDisabled: true
      })
    }

    if(quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercentage(maxQuestions, score)
      this.gameOver(gradePercent)
    }

    if(this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo)
    }
  }

  submitAnswer = selectedAnswer => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false
    })
  }

  getPercentage = (maxQuest, ourScore) => {
    return (ourScore / maxQuest) * 100
  }

  gameOver = percent => {
    if(percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent
      })
    } else {
      this.setState({
        percent
      })
    }
  }

  nextQuestion = () => {
    if(this.state.idQuestion === this.state.maxQuestions - 1) {
      this.setState({
        quizEnd: true
      })
    } else {
      this.setState(prevState => ({
        idQuestion: prevState.idQuestion +1
      }))
    }

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if(this.state.userAnswer === goodAnswer) {
      this.setState(prevState => ({
        score: prevState.score + 1
      }) )

      toast.success('Bravo +1', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastify-color"
      });
    } else {
      toast.error('Raté 0', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastify-color"
        });
    }
  }

  loadLevelQuestions = param => {
    this.setState({
      ...this.initialState, quizLevel : param
    })
    this.loadQuestion(levelNames[param])
  }
 
 
  render() {

    const {
      quizLevel,
      maxQuestions,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      quizEnd,
      percent
    } = this.state

    const displayOptions = options.map((option, index) => {
      return <p className={`answerOptions ${userAnswer === option ? "selected" : null}`} 
      onClick={() => {this.submitAnswer(option)}} 
      key={index}><FaChevronRight />{option}</p>
    })

    return  quizEnd ? (
      <QuizOver 
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestions= {this.loadLevelQuestions}
      />
    ) : (
        <>
          <Levels 
            levelNames={levelNames}
            quizLevel={quizLevel}
          />
          <ProgressBar 
            idQuestion= {idQuestion}
            maxQuestions= {maxQuestions}
          />
          <h2>{question}</h2>
          { displayOptions }
          <button 
          className="btnSubmit" 
          disabled={btnDisabled}
          onClick={this.nextQuestion}>{idQuestion < maxQuestions - 1 ? 'Suivant' : 'Terminer'}</button>
        </>
      )
  }
}

export default Quiz
