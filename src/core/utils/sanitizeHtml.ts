import DOMPurifyy, { DOMPurify } from "dompurify";

let purify: DOMPurify;


export const sanitizeHtml = (htmlString: string) => {
    if (typeof window !== 'undefined') {
        if (!purify) {
            purify = DOMPurifyy(window);
        }
    } else {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { JSDOM } = require('jsdom');
        const { window } = new JSDOM('<!DOCTYPE html>');
        purify = DOMPurifyy(window);
    }
    return purify.sanitize(htmlString, {
        ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'span', 'div', 'a'],
        ALLOWED_ATTR: ['class', 'style', 'href'],
    });
};