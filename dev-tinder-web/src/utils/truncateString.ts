export default function truncateString (str: string, strLength: number) {
    return str.length > strLength ? str.slice(0, strLength) + "..." : str;
};