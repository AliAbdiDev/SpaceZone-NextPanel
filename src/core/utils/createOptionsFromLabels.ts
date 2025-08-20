/**
 * Creates an array of option objects from a record of labels.
 * @param labels - A record of labels to create options from.
 * @returns An array of option objects with value and label properties.
 */
export function createOptionsFromLabels<K extends string>(
    labels: Record<K, string>
): Array<{ value: K; label: string }> {
    return Object.entries(labels)?.map(
        ([value, label]) => ({ value: value as K, label: label as string })
    ) ?? [];
}