import { useSelector } from "react-redux";
import { useGetQuestionsQuery } from "../api/apiSlice";
import { Spinner } from "../../common/Spinner";

const decoder = require("he").decode;

const Question = ({ question }) => {
  return (
    <article>
      <h3>{decoder(question.question)}</h3>
    </article>
  );
};

export const QuizQuestions = () => {
  let content;
  // retrieve api query options from the state
  const { category, difficulty, type } = useSelector((state) => state.options);

  // retrieve the questions
  const {
    data: questions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuestionsQuery({ category, difficulty, type });

  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = questions?.map((question) => (
      <Question key={question.id} question={question} />
    ));
  } else if (isError) {
    content = <h2>{error}</h2>;
  }

  return (
    <section>
      <h2>{content}</h2>
    </section>
  );
};
