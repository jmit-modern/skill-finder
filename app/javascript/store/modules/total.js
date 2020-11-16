import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'

const CHANGE_TOTAL = 'total/TOTAL';
const RESET = 'total/RESET'

export const changeTotal = createAction(CHANGE_TOTAL);
export const resetTotal = createAction(RESET);

const initialState = {
  value: 0,
};

export default persistReducer(
  {
    key: 'total',
    storage:storageSession,
  },
  handleActions({
      [CHANGE_TOTAL]: (state, action) => ({...state, value: state.value+action.payload}),
      [RESET]: () => {
        return initialState;
      },
    }, initialState)
)