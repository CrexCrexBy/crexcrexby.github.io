import { Head } from "minista"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import i18n from "../i18n"

export default function Home({ data }) {
	const { t, i18n: i18nInstance } = useTranslation()
	const supportedLangs = ["en", "ru"]
	const defaultLang = "en"

	// Начальный язык из data.lang (серверный рендер)
	const initialServerLang =
		data?.lang && supportedLangs.includes(data.lang)
			? data.lang
			: defaultLang
	const [currentLang, setCurrentLang] = useState(initialServerLang)

	console.log(
		"Component: Rendered (server), data.lang:",
		data?.lang,
		"initialServerLang:",
		initialServerLang,
	)

	useEffect(() => {
		// Определяем язык только на клиенте
		const storedLang = localStorage.getItem("i18nextLng")
		const detectedLang = i18nInstance.language
		const initialLang =
			storedLang && supportedLangs.includes(storedLang)
				? storedLang
				: supportedLangs.includes(detectedLang)
					? detectedLang
					: initialServerLang

		console.log(
			"useEffect: Detected - storedLang:",
			storedLang,
			"i18n.language:",
			detectedLang,
			"initialLang:",
			initialLang,
		)

		if (initialLang !== currentLang) {
			i18nInstance.changeLanguage(initialLang, (err) => {
				if (err) console.error("useEffect: Error:", err)
				else console.log("useEffect: Language changed to", initialLang)
			})
			setCurrentLang(initialLang)
			document.documentElement.setAttribute("lang", initialLang)
			localStorage.setItem("i18nextLng", initialLang)
			console.log("useEffect: Updated lang to", initialLang)
		}
	}, [i18nInstance, initialServerLang])

	const changeLanguage = (lng) => {
		console.log("changeLanguage: Button clicked, switching to", lng)
		if (!supportedLangs.includes(lng)) {
			console.log("changeLanguage: Language not supported:", lng)
			return
		}
		i18nInstance.changeLanguage(lng, (err) => {
			if (err) {
				console.error("changeLanguage: Error:", err)
				return
			}
			console.log("changeLanguage: Language changed to", lng)
			setCurrentLang(lng)
			document.documentElement.setAttribute("lang", lng)
			localStorage.setItem("i18nextLng", lng)
			console.log("changeLanguage: Saved to localStorage:", lng)
		})
	}

	return (
		<>
			<Head htmlAttributes={{ lang: currentLang }}>
				<title>{t("title")}</title>
				<link rel="alternate" hreflang="en" href="/en/index" />
				<link rel="alternate" hreflang="ru" href="/ru/index" />
			</Head>

			<h1>{t("title")}</h1>

			<div className="language-switcher">
				<button
					onClick={() => changeLanguage("en")}
					disabled={currentLang === "en"}
				>
					ENGLISH
				</button>
				<button
					onClick={() => changeLanguage("ru")}
					disabled={currentLang === "ru"}
				>
					РУССКИЙ
				</button>
			</div>

			<div className="content">
				<p>{t("welcome", { name: "Иван" })}</p>
				<p>{t("date", { date: new Date() })}</p>
			</div>
		</>
	)
}
