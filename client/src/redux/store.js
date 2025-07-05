// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { incomesApi } from './features/incomes/incomesApi';
import { expensesApi } from './features/expenses/expensesApi';
import { loansApi } from './features/loans/loansApi';

const store = configureStore({
  reducer: {
    [incomesApi.reducerPath]: incomesApi.reducer,
    [expensesApi.reducerPath]: expensesApi.reducer,
    [loansApi.reducerPath]: loansApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      incomesApi.middleware,
      expensesApi.middleware,
      loansApi.middleware
    ),
});

export default store;
