import { encodeDataForUrl } from "@/core/utils/url-encode-decode"

interface Props {
    anchorValue: string;
    behavior?: "smooth" | "auto" | "instant";
};

/**
 * Hook useEncodedScrollAnchor generates a URL-safe encoded ID based on the given anchorValue
 * and provides a trigger function to smoothly scroll to the corresponding element on the page.
 * 
 * @param anchorValue - The string used to generate the encoded ID for the anchor.
 * @param behavior - Scroll behavior: "smooth" (default), "auto", or "instant".
 * 
 * @returns
 * - `id`: The encoded ID suitable for use as an HTML element ID and anchor link.
 * - `trigger`: Event handler function to scroll to the element with the encoded ID and update the URL hash.
 * 
 * @example
 * const { id, trigger } = useEncodedScrollAnchor({ anchorValue: "Section Title" });
 * <a href={`#${id}`} onClick={trigger}>Go to Section</a>
 */
export const useEncodedScrollAnchor = ({ anchorValue, behavior = "smooth" }: Props) => {
    const id = encodeDataForUrl(anchorValue);

    const trigger = (e: any) => {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior });
            window.history.pushState(null, "", `#${id}`);
        }
    };

    return { id, trigger };
};
