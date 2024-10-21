import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
        colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
            accent: "var(--accent)",
            subtle: "var(--subtle)",
            "secondary-accent": "var(--secondary-accent)",
            "box-background": "var(--box-background)",
        },
        fontSize: {
            'bold-desktop': '50px',
            'paragraph-desktop': '24px',
            'small-desktop': '16px',
            'bold-mobile': '36px',
            'paragraph-mobile': '18px',
            'small-mobile': '14px',
        },
        },
        screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        },
    },
    plugins: [],
};

export default config;
