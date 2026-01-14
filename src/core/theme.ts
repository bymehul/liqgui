export type Theme = "light" | "dark";
export const setTheme = (t: Theme) =>
    document.documentElement.dataset.theme = t;
