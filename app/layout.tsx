"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
	pageProps: { session, ...pageProps },
}: {
	children: React.ReactNode;
	pageProps: { session: any };
}) {
	return (
		<html lang="en">
			<body suppressHydrationWarning={true} className={inter.className}>
				<SessionProvider session={session}>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						{children}
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
