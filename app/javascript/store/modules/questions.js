import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'

const CHANGE_PROJECTNAME = 'questions/PROJECTNAME';
const CHANGE_REQUIREMENT = 'questions/CHANGE_REQUIREMENT'
const CHANGE_APPTARGET = 'questions/APP_TARGET'
const CHANGE_DASHBOARD = 'questions/ADMIN_DASHBOARD'
const CHANGE_PROJECTFEATURE = 'questions/PROJECT_FEATURE'
const CHANGE_DEVLANGUAGE = 'questions/DEV_LANGUAGE'
const CHANGE_FRONTEND = 'questions/FRONTEND'
const CHANGE_DATABASE = 'questions/DATABASE'
const CHANGE_TECHNOLOGY = 'questions/TECHNOLOGY'
const CHANGE_NONFUNCTIONS = 'questions/NONFUNCTIONS'
const CHANGE_INFRASTRUCTURE = 'questions/INFRASTRUCTURE'
const CHANGE_DESIGNER = 'questions/DESIGNER'
const CHANGE_PRIORITY = 'questions/PRIORITY'
const RESET = 'questions/RESET'

export const change = createAction(CHANGE_PROJECTNAME);
export const changeRequirement = createAction(CHANGE_REQUIREMENT);
export const changeAppTarget = createAction(CHANGE_APPTARGET);
export const changeAdminDashboard = createAction(CHANGE_DASHBOARD);
export const changeProjectFeature = createAction(CHANGE_PROJECTFEATURE);
export const changeDevLanguage = createAction(CHANGE_DEVLANGUAGE);
export const changeFrontend = createAction(CHANGE_FRONTEND);
export const changeDatabase = createAction(CHANGE_DATABASE);
export const changeTechnology = createAction(CHANGE_TECHNOLOGY);
export const changeNonFunctions = createAction(CHANGE_NONFUNCTIONS);
export const changeInfrastructure = createAction(CHANGE_INFRASTRUCTURE);
export const changeDesigner = createAction(CHANGE_DESIGNER);
export const changePriority = createAction(CHANGE_PRIORITY);
export const reset = createAction(RESET);

const initialState = {
  projectName: '',
  requirements: '',
  appTarget: '',
  adminDashboard: '',
  projectFeature: '',
  devLanguage: '',
  frontend: '',
  database: '',
  technology: [],
  nonFunctions: [],
  infrastructure: '',
  designer: [],
  priority: '',
};

export default persistReducer(
  {
    key: 'questions',
    storage:storageSession,
  },
  handleActions({
      [CHANGE_PROJECTNAME]: (state, action) => ({...state, projectName: action.payload}),
      [CHANGE_REQUIREMENT]: (state, action) => ({...state, requirements: action.payload}),
      [CHANGE_APPTARGET]: (state, action) => ({...state, appTarget: action.payload}),
      [CHANGE_DASHBOARD]: (state, action) => ({...state, adminDashboard: action.payload}),
      [CHANGE_PROJECTFEATURE]: (state, action) => ({...state, projectFeature: action.payload}),
      [CHANGE_DEVLANGUAGE]: (state, action) => ({...state, devLanguage: action.payload}),
      [CHANGE_FRONTEND]: (state, action) => ({...state, frontend: action.payload}),
      [CHANGE_DATABASE]: (state, action) => ({...state, database: action.payload}),
      [CHANGE_TECHNOLOGY]: (state, action) => ({...state, technology: action.payload}),
      [CHANGE_NONFUNCTIONS]: (state, action) => ({...state, nonFunctions: action.payload}),
      [CHANGE_INFRASTRUCTURE]: (state, action) => ({...state, infrastructure: action.payload}),
      [CHANGE_DESIGNER]: (state, action) => ({...state, designer: action.payload}),
      [CHANGE_PRIORITY]: (state, action) => ({...state, priority: action.payload}),
      [RESET]: () => {
        return initialState;
      },
    }, initialState)
)


// export default handleActions({
//   [CHANGE_PROJECTNAME]: (state, action) => ({...state, projectName: action.payload}),
//   [CHANGE_REQUIREMENT]: (state, action) => ({...state, requirements: action.payload}),
//   [CHANGE_APPTARGET]: (state, action) => ({...state, appTarget: action.payload}),
//   [CHANGE_PROJECTFEATURE]: (state, action) => ({...state, projectFeature: action.payload}),
//   [CHANGE_DEVLANGUAGE]: (state, action) => ({...state, devLanguage: action.payload}),
//   [CHANGE_FRONTEND]: (state, action) => ({...state, frontend: action.payload}),
//   [CHANGE_DATABASE]: (state, action) => ({...state, database: action.payload}),
//   [CHANGE_TECHNOLOGY]: (state, action) => ({...state, technology: action.payload}),
//   [CHANGE_INFRASTRUCTURE]: (state, action) => ({...state, infrastructure: action.payload}),
//   [CHANGE_DESIGNER]: (state, action) => ({...state, designer: action.payload}),
//   [CHANGE_PRIORITY]: (state, action) => ({...state, priority: action.payload}),
// }, initialState);
