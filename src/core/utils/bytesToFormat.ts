type Unit = 'B' | 'Bytes'
    | 'KB' | 'K' | 'KiB'
    | 'MB' | 'M' | 'MiB'
    | 'GB' | 'G' | 'GiB';

const unitMap: Record<string, number> = {
    b: 0, bytes: 0,
    kb: 1, k: 1, kib: 1,
    mb: 2, m: 2, mib: 2,
    gb: 3, g: 3, gib: 3,
};

export function convertSizeFileFormat(
    value: number,
    fromUnit: Unit,
    toUnit: Unit,
    decimals = 2
): number {
    if (value === 0) return 0;

    const fromKey = fromUnit.toLowerCase();
    const fromPower = Math.min(unitMap[fromKey] ?? 0, 3);

    const toKey = toUnit.toLowerCase();
    const toPower = Math.min(unitMap[toKey] ?? 0, 3);

    const bytes = value * Math.pow(1024, fromPower);
    const result = bytes / Math.pow(1024, toPower);

    return parseFloat(result.toFixed(decimals));
}
