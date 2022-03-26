import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://opentdb.com',
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/api_category.php`,
      transformResponse: (response) => response.trivia_categories,
    }),
    getQuestions: builder.query({
      query: ({ category, difficulty, type }) => {
        let url = '/api.php?amount=10';
        if (category) {
          url += category;
        }
        if (difficulty) {
          url += difficulty;
        }
        if (type) {
          url += type;
        }
        return url;
      },
      keepUnusedDataFor: 15,
      transformResponse: (response) =>
        // original response has correct and incorrect answers in separate key/values
        // reformat results to include all answers inside one array
        /*
        reformattedQuestion = {
          id: ,
          question: ,
          answer: ,
          answerChoices: 
        }
        */
        response.results?.map((questions, index) => {
          const reformattedQuestion = {
            id: index,
            question: questions.question,
            answer: questions.correct_answer,
          };

          let answerChoices = questions.incorrect_answers.slice();

          answerChoices.splice(
            Math.floor(Math.random() * 4),
            0,
            questions.correct_answer
          );

          reformattedQuestion.answerChoices = answerChoices;

          return reformattedQuestion;
        }),
    }),
  }),
});
export const { useGetCategoriesQuery, useGetQuestionsQuery } = apiSlice;
