import { useEffect, useRef } from 'react';
import useIsMounted from './useIsMounted';

export type AsyncEffectFunction<R> = (...args: any[]) => Promise<R>;
export type AsyncEffectFunctionOnResolved<R> = (arg: R) => void;
export type AsyncEffectFunctionOnRejected = (error: any) => void;

/**
 * Wraps a normal `useEffect` and async call to prevent duplicate requests if a request is already pending, and ensure
 * that async resolve/reject/catch handlers are not called if the component has already unmounted.
 *
 * @template R response type of the `asyncFunction` function
 * @param {AsyncEffectFunction<R>} asyncFunction an async function
 * @param {AsyncEffectFunctionOnResolved<R>} onResolve called if the promise resolves, receives the response from the asyncFunction
 * @param {AsyncEffectFunctionOnRejected} onReject called if the promise rejects or throws an error, receives an error
 * @param {any[]} deps the `useEffect` dependencies
 */
export const useAsyncEffect = <R>(
  asyncFunction: AsyncEffectFunction<R>,
  onResolve: AsyncEffectFunctionOnResolved<R>,
  onReject: AsyncEffectFunctionOnRejected,
  deps: any[]
) => {
  const isMounted = useIsMounted();

  const ref = useRef<Promise<any> | undefined>(undefined);

  useEffect(() => {
    ref.current = undefined;
  }, [deps]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (ref.current) {
      return;
    }

    ref.current = asyncFunction()
      .then(
        (response: R) => {
          if (!isMounted) {
            return;
          }

          return onResolve(response);
        },
        (error: any) => {
          if (!isMounted) {
            return;
          }

          return onReject(error);
        }
      )
      .catch((error: any) => {
        if (!isMounted) {
          return;
        }

        return onReject(error);
      });
  }, deps);
};
