import { useRef } from 'react';

export type AsyncFunction<Q extends any[], R> = (...args: Q) => Promise<R>;
export type AsyncFunctionOnResolve<R, S> = (arg: R) => S | Promise<S>;
export type AsyncFunctionOnReject = (error: any) => any;

export type WrappedAsyncFunction<Q extends any[], S> = (...args: Q) => Promise<S>;
export type ResetWrappedAsyncFunction = () => void;

/**
 * Wraps an async call to prevent duplicate requests if a request is already pending.
 *
 * Example:
 *
 * ```
 * const [myAsyncFunction, resetMyAsyncFunction] = useAsync(
 *   (param: number) => asyncFunction(param1)
 * )
 *
 * await myAsyncFunction(1) // calls `asyncFunction`, where param=1
 * await myAsyncFunction(2) // returns cached promise from first call, where param=1
 * resetMyAsyncFunction();  // clears the cached promise
 * await myAsyncFunction(2) // calls `asyncFunction`, where param=2
 * ```
 *
 * @template Q
 * @template R
 * @param {AsyncFunction<Q, R>} asyncFunction the async function to wrap
 * @return {*}  {[WrappedAsyncFunction<Q, R>, ResetWrappedAsyncFunction]}
 */
export const useAsync = <Q extends any[], R>(
  asyncFunction: AsyncFunction<Q, R>
): [WrappedAsyncFunction<Q, R>, ResetWrappedAsyncFunction] => {
  const ref = useRef<Promise<R>>();

  const wrappedAsyncFunction: WrappedAsyncFunction<Q, R> = async (...args) => {
    if (ref.current) {
      return ref.current;
    }

    ref.current = asyncFunction(...args);

    return ref.current;
  };

  const resetWrappedAsyncFunction = () => {
    ref.current = undefined;
  };

  return [wrappedAsyncFunction, resetWrappedAsyncFunction];
};

/**
 * Wraps an async call to prevent duplicate requests if a request is already pending.
 *
 * Takes `onResolve` and `onReject` callbacks that will be called when the `asyncFunction` resolves or
 * rejects/catches.
 *
 * Example:
 *
 * ```
 * const [myAsyncFunction, resetMyAsyncFunction] = useAsync(
 *   (param: number) => asyncFunction(param1),
 *   (response: string) => onResolve(response),
 *   (error: any) => onReject(error)
 * )
 *
 * await myAsyncFunction(1) // calls `asyncFunction`, where param=1
 * await myAsyncFunction(2) // returns cached promise from first call, where param=1
 * resetMyAsyncFunction();  // clears the cached promise
 * await myAsyncFunction(2) // calls `asyncFunction`, where param=2
 * ```
 *
 * @template Q
 * @template R
 * @template S
 * @param {AsyncFunction<Q, R>} asyncFunction the async function to wrap
 * @param {AsyncFunctionOnResolve<R, S>} onResolve called if the promise resolves, receives the response from the asyncFunction
 * @param {AsyncFunctionOnReject} onReject called if the promise rejects or catches, receives an error
 * @return {*}  {[WrappedAsyncFunction<Q, S>, ResetWrappedAsyncFunction]}
 */
export const useAsyncHandler = <Q extends any[], R, S>(
  asyncFunction: AsyncFunction<Q, R>,
  onResolve: AsyncFunctionOnResolve<R, S>,
  onReject: AsyncFunctionOnReject
): [WrappedAsyncFunction<Q, S>, ResetWrappedAsyncFunction] => {
  const ref = useRef<Promise<S>>();

  const wrappedAsyncFunction: WrappedAsyncFunction<Q, S> = async (...args) => {
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

  const resetWrappedAsyncFunction = () => {
    ref.current = undefined;
  };

  return [wrappedAsyncFunction, resetWrappedAsyncFunction];
};
