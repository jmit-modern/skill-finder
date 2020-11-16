import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'

const CHANGE_CONTENT = 'table/CONTENT';
const CHANGE_DATA = 'table/DATA';
const RESET = 'table/RESET'

export const changeTable = createAction(CHANGE_CONTENT);
export const changeData = createAction(CHANGE_DATA);
export const resetTable = createAction(RESET);

const initialState = {
  text: '',
  data: {}
};

export default persistReducer(
  {
    key: 'table',
    storage:storageSession,
  },
  handleActions({
      [CHANGE_CONTENT]: (state, action) => ({...state, text: action.payload}),
      [CHANGE_DATA]: (state, action) => ({...state, data: action.payload}),
      [RESET]: () => {
        return initialState;
      },
    }, initialState)
)