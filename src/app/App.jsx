import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Options = lazy(() => import("../features/options/Options"));
const QuizQuestions = lazy(() => import("../features/questions/Questions"));
const Result = lazy(() => import("../features/results/Results"));

function App() {
  return (
    <div className="container flex items-center justify-center h-screen w-5/6 p-8">
      <Router>
        <Routes>
          <Route index element={<Options />} />
          <Route
            path="quiz"
            element={
              <Suspense fallback={<></>}>
                <QuizQuestions />
              </Suspense>
            }
          />
          <Route
            path="results"
            element={
              <Suspense fallback={<></>}>
                <Result />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
