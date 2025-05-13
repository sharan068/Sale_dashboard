// import {
//   REGIONAL_SALES_REQUEST,
//   REGIONAL_SALES_SUCCESS,
//   REGIONAL_SALES_FAILURE,
// } from "../Action/RegionalActions";
// import type { RegionalSale, RegionalSalesActionTypes } from "../Action/RegionalActions";

// interface RegionalSalesState {
//   loading: boolean;
//   data: RegionalSale[];
//   error: string | null;
// }

// const initialState: RegionalSalesState = {
//   loading: false,
//   data: [],
//   error: null,
// };

// export const regionalSalesReducer = (
//   state: RegionalSalesState = initialState,
//   action: RegionalSalesActionTypes
// ): RegionalSalesState => {
//   switch (action.type) {
//     case REGIONAL_SALES_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };

//     case REGIONAL_SALES_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//       };

//     case REGIONAL_SALES_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };