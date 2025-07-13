import { $, onClick } from './utils'

const iconMoon = $('.icon-theme-moon')
const iconSun = $('.icon-theme-sun')
const btn = $('#switchTheme')
const elHtml = $('html')

export function initThemes() {
	const prefersScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	let current = localStorage.getItem('THEMES')

	if (!current) {
		current = prefersScheme
		localStorage.setItem('THEMES', current)
	}

	elHtml.dataset.theme = current

	if (current === 'dark') {
		iconMoon.classList?.add('iconActive')
		iconSun.classList?.remove('iconActive')
	} else {
		iconMoon.classList?.remove('iconActive')
		iconSun.classList?.add('iconActive')
	}
}

export function toggleTheme() {
	onClick(btn, () => {
		const oldTheme = localStorage.getItem('THEMES')
		const newThemes = oldTheme === 'dark' ? 'light' : 'dark'

		if (newThemes === 'dark') {
			elHtml.dataset.theme = 'dark'
			localStorage.setItem('THEMES', 'dark')

			iconMoon.classList?.remove('iconActive')
			iconSun.classList?.add('iconActive')
		} else if (newThemes === 'light') {
			elHtml.dataset.theme = 'light'
			localStorage.setItem('THEMES', 'light')

			iconSun.classList?.remove('iconActive')
			iconMoon.classList?.add('iconActive')
		}
	})
}

initThemes()
toggleTheme()
