import { useContext, Context } from 'react';

interface Props<T> {
    context: Context<T>,
    contextName?: string
}
/**
 * A generic helper function to safely access a React Context.
 * Throws an error if the context is used outside of its Provider.
 *
 * @param context - The React Context object to access.
 * @param contextName - Optional name of the context for better error messaging.
 * @returns The context value of type T.
 * @throws Error if the context is used outside of its Provider.
 */
export function useHelperContext<T>({ context, contextName }: Props<T>): T {
    const contextValue = useContext(context);

    if (contextValue === undefined || contextValue === null) {
        throw new Error(
            `${contextName || 'Context'} must be used within its Provider.`
        );
    }
    return contextValue;
}