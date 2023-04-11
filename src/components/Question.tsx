import { makePrettyDate } from "../util/DateUtils";

export interface QuestionProps {
    questionData: {
        question: string;
        value: number;
        airdate: string;
        category: {
            title: string;
        };
    };
}

const Question = ({
    questionData
}: QuestionProps) => {
    const { 
        question, 
        value, 
        airdate, 
        category 
    } = questionData;

    const categoryTitle = category.title.toLocaleUpperCase();
    const questionDate = makePrettyDate(airdate);

    return (
        <div>
            <h1>Category: {categoryTitle}</h1>
            <h2>{question}</h2>
            <h3>Airdate: {questionDate}</h3>
            <h3>Points: {value}</h3>
        </div>
    );
}

export default Question;
