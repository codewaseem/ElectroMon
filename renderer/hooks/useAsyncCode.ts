import React, { useState, useEffect } from "react"

export interface AsyncState<T> {
    error: boolean,
    success: boolean,
    loading: boolean,
    results: T | null;
}

const defaultState = {
    error: false,
    success: false,
    loading: false,
    results: null
}

const asyncStates = {
    loading: { ...defaultState, loading: true },
    success: { ...defaultState, success: true },
    error: { ...defaultState, error: true },
}

export default function useAsyncCode<T>(asyncFunc: () => Promise<T> | void): AsyncState<T> {
    const [state, updateState] = useState<AsyncState<T>>(asyncStates.loading);
    const doAsync = async () => {
        try {
            const results = await asyncFunc();
            updateState({ ...asyncStates.success, results: results && results })
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