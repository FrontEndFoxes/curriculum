const addCopyButton = require('./copyButton');

module.exports = {
	base: '/',
	head: [['link', { rel: 'icon', href: '/favicon.png' }]],
	title: 'Front-End Foxes Workshops',
	description: 'Workshops to teach web and mobile development to beginners',
	locales: {
		'/': {
			lang: 'en-US',
			title: 'Front-End Foxes Workshops',
			description: 'Workshops to teach web and mobile development to beginners',
		},
		'/de/': {
			lang: 'de-DE',
			title: 'Front-End Foxes Workshops',
			description: 'Anfänger-Workshops für Web-Entwicklung',
		},
		'/fr/': {
			lang: 'fr-FR',
			title: 'Front-End Foxes Workshops',
			description: 'Ateliers pour apprendre la programmation web et mobile',
		},
		'/jp/': {
			lang: 'jp-JP',
			title: 'Front-End Foxes Workshops',
			description: 'ワークショップ',
		},
	},
	themeConfig: {
		repo: 'frontendfoxes/curriculum/',
		docsBranch: 'main',
		editLinks: true,
		// custom text for edit link. Defaults to "Edit this page"
		editLinkText: 'Help us improve this page!',
		nav: [
			{ text: 'React Workshops', link: '/workshops/react/' },
			{ text: 'Vue Workshops', link: '/workshops/vue/' },
			{ text: 'Code of Conduct', link: '/workshops/CODE_OF_CONDUCT' },
			{ text: 'Team', link: '/workshops/TEAM' },
		],
		locales: {
			'/': {
				selectText: 'Languages',
				label: 'English',
				sidebar: {
					'/workshops/react': [
						{
							title: '🦴 Mini Workshops',
							children: ['/workshops/react/minis/ecommerce'],
						},
					],
					'/workshops/vue': [
						{
							title: '🐶 Full Day Workshop',
							children: [
								'/workshops/vue/full-day/ch1',
								'/workshops/vue/full-day/ch2',
								'/workshops/vue/full-day/ch3',
								'/workshops/vue/full-day/ch4',
								'/workshops/vue/full-day/ch5',
								'/workshops/vue/full-day/appendix_1',
								'/workshops/vue/full-day/appendix_2',
							],
						},
						{
							title: '🐾 Half-Day Workshops',
							children: [
								'/workshops/vue/half-day/half-day1',
								['https://nsvue-workshop.netlify.com', '🔮 2: Build a complete mobile app - TarotMoji'],
							],
						},
						{
							title: '🦴 Mini Workshops',
							children: [
								'/workshops/vue/minis/mini1',
								'/workshops/vue/minis/mini2',
								'/workshops/vue/minis/mini3',
								'/workshops/vue/minis/mini4',
								'/workshops/vue/minis/mini5',
								'/workshops/vue/minis/mini6',
							],
						},
						{
							title: '👩‍🎓 Nano Activities',
							children: [
								'/workshops/vue/nanos/nano1',
								'/workshops/vue/nanos/nano2',
								'/workshops/vue/nanos/nano3',
								'/workshops/vue/nanos/nano4',
								'/workshops/vue/nanos/nano5',
								'/workshops/vue/nanos/nano6',
							],
						},
					],
				},
			},
			'/de/': {
				selectText: 'Sprache',
				label: 'Deutsch',
				sidebar: [
					{
						title: '🐶 Tagesworkshop',
						children: [
							'/de/workshops/vue/full-day/ch1',
							'/de/workshops/vue/full-day/ch2',
							'/de/workshops/vue/full-day/ch3',
							'/de/workshops/vue/full-day/ch4',
							'/de/workshops/vue/full-day/ch5',
							'/de/workshops/vue/full-day/appendix_1',
						],
					},
				],
			},
			'/fr/': {
				selectText: 'Langue',
				label: 'Français',
				sidebar: [
					{
						title: '🦴Ateliers Minis',
						children: ['/fr/workshops/vue/minis/mini1'],
					},
				],
			},
			'/jp/': {
				selectText: '言語',
				label: '日本語',
				sidebar: [
					{
						title: '🐶 フルデイワークショップ',
						children: ['/jp/workshops/vue/full-day/ch4'],
					},
					{
						title: '🦴ミニワークショップ',
						children: [
							'/jp/workshops/vue/minis/mini1',
							'/jp/workshops/vue/minis/mini2',
							'/jp/workshops/vue/minis/mini3',
							'/jp/workshops/vue/minis/mini4',
						],
					},
					{
						title: '👩‍🎓 ナノアクティビティ',
						children: [
							'/jp/workshops/vue/nanos/nano2',
							'/jp/workshops/vue/nanos/nano3'
						],
					},
				],
			},
		},
	},
	markdown: {
		lineNumbers: true,
		extendMarkdown: (md) => {
			addCopyButton(md);
		},
	},
};
