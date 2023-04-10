import { useState } from 'react';
import AnswerForm from './components/AnswerForm';

function App() {
  const [answerInput, setAnswerInput] = useState("");

  return (
    <div>
      <h1>Daily Jeopardy</h1>
      <AnswerForm
        answerInput={answerInput}
        onAnswerInputChange={setAnswerInput}
      />
    </div>
  );
}

export default App;
