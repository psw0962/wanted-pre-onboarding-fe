import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../pages/auth';
import Todo from '../pages/todo';
import Layout from '../components/layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Auth />} />
          <Route path="/todo" element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
