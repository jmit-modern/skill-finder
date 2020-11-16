import { createStore } from "redux";
import modules from './modules';
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import storageSession from 'redux-persist/lib/storage/session';

// const persistConfig = {
//   key: 'root',
//   storage:storageSession,
// }

// const persistedReducer = persistReducer(persistConfig, modules)

const configureStore = () => {
  const store = createStore(modules);
  return store;
}

export default configureStore;