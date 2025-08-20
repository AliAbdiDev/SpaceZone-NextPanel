'use client';

import { create } from 'zustand';
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware';
import { useEffect } from 'react';
import { validateNonEmptyObject } from '@/core/utils/validateNonEmptyObject';

type State = Record<string, unknown>;

type Store<T extends State> = T & {
    setData: (data: Partial<T>) => void;
    clearData: () => void;
};

type SessionStoreConfig<T extends State> = {
    keyName: string;
    initialState: Store<T>;
};

const storeInitialStates = new Map<string, State>();
/**
 * Creates a Zustand store with sessionStorage persistence.
 *
 * @template T - The shape of the data stored in the session store.
 * 
 * @param {Object} config - The store configuration.
 * @param {string} config.keyName - A unique key used for sessionStorage persistence.
 * @param {Store<T>} config.initialState - The initial state of the store, including `setData` and `clearData` methods.
 * 
 * @returns A Zustand store instance enhanced with `setData`, `clearData`, and sessionStorage persistence.
 * 
 * @description
 * This function creates a session-scoped Zustand store that:
 * - Persists data to `sessionStorage` using the `zustand/middleware/persist` middleware.
 * - Automatically strips method fields (`setData`, `clearData`) from the persisted data.
 * - Stores the original `initialState` for later comparison and resetting.
 *
 * @example
 * const userStore = createSessionStore<User>({
 *   keyName: 'user',
 *   initialState: {
 *     userId: '',
 *     token: '',
 *     isLoggedIn: false,
 *     setData: () => {},
 *     clearData: () => {},
 *   }
 * });
 */
const createSessionStore = <T extends State>({ keyName, initialState }: SessionStoreConfig<T>) => {
    storeInitialStates.set(`session-${keyName}`, initialState);

    const persistOptions: PersistOptions<Store<T>, Partial<T>> = {
        name: `session-${keyName}`,
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) =>
            Object.fromEntries(
                Object.entries(state).filter(([key]) => key !== 'setData' && key !== 'clearData')
            ) as Partial<T>,
    };

    return create<Store<T>, [['zustand/persist', Partial<T>]]>(
        persist(
            (set) => ({
                ...initialState,
                setData: (data: Partial<T>) => set((state) => ({ ...state, ...data })),
                clearData: () => set({ ...initialState }),
            }),
            persistOptions
        )
    );
};

/**
 * A custom React hook for consuming a session store, with optional path-based data reset.
 *
 * @template T - The shape of the data in the Zustand store.
 * 
 * @param config - Configuration object for the session store.
 * @param config.store - The Zustand store instance returned by `createSessionStore`.
 * @param config.pathPrefix - A pathname prefix that defines where the store is considered "active".
 * @param config.resetOnMainPath - If `true`, resets the store when the pathname is exactly equal to `pathPrefix`. Defaults to `false`.
 * @param config.dataToSet - Optional data to set in the store when the path is valid.
 * 
 * @returns
 * The store's state and methods (`setData`, `clearData`) when the path is valid.
 * Otherwise, returns the last known state with disabled `setData` and `clearData` (no-op functions).
 * 
 * @description
 * This hook connects a Zustand store to the current Next.js pathname (`usePathname`).
 * It automatically clears the store's state when:
 * - The current route does not start with `pathPrefix`, OR
 * - `resetOnMainPath` is `true` and the current path exactly matches `pathPrefix`,
 * AND the store has data (differs from its initial state).
 * 
 * It also ensures that calls to `setData` and `clearData` are ignored on invalid paths to avoid side effects.
 * If `dataToSet` is provided and the path is valid, it updates the store with the provided data, avoiding unnecessary updates.
 * 
 * @example
 * const { userId, setData, clearData } = useSession({
 *   store: userStore,
 *   pathPrefix: '/dashboard',
 *   resetOnMainPath: true,
 *   dataToSet: { userId: '123', name: 'John' }
 * });
 */
export const useSession = <T extends State>({
    store,
    dataToSet,
}: {
    store: ReturnType<typeof createSessionStore<T>>;
    dataToSet?: Partial<T>;
}) => {
    useEffect(() => {
        const state = store.getState();

        if (
            validateNonEmptyObject(dataToSet) &&
            Object.keys(dataToSet).some((key) => dataToSet[key] !== state[key])
        ) {
            console.log('Setting data in store:', dataToSet);
            state.setData(dataToSet);
        }
    }, [store, dataToSet]);

    return store();
};
export default createSessionStore;