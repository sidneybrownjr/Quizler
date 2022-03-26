import { Suspense, lazy } from 'react';
import { Container } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '../common/Spinner';
import { Options } from '../features/options/Options';
import { Footer } from '../common/Footer';

const QuizQuestions = lazy(() => import('../features/questions/Questions'));
const Result = lazy(() => import('../features/results/Results'));
const PageNotFound = lazy(() => import('../common/PageNotFound'));

function App() {
  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      flexDir="column"
      h="100vh"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route index element={<Options />} />
          <Route path="/quiz" element={<QuizQuestions />} />
          <Route path="/results" element={<Result />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </Container>
  );
}

export default App;
