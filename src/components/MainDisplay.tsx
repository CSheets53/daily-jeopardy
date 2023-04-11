import { useEffect, useState } from "react";
import AnswerForm from "./AnswerForm";
import Question from "./Question";
import { underscoreString } from "../util/StringUtils";

const MainDisplay = () => {
    const [answerInput, setAnswerInput] = useState('');
    const [questionData, setQuestionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [resultMessage, setResultMessage] = useState('');

    // there's probably a better name to use for this. basically just tracks when to call useEffect again
    const [search, setSearch] = useState(false);

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
    }, [search]);

    if (loading) {
        return <div>Fetching data...</div>;
    }

    if (!questionData) {
        // TODO: not sure this is the best way to do it
        return <div>No question here</div>;
    }

    // the correct answer
    const { answer } = questionData;
    const censoredAnswer = underscoreString(answer);

    const handleSubmit = () => {
        if (answerInput.toLocaleLowerCase() === String(answer).toLocaleLowerCase()) {
            setResultMessage("Correct!");
        } else {
            setResultMessage("Incorrect!");
        }

        setAnswerInput('');
    };

    const resetQuestion = () => {
        setAnswerInput('');
        setLoading(true);
        setResultMessage('');
        setSearch(!search);
    }

    return (
        <>
            <Question
                questionData={questionData}
            />
            <p>{answer}</p>
            <p>{censoredAnswer}</p>
            <AnswerForm
                answerInput={answerInput}
                onSubmit={handleSubmit}
                onAnswerInputChange={setAnswerInput}
            />
            {resultMessage && <p>{resultMessage}</p>}
            <button onClick={resetQuestion}>Get new question</button>
        </>
    );
}

export default MainDisplay;
