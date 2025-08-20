import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
interface Props<TInitialState> { key: string, initialState: TInitialState }

interface CocalStorageManager<TInitialState> {
    value: TInitialState;
    setValue: (value: TInitialState | ((prev: TInitialState) => TInitialState)) => void;
    reset: () => void;
}

export function createLocalStorageStore<TInitialState>({ key, initialState }: Props<TInitialState>) {

    const useLocalStorage = create<CocalStorageManager<TInitialState>>()(
        persist((set) => ({
            value: initialState,
            setValue: (value) =>
                set((state) => ({
                    value: typeof value === 'function' ? (value as (prev: TInitialState) => TInitialState)(state.value) : value,
                })),
            reset: () => set({ value: initialState }),
        }),
            {
                name: key,
                storage: createJSONStorage(() => typeof window !== 'undefined' ? window.localStorage : undefined),
            }
        )
    )

    return useLocalStorage;
}
