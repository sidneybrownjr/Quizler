import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/*
    Code 0: Success Returned results successfully.
    Code 1: No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
    Code 2: Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)
    Code 3: Token Not Found Session Token does not exist.
    Code 4: Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.
*/

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
