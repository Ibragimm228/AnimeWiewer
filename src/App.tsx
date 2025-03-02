import { Route, Routes } from 'react-router-dom';
import { Layout } from './views/components';
import { AnimePage, Franchises, Genres, Home } from './views/pages';
import { AnimeDetailed } from './views/pages/AnimeDetailed/AnimeDetailed';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} index />
          <Route path="/genres" element={<Genres />} />
          <Route path="/franchises" element={<Franchises />} />
          <Route path="/anime" element={<AnimePage />} />
          <Route path="/release/:title_code" element={<AnimeDetailed />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
