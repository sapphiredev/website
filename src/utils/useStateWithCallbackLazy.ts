import { SetStateAction, useEffect, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
type Callback<S> = (state: S) => void | (() => void);
type DispatchWithCallback<S, A> = (value: A, callback?: Callback<S>) => void;

export const useStateWithCallback = <S>(initialValue: S): [S, DispatchWithCallback<S, SetStateAction<S>>] => {
	const callbackRef = useRef<Callback<S> | null>(null);

	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		if (callbackRef.current) {
			callbackRef.current(value);

			callbackRef.current = null;
		}
	}, [value]);

	const setValueWithCallback = (newValue: SetStateAction<S>, callback?: Callback<S>) => {
		callbackRef.current = callback ?? null;

		return setValue(newValue);
	};

	return [value, setValueWithCallback];
};

export default useStateWithCallback;
