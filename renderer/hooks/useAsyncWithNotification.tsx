import useAsyncCode, { AsyncState } from "./useAsyncCode";
import { notification } from "antd";
import { useEffect } from "react";

interface Message {
  description: string;
  message: string;
}

interface Messages {
  error?: Message;
  success?: Message;
  loading?: Message;
}

export default function useAsyncWithNotification<T>(
  asyncFunc: () => Promise<T> | void,
  messages: Messages
): AsyncState<T> {
  const state = useAsyncCode<T>(asyncFunc);
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
