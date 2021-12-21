import { useRef } from 'react';

export type AsyncFunction<Q extends any[], R> = (...args: Q) => Promise<R>;
export type AsyncFunctionOnResolved<R, S> = (arg: R) => S | Promise<S>;
export type AsyncFunctionOnRejected = (error: any) => any;

export type AsyncFunctionHandler<Q extends any[], S> = (...args: Q) => Promise<void | S>;
export type AsyncFunctionResetHandler = () => void;

/**
 * Wraps an async call to prevent duplicate requests if a request is already pending.
 *
 * Example:
 *
 * ```
 * const [asyncFunctionHandler, resetAsyncFunctionHandler] = useAsync(
 *   (param1: number) => asyncFunction(param1),
 *   (response: string) => onResolve(response),
 *   (error: any) => onReject(error)
 * )
 *
 * await asyncFunctionHandler(1) // calls the async function, where param=1
 * await asyncFunctionHandler(2) // returns the cached promise from the first call, where param=1
 * resetAsyncFunctionHandler();  // clears the cache
 * await asyncFunctionHandler(2) // calls the async function, where param=2
 * ```
 *
 * @template Q
 * @template R
 * @template S
 * @param {AsyncFunction<Q, R>} asyncFunction the async function to wrap
 * @param {AsyncFunctionOnResolved<R, S>} onResolve called if the promise resolves, receives the response from the asyncFunction
 * @param {AsyncFunctionOnRejected} onReject called if the promise rejects or throws an error, receives an error
 * @return {*}  {[AsyncFunctionHandler<Q, S>, AsyncFunctionResetHandler]}
 */
export const useAsync = <Q extends any[], R, S>(
  asyncFunction: AsyncFunction<Q, R>,
  onResolve: AsyncFunctionOnResolved<R, S>,
  onReject: AsyncFunctionOnRejected
): [AsyncFunctionHandler<Q, S>, AsyncFunctionResetHandler] => {
  const ref = useRef<Promise<S>>();

  const asyncFunctionHandler: AsyncFunctionHandler<Q, S> = async (...args) => {
    if (ref.current) {
      return ref.current;
    }

    ref.current = asyncFunction(...args)
      .then(
        (response: R) => {
          return onResolve(response);
        },
        (error: any) => {
          return onReject(error);
        }
      )
      .catch((error: any) => {
        return onReject(error);
      });

    return ref.current;
  };

  const resetAsyncFunctionHandler = () => {
    ref.current = undefined;
  };

  return [asyncFunctionHandler, resetAsyncFunctionHandler];
};
