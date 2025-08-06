import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

i18next
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		supportedLngs: ["en", "ru"],
		resources: {
			en: {
				translation: {
					title: "My Portfolio",
					welcome: "Hello, %s!",
					date: "Today is {{date, MM/dd/yyyy}}",
				},
			},
			ru: {
				translation: {
					title: "Моё портфолио",
					welcome: "Привет, %s!",
					date: "Сегодня {{date, dd.MM.yyyy}}",
				},
			},
		},
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"],
			lookupLocalStorage: "i18nextLng",
			convertDetectedLanguage: (lng) => {
				console.log("LanguageDetector: Detected language:", lng)
				return lng.split("-")[0]
			},
		},
		interpolation: {
			escapeValue: false,
			format: (value, format, lng) => {
				if (value instanceof Date) {
					return new Intl.DateTimeFormat(lng, {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
					}).format(value)
				}
				return value
			},
		},
	})

i18next.on("languageChanged", (lng) => {
	console.log("i18next: Language changed to", lng)
	localStorage.setItem("i18nextLng", lng)
	console.log("i18next: Saved to localStorage:", lng)
})

console.log("i18n: Initialized, current language:", i18next.language)

export default i18next
