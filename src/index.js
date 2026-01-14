import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const theme = extendTheme({
  colors: {
    brand: {
      900: '#1A202C', // Темно-синий/почти черный для фона
      800: '#2D3748',
      700: '#4A5568',
      600: '#CBD5E0', // Светлый фон
      500: '#E5D5C5', // Песочный для кнопок
    },
  },
  fonts: {
    heading: 'Montserrat, sans-serif', // Или другой жирный шрифт
    body: 'Inter, sans-serif',
  },
  // Другие настройки...
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
  <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    
   
  </React.StrictMode>
);

reportWebVitals();
