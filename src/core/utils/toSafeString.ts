import { isValidElement } from 'react';

// رابط برای گزینه‌ها
export interface ToSafeStringOptions {
    formatValue?: (value: unknown) => string;
    renderComponent?: (component: React.ReactNode) => string;
    preventCsvInjection?: boolean;
    stripHtml?: boolean;
    fallbackValue?: string;
    maxLength?: number;
}

// تابع اصلی برای تبدیل مقدار به رشته ایمن
export async function toSafeString(value: unknown, options: ToSafeStringOptions = {}): Promise<string> {
    const {
        formatValue,
        renderComponent,
        preventCsvInjection = false,
        stripHtml = true,
        fallbackValue = '',
        maxLength,
    } = options;

    try {
        if (value == null) {
            return fallbackValue;
        }

        if (isValidElement(value)) {
            if (renderComponent) {
                const rendered = renderComponent(value);
                return processString(rendered, { preventCsvInjection, maxLength });
            }

            // به جای استفاده از ReactDOMServer، از Server Component استفاده می‌کنیم
            // فرض می‌کنیم که value یک کامپوننت React است که می‌تواند مستقیماً رندر شود
            let text: string;
            if (stripHtml) {
                // اگر stripHtml فعال باشد، HTML را حذف می‌کنیم
                text = await renderComponentToString(value) || fallbackValue;
            } else {
                // در غیر این صورت، خروجی را مستقیماً استفاده می‌کنیم
                text = await renderComponentToString(value) || fallbackValue;
            }

            return processString(text, { preventCsvInjection, maxLength });
        }

        if (formatValue) {
            const formatted = formatValue(value);
            return processString(formatted, { preventCsvInjection, maxLength });
        }

        let result: string;
        if (Array.isArray(value) || (value && typeof value === 'object')) {
            result = JSON.stringify(value, (key, val) => {
                if (typeof val === 'object' && val !== null) {
                    try {
                        JSON.stringify(val);
                        return val;
                    } catch {
                        return '[Circular]';
                    }
                }
                return val;
            }) || fallbackValue;
        } else {
            result = String(value);
        }

        return processString(result, { preventCsvInjection, maxLength });
    } catch (error) {
        console.error('خطا در تبدیل مقدار به رشته ایمن:', error);
        return fallbackValue;
    }
}

// تابع کمکی برای پردازش رشته‌ها
function processString(
    input: string,
    { preventCsvInjection = false, maxLength }: { preventCsvInjection?: boolean; maxLength?: number }
): string {
    let result = input;

    if (maxLength && result.length > maxLength) {
        result = result.slice(0, maxLength);
    }

    result = result.replace(/"/g, '""');

    if (preventCsvInjection && /^[=+\-@]/.test(result)) {
        result = `'${result}`;
    }

    return `"${result}"`;
}

// تابع کمکی برای رندر کامپوننت در محیط Server Component
async function renderComponentToString(component: React.ReactNode): Promise<string> {
    // اگر در محیط Next.js هستید، می‌توانید از رندر مستقیم Server Component استفاده کنید
    // این تابع باید با توجه به چارچوب شما پیاده‌سازی شود
    // به عنوان مثال، در Next.js می‌توانید از یک Server Component استفاده کنید
    if (typeof component === 'string') {
        return component;
    }

    // اگر stripHtml فعال باشد، باید HTML را به متن ساده تبدیل کنیم
    // این یک پیاده‌سازی ساده است؛ بسته به نیاز، می‌توانید از کتابخانه‌های دیگر استفاده کنید
    const html = String(component); // این یک جایگزین ساده است
    return html.replace(/<[^>]+>/g, '').trim();
}