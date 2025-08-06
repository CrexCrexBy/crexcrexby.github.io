import "@/styles"
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
			<h2>{title}</h2>
			<h3>{title}</h3>
			<h4>{title}</h4>
			<h5>{title}</h5>
			<h6>{title}</h6>
		</>
	)
}
