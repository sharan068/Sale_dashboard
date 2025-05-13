// import { composeWithDevTools } from './../../../node_modules/@reduxjs/toolkit/src/devtoolsExtension';
// import { applyMiddleware, combineReducers, createStore } from 'redux';
// import thunk from 'redux-thunk'; // Correct import for redux-thunk
// import { regionalSalesReducer } from './reducer/regionalSalesReducer';

// const rootReducer = combineReducers({
//   regionalSales: regionalSalesReducer,
// });

// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk as any)) // Temporarily cast thunk to any
// );

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch; // Correctly export AppDispatch