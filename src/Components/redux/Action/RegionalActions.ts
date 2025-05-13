// import { AppDispatch } from '../Store';
// import axios from 'axios';

// // Action Types
// export const REGIONAL_SALES_REQUEST = 'REGIONAL_SALES_REQUEST';
// export const REGIONAL_SALES_SUCCESS = 'REGIONAL_SALES_SUCCESS';
// export const REGIONAL_SALES_FAILURE = 'REGIONAL_SALES_FAILURE';

// // Interfaces for Action Types
// export interface RegionalSale {
//   region: string;
//   sales: number;
// }

// interface RequestAction {
//   type: typeof REGIONAL_SALES_REQUEST;
// }

// interface SuccessAction {
//   type: typeof REGIONAL_SALES_SUCCESS;
//   payload: RegionalSale[];
// }

// interface FailureAction {
//   type: typeof REGIONAL_SALES_FAILURE;
//   payload: string;
// }

// export type RegionalSalesActionTypes =
//   | RequestAction
//   | SuccessAction
//   | FailureAction;

// // Thunk Action for Fetching Regional Sales
// export const fetchRegionalSales = () => {
//   return async (dispatch: AppDispatch) => {
//     dispatch({ type: REGIONAL_SALES_REQUEST });

//     try {
//       // Simulate a delay
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       // Fetch data from API
//       const response = await axios.get<RegionalSale[]>(
//         'https://api.npoint.io/1d89cf12b4ed0996c1db'
//       );

//       dispatch({
//         type: REGIONAL_SALES_SUCCESS,
//         payload: response.data,
//       });
//     } catch (error: any) {
//       dispatch({
//         type: REGIONAL_SALES_FAILURE,
//         payload: error.message || 'Something went wrong',
//       });
//     }
//   };
// };