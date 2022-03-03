import { Suspense, lazy } from "react";
import { Container, Spinner } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Footer } from "../common/Footer";
import { Options } from "../features/options/Options";
const QuizQuestions = lazy(() => import("../features/questions/Questions"));
const Result = lazy(() => import("../features/results/Results"));

function App() {
  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      flexDir="column"
      h="100vh"
    >
      <Routes>
        <Route index element={<Options />} />
        <Route
          path="quiz"
          element={
            <Suspense
              fallback={
                <Spinner
                  thickness="4px"
                  speed="0.60s"
                  emptyColor="gray.200"
                  color="blue.500"
                  boxSize={20}
                />
              }
            >
              <QuizQuestions />
            </Suspense>
          }
        />
        <Route
          path="results"
          element={
            <Suspense
              fallback={
                <Spinner
                  thickness="4px"
                  speed="0.60s"
                  emptyColor="gray.200"
                  color="blue.500"
                  boxSize={20}
                />
              }
            >
              <Result />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
