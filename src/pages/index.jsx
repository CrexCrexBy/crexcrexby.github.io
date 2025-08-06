import { Head } from "minista"

export const metadata = {
	title: "Home",
}

export default function ({ url, title, children }) {
	return (
		<>
			<Head htmlAttributes={{ lang: "en" }}>
				<title>{title}</title>
			</Head>
			<h1>{title}</h1>
		</>
	)
}
