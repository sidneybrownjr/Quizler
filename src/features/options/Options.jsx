import { Spinner } from "../../common/Spinner";
import { useGetCategoriesQuery } from "../api/apiSlice";
import {
  changeCategory,
  changeDifficulty,
  changeType,
  changeScore,
} from "./optionsSlice";

export const Options = () => {
  let content;

  // options for quiz "Difficulty"
  const difficulty = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];
  // options for quiz "Type"
  const types = [
    { id: "multiple", name: "Multiple Choice" },
    { id: "boolean", name: "True / False" },
  ];

  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery();

  // define reusable handleChange to handle each select
  let handleChange = (e) => {
    console.log(e.target.name);
  };

  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = (
      <select
        className="xl:w-full appearance-none rounded-large py-1 text-center"
        defaultValue="DEFAULT"
        name="category"
        onChange={handleChange}
      >
        <option value="DEFAULT" disabled>
          Select a Category
        </option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    );
  } else if (isError) {
    content = <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-4/6 h-1/6 md:w-5/6 md:h-3/6 flex justify-center items-center">
        <div className="items-center animate__animated animate__backInDown">
          <img className="" src="../images/quizler_logo.png" alt="quizler" />
        </div>
      </div>
      {content}
    </div>
  );
};
