import classes from "./QuizContainer.module.css";
import { Quiz } from "../../../store/quizContext/QuizContext.types";
import uniqolor from "uniqolor";
import { useQuiz } from "../../../store";
import { useHistory } from "react-router-dom";

export const QuizContainer = ({ id, name, image, description }: Quiz) => {
  const color = uniqolor.random({
    saturation: 80,
    lightness: [30, 50],
  });

  const { getQuiz, setQuizLoading, dispatch: quizDispatch } = useQuiz();
  const { push } = useHistory();

  const playQuiz = () => {
    getQuiz(id, quizDispatch, setQuizLoading, false);
    push("/rules");
  };

  return (
    <li
      className={classes["quiz-container"]}
      style={
        image
          ? {
              backgroundImage: ` linear-gradient(
                                rgba(0, 0, 0, 0.5),
                                rgba(0, 0, 0, 1)
                              ),url(${image})`,
            }
          : { backgroundColor: `${color.color}` }
      }
    >
      <h1 className={classes["quiz-name"]}>{name}</h1>
      {description ? (
        <p className={classes["quiz-description"]}>{description}</p>
      ) : (
        <p className={classes["quiz-description"]}>
          Hey this is a test string for now
        </p>
      )}
      <button className={classes["quiz-button"]} onClick={playQuiz}>
        <span>Play Quiz!</span>
      </button>
    </li>
  );
};
