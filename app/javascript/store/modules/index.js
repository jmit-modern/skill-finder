import { combineReducers } from "redux";
import questions from './questions'
import i18n from "./i18n";
import total from "./total";
import table from "./table";

export default combineReducers({
  questions,
  i18n,
  total,
  table
});