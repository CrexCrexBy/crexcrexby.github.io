// src/pages/index.jsx
import { Head } from "minista"

export const metadata = {
	title: "Моё портфолио",
}

export default function ({ url, title, children }) {
	return (
		<>
			<Head htmlAttributes={{ lang: "ru" }}>
				<title>{title}</title>
			</Head>
			<h1>{title}</h1>
		</>
	)
}
