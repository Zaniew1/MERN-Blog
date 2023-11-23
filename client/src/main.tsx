import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import './root.css';
import {BrowserRouter} from 'react-router-dom';
import { AuthContextProvider } from './store/Auth-context.tsx';
import { UIContextProvider } from './store/UI-context.tsx';
import { ErrorContextProvider } from './store/Error-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthContextProvider>
      <UIContextProvider>
        <ErrorContextProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
        </ErrorContextProvider>
      </UIContextProvider>
    </AuthContextProvider>
)