import { AnyAction, createStore } from "redux";
import Todo from "../models/todo";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

export type TaskStateObj = {
    taskList: Todo[];
    isOpenDetailModal: boolean;
    selectedTask: Todo
}

const initialState: TaskStateObj = {
    taskList: [],
    isOpenDetailModal: false,
    selectedTask: {} as Todo
}

const taskReducer = (state = initialState, action : AnyAction): TaskStateObj => {
    switch(action.type){
        case 'add':
            return {
                ...state,
                taskList : state.taskList.concat(action.payload)
            };
        case 'remove':
            return {
                ...state,
                taskList: state.taskList.filter(item => item.id !== action.payload)
            }
        case 'update':
            return {
                ...state,
                taskList: state.taskList.map(item => {
                    if(item.id === action.payload.id){
                        return action.payload
                    }
                    return item;
                })
            }
        case 'toggle':
            return {
                ...state,
                isOpenDetailModal: !state.isOpenDetailModal,
                selectedTask: action.payload
            }

        default:
            return state
        }

}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['taskList']
}

const persistedReducer = persistReducer(persistConfig, taskReducer)

export type ReducerType = ReturnType<typeof taskReducer>
const store = createStore(persistedReducer);

export const persiststore = persistStore(store);

export default store;