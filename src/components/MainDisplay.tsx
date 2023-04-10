import { useEffect, useState } from "react";
import AnswerForm from "./AnswerForm";
import Question from "./Question";

const MainDisplay = () => {
    const [answerInput, setAnswerInput] = useState("");
    const [questionData, setQuestionData] = useState(null);
    const [loading, setLoading] = useState(true);

    // get question
    useEffect(() => {
        async function getRandomQuestion() {
            const response = await fetch("http://jservice.io/api/random");
            const data = await response.json();
            setQuestionData(data[0]);
            setLoading(false);
        }

        getRandomQuestion();
    }, []);

    if (loading) {
        return <div>Fetching data...</div>;
    }

    if (!questionData) {
        // todo: not sure this is the best way to do it
        return <div>No question here</div>;
    }

    const { answer } = questionData;

    return (
        <>
            <Question
                questionData={questionData}
            />
            <AnswerForm
                answerInput={answerInput}
                onAnswerInputChange={setAnswerInput}
            />
        </>
    );
}

export default MainDisplay;
