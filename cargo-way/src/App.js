import '../src/styles/styles.css';
import { ToastContainer } from 'react-toastify';
import AppRouter from './routes/AppRouter';


function App() {

  return (
    <div className="app">
      <ToastContainer position="top-center" autoClose={3000} />
      <AppRouter />
    </div>
  );
}

export default App;
