import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TaskContextProvider from './store/task-context';
import {Provider} from 'react-redux';
import store, { persiststore } from './store/index'
import DetailTaskModal from './components/DetailTaskModal';
import { PersistGate } from 'redux-persist/lib/integration/react';

ReactDOM.render (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persiststore}>
        <TaskContextProvider>
            <App/>
        </TaskContextProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
