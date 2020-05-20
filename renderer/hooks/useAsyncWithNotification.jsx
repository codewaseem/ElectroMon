import useAsyncCode from "./useAsyncCode";
import { notification } from "antd";
import { useEffect } from "react";

export default function useAsyncWithNotification(asyncFunc, messages) {
  const state = useAsyncCode(asyncFunc);
  useEffect(() => {
    if (state.loading && messages.loading) {
      notification.info(messages.loading);
    }

    if (state.success && messages.success) {
      notification.success(messages.success);
    }

    if (state.error && messages.error) {
      notification.error(messages.error);
    }
  }, [state, messages]);

  return state;
}
