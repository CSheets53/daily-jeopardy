import { useEffect, useState } from "react";
import AnswerForm from "./AnswerForm";
import Question from "./Question";
import { underscoreString } from "../util/StringUtils";

const MainDisplay = () => {
    const correctMessage = "Correct!";
    const incorrectMessage = "Incorrect!";

    // api states
    const [loading, setLoading] = useState(true);
    const [questionData, setQuestionData] = useState(null);

    // user input states
    const [answerInput, setAnswerInput] = useState('');
    const [currentCensoredAnswer, setCurrentCensoredAnswer] = useState('');
    const [numAttempts, setNumAttempts] = useState(0);
    const [resultMessage, setResultMessage] = useState('');

    // tracks when to call useEffect again
    const [callAgain, setCallAgain] = useState(false);

    // get question
    const getRandomQuestion = async () => {
        const response = await fetch("http://jservice.io/api/random");
        const data = await response.json();
        setQuestionData(data[0]);
        setLoading(false);
    };

    // want to call when page loads
    useEffect(() => {
        getRandomQuestion();
    }, [callAgain]);

    if (loading) {
        return <div>Fetching data...</div>;
    }

    if (!questionData) {
        // TODO: not sure this is the best way to do it
        return <div>No question here</div>;
    }

    // the correct answer
    const { answer } = questionData;

    const handleSubmit = () => {
        if (answerInput.toLocaleLowerCase() === String(answer).toLocaleLowerCase()) {
            setResultMessage(correctMessage);
        } else {
            setResultMessage(incorrectMessage);

            // TODO: fill in letters that have been guessed
            const censoredAnswer = underscoreString(answer);
            setCurrentCensoredAnswer(censoredAnswer);
        }

        setNumAttempts(numAttempts + 1);
        setAnswerInput('');
    };

    const resetQuestion = () => {
        setAnswerInput('');
        setLoading(true);
        setResultMessage('');
        setNumAttempts(0);

        // recalls the useEffect function
        setCallAgain(!callAgain);
    }

    return (
        <>
            <Question
                questionData={questionData}
            />
            {
                (resultMessage === incorrectMessage) && (
                    <div>
                        <p>{currentCensoredAnswer}</p>
                    </div>
                )
            }
            <AnswerForm
                answerInput={answerInput}
                onSubmit={handleSubmit}
                onAnswerInputChange={setAnswerInput}
            />
            {
                resultMessage && (
                <div>
                    <p>{resultMessage}</p>
                    <p>{numAttempts} Attempts</p>
                </div>)
            }
            <button onClick={resetQuestion}>Get new question</button>
        </>
    );
}

export default MainDisplay;
