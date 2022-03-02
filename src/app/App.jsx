import { Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Footer } from "../common/Footer";
import { Options } from "../features/options/Options";
import { QuizQuestions } from "../features/questions/Questions";
import { Result } from "../features/results/Results";

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
        <Route path="quiz" element={<QuizQuestions />} />
        <Route path="results" element={<Result />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
