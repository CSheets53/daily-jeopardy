import { useEffect, useState } from "react";
import AnswerForm from "./AnswerForm";
import Question from "./Question";
import { removeTags, underscoreString } from "../util/StringUtils";

const MainDisplay = () => {
    const correctMessage = "Correct!";
    const incorrectMessage = "Incorrect!";

    // api states
    const [loading, setLoading] = useState(true);
    const [questionData, setQuestionData] = useState<any>(null);

    // user input states
    const [answerInput, setAnswerInput] = useState('');
    const [currentCensoredAnswer, setCurrentCensoredAnswer] = useState('');
    const [displayAnswer, setDisplayAnswer] = useState(false);
    const [numAttempts, setNumAttempts] = useState(0);
    const [resultMessage, setResultMessage] = useState('');

    // tracks when to call useEffect again
    const [callAgain, setCallAgain] = useState(false);

    // get question
    const getRandomQuestion = async () => {
        const response = await fetch("https://jservice.io/api/random");
        const data = await response.json();
        setQuestionData(data[0]);
        setLoading(false);
    };

    const resetStates = () => {
        setLoading(true);
        
        setAnswerInput('');
        setDisplayAnswer(false);
        setNumAttempts(0);
        setResultMessage('');
    }

    // want to call when page loads
    useEffect(() => {
        resetStates();

        try {
            getRandomQuestion();
        } catch (e) {
            // TODO: more robust error handling
            console.log("Error fetching data.");
        }
    }, [callAgain]);

    if (loading) {
        return <div>Fetching data...</div>;
    }

    if (!questionData) {
        // TODO: not sure this is the best way to do it
        return <div>No question here</div>;
    }

    // the correct answer
    const answer = removeTags(questionData.answer);

    const handleSubmit = () => {
        if (answerInput.toLocaleLowerCase() === String(answer).toLocaleLowerCase()) {
            setResultMessage(correctMessage);
        } else if (answerInput === '') {
            // don't do anything
            setResultMessage('');
        } else {
            setResultMessage(incorrectMessage);

            const censoredAnswer = underscoreString(answerInput, answer);
            setCurrentCensoredAnswer(censoredAnswer);
        }

        setNumAttempts(numAttempts + 1);
        setAnswerInput('');
    };

    const resetQuestion = () => {
        // recalls the useEffect function
        setCallAgain(!callAgain);
    }

    const showAnswer = () => {
        setDisplayAnswer(true);
        setResultMessage('');
    }

    // TODO: make the conditionals neater by extracting to components
    // TODO: dynamic display for number of attempts (i.e. attempt vs attempts)
    return (
        <>
            <Question
                questionData={questionData}
            />
            {
                ((resultMessage === incorrectMessage) && (
                    <div>
                        <p>{currentCensoredAnswer}</p>
                    </div>
                )) || ((resultMessage === correctMessage || displayAnswer) && (
                    <div>
                        <p><b>{answer}</b></p>
                    </div>
                ))
            }

            {
                (resultMessage !== correctMessage && !displayAnswer) && (
                    <AnswerForm
                        answerInput={answerInput}
                        onSubmit={handleSubmit}
                        onAnswerInputChange={setAnswerInput}
                    />
                )
            }

            {
                resultMessage && (
                <div>
                    <p>{resultMessage}</p>
                    <p>{numAttempts} Attempt(s)</p>
                </div>)
            }

            <button onClick={resetQuestion}>Get new question</button>
            <button onClick={showAnswer}>Show Answer</button>
        </>
    );
}

export default MainDisplay;
