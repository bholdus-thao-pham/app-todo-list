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
                taskList : state.taskList.concat(new Todo(action.title, action.status))
            };
        case 'remove':
            return {
                ...state,
                taskList: state.taskList.filter(item => item.id !== action.id)
            }
        case 'update':
            return {
                ...state,
                taskList: state.taskList.map(item => {
                    if(item.id === action.data.id){
                        return action.data
                    }
                    return item;
                })
            }
        case 'toggle':
            return {
                ...state,
                isOpenDetailModal: !state.isOpenDetailModal,
                selectedTask: action.selectedTask
            }

        default:
            return {...state}
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