export interface AnswerFormProps {
    answerInput: string;
    onAnswerInputChange: any;
    onSubmit: any;
}

const AnswerForm = ({
    answerInput,
    onAnswerInputChange,
    onSubmit
}: AnswerFormProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onAnswerInputChange(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === "Enter") {
            // make sure page doesn't reload
            e.preventDefault();
            onSubmit();
        }
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
