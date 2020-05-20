import { useState, useEffect } from "react";

const defaultState = {
  error: false,
  success: false,
  loading: false,
  results: null,
};

const asyncStates = {
  loading: { ...defaultState, loading: true },
  success: { ...defaultState, success: true },
  error: { ...defaultState, error: true },
};

export default function useAsyncCode(asyncFunc) {
  const [state, updateState] = useState(asyncStates.loading);
  const doAsync = async () => {
    try {
      const results = await asyncFunc();
      updateState({ ...asyncStates.success, results: results && results });
    } catch (error) {
      // TODO: Error Reporting
      updateState(asyncStates.error);
    }
  };

  useEffect(() => {
    doAsync();
  }, []);

  return state;
}
