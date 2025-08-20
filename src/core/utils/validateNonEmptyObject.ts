
export const validateNonEmptyObject = (obj: Record<any, any>) => {
    if (!obj || typeof obj !== 'object' || Object.keys(obj).length === 0) {
        return null
    }
    return obj
}