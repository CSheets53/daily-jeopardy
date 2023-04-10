export interface AnswerFormProps {
    answerInput: string;
    onAnswerInputChange: any;
}

const AnswerForm = ({
    answerInput,
    onAnswerInputChange,
}: AnswerFormProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onAnswerInputChange(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === "Enter") {
            // make sure page doesn't reload
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        // TODO: answer validation stuff!
        if (answerInput) {
            console.log(`You answered ${answerInput}`);
        } else {
            console.log("You said nothing.");
        }

        onAnswerInputChange("");
    };

    return (
        <form>
            <input
                type="text"
                value={answerInput}
                placeholder="Type answer here"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </form>
    );
}

export default AnswerForm;
