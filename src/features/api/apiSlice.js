import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://opentdb.com",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/api_category.php`,
      transformResponse: (response) => response.trivia_categories,
    }),
    getQuestions: builder.query({
      query: ({ category, difficulty, type }) =>
        `/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`,
      transformResponse: (response) =>
        // reformat results to include the answers in the object
        response.results?.map((questions, index) => {
          // object to store each question with their respective answers
          const formattedQuestion = {
            question: questions.question,
          };
          formattedQuestion.id = index;
          // load answers into array
          const answerChoices = [...questions.incorrect_answers];
          // object to track location of correct answer and
          // prevent correct answer from being in the same place everytime
          // answers are displayed
          formattedQuestion.answer = questions.correct_answer;
          // splice correct answer into array with incorrect answers
          answerChoices.splice(
            Math.floor(Math.random() * 4),
            0,
            questions.correct_answer
          );
          // Add array to object to enable mapping for display
          // Add answer choices to array
          formattedQuestion.answerChoices = [...answerChoices];

          return formattedQuestion;
        }),
    }),
  }),
});
export const { useGetCategoriesQuery, useGetQuestionsQuery } = apiSlice;
