import { execSync } from "child_process"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

// Эмуляция __dirname для ES-модулей
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default function (plop) {
	plop.setGenerator("component", {
		description: "Создание React-компонента",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Введите имя компонента",
				validate: (input) =>
					!!input.trim() || "Имя компонента не может быть пустым",
			},
		],
		actions: [
			{
				type: "add",
				path: "src/components/{{pascalCase name}}/{{pascalCase name}}.jsx",
				templateFile: path.join(
					__dirname,
					".vscode/plop-templates/component/component.jsx.hbs"
				),
			},
			{
				type: "add",
				path: "src/components/{{pascalCase name}}/index.js",
				templateFile: path.join(
					__dirname,
					".vscode/plop-templates/component/index.js.hbs"
				),
			},
			{
				type: "add",
				path: "src/components/{{pascalCase name}}/{{pascalCase name}}.scss",
				templateFile: path.join(
					__dirname,
					".vscode/plop-templates/component/style.scss.hbs"
				),
			},
			function openFiles(answers) {
				const componentName = plop.getHelper("pascalCase")(answers.name)
				const componentDir = path.join(
					process.cwd(),
					"src",
					"components",
					componentName
				)

				// Список файлов для открытия
				const filesToOpen = [
					`${componentName}.jsx`,
					`${componentName}.scss`,
				]

				// Проверка существования директории
				if (!fs.existsSync(componentDir)) {
					return `Ошибка: директория ${componentDir} не создана`
				}

				// Фильтрация существующих файлов
				const existingFiles = filesToOpen
					.map((file) => path.join(componentDir, file))
					.filter((filePath) => fs.existsSync(filePath))

				if (existingFiles.length === 0) {
					return "Ошибка: ни один из файлов не найден"
				}

				// Открытие файлов в редакторе
				try {
					execSync(
						`code ${existingFiles
							.map((file) => `"${file}"`)
							.join(" ")}`,
						{
							stdio: "inherit",
						}
					)
					return `Открыто ${existingFiles.length} файла(ов)`
				} catch (error) {
					return `Ошибка при открытии файлов: ${error.message}`
				}
			},
		],
	})
}
