import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

function withAlpha(variable: string) {
    // Enables Tailwind opacity modifiers like `bg-primary/10` with OKLCH CSS variables.
    // `var(--primary)` contains a full color (e.g. `oklch(...)`), so we use Color 4 "from" syntax.
    return `oklch(from var(${variable}) l c h / <alpha-value>)`;
}

const config: Config = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    	extend: {
    		colors: {
    			background: withAlpha('--background'),
    			foreground: withAlpha('--foreground'),
    			accent: {
    				DEFAULT: withAlpha('--accent'),
    				foreground: withAlpha('--accent-foreground')
    			},
    			subtle: 'var(--subtle)',
    			'secondary-accent': 'var(--secondary-accent)',
    			'box-background': 'var(--box-background)',
    			card: {
    				DEFAULT: withAlpha('--card'),
    				foreground: withAlpha('--card-foreground')
    			},
    			popover: {
    				DEFAULT: withAlpha('--popover'),
    				foreground: withAlpha('--popover-foreground')
    			},
    			primary: {
    				DEFAULT: withAlpha('--primary'),
    				foreground: withAlpha('--primary-foreground')
    			},
    			secondary: {
    				DEFAULT: withAlpha('--secondary'),
    				foreground: withAlpha('--secondary-foreground')
    			},
    			muted: {
    				DEFAULT: withAlpha('--muted'),
    				foreground: withAlpha('--muted-foreground')
    			},
    			destructive: {
    				DEFAULT: withAlpha('--destructive'),
    				foreground: withAlpha('--destructive-foreground')
    			},
    			border: withAlpha('--border'),
    			input: withAlpha('--input'),
    			ring: withAlpha('--ring'),
    			chart: {
    				'1': withAlpha('--chart-1'),
    				'2': withAlpha('--chart-2'),
    				'3': withAlpha('--chart-3'),
    				'4': withAlpha('--chart-4'),
    				'5': withAlpha('--chart-5')
    			},
    			sidebar: {
    				DEFAULT: withAlpha('--sidebar'),
    				foreground: withAlpha('--sidebar-foreground'),
    				primary: withAlpha('--sidebar-primary'),
    				'primary-foreground': withAlpha('--sidebar-primary-foreground'),
    				accent: withAlpha('--sidebar-accent'),
    				'accent-foreground': withAlpha('--sidebar-accent-foreground'),
    				border: withAlpha('--sidebar-border'),
    				ring: withAlpha('--sidebar-ring')
    			}
    		},
    		fontSize: {
    			'bold-desktop': '50px',
    			'paragraph-desktop': '24px',
    			'small-desktop': '16px',
    			'bold-mobile': '36px',
    			'paragraph-mobile': '18px',
    			'small-mobile': '14px'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			marquee: {
    				from: {
    					transform: 'translateX(0)'
    				},
    				to: {
    					transform: 'translateX(calc(-100% - var(--gap)))'
    				}
    			},
    			'marquee-vertical': {
    				from: {
    					transform: 'translateY(0)'
    				},
    				to: {
    					transform: 'translateY(calc(-100% - var(--gap)))'
    				}
    			},
    			'shimmer-slide': {
    				to: {
    					transform: 'translate(calc(100cqw - 100%), 0)'
    				}
    			},
    			'spin-around': {
    				'0%': {
    					transform: 'translateZ(0) rotate(0)'
    				},
    				'15%, 35%': {
    					transform: 'translateZ(0) rotate(90deg)'
    				},
    				'65%, 85%': {
    					transform: 'translateZ(0) rotate(270deg)'
    				},
    				'100%': {
    					transform: 'translateZ(0) rotate(360deg)'
    				}
    			}
    		},
    		animation: {
    			marquee: 'marquee var(--duration) infinite linear',
    			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
    			'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
    			'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear'
    		}
    	},
    	screens: {
    		sm: '640px',
    		md: '768px',
    		lg: '1024px',
    		xl: '1280px',
    		'2xl': '1536px'
    	}
    },
    plugins: [tailwindcssAnimate],
};

export default config;
