import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jost = Jost({
	subsets: ["latin"],
	weight: ["100", "300", "400", "500", "700", "900"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://daily-todo-task.vercel.app/"),

	title: {
		template: "%s | UP Madayaw",
		default: "UP Madayaw",
	},
	authors: {
		name: "chensokheng",
	},
	description:
		"Build dashboard with role managemanet using next.js and supabase.",
	openGraph: {
		title: "UP Madayaw",
		description: "Build dashboard with next.js and supabase ",
		url: "https://daily-todo-task.vercel.app/",
		siteName: "UP Madayaw",
		images: "/og.png",
		type: "website",  
	},
	keywords: ["daily web coding", "chensokheng", "dailywebcoding"],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				{/* 	<body className={`${jost.className} antialiased dark:bg-[#09090B]`}> */}
				
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main className="">{children}</main>
					<Footer />
					<Toaster />
				</ThemeProvider>
				
			</body>
		</html>
	);
}
