module.exports = {
	base: '/',
	head: [['link', { rel: 'icon', href: '/favicon.png' }]],
	title: 'Vue Vixens Workshops',
	description: 'Workshops to teach web and mobile development with Vue.js to beginners',
	locales: {
		'/': {
			lang: 'en-US',
			title: 'Vue Vixens Workshops',
			description: 'Workshops to teach web and mobile development with Vue.js to beginners',
		},
		'/de/': {
			lang: 'de-DE',
			title: 'Vue Vixens Workshops',
			description: 'Anfänger-Workshops für Web-Entwicklung mit Vue.js',
		},
	},
	themeConfig: {
		repo: 'vuevixens/docs',
		editLinks: true,
		// custom text for edit link. Defaults to "Edit this page"
		editLinkText: 'Help us improve this page!',
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Team', link: '/workshop/TEAM' },
			{ text: 'Code of Conduct', link: '/workshop/CODE_OF_CONDUCT' },
		],
		locales: {
			'/': {
				selectText: 'Languages',
				label: 'English',
				sidebar: [
					{
						title: '🐶 Full Day Workshop',
						children: [
							'/workshop/full-day/ch1',
							'/workshop/full-day/ch2',
							'/workshop/full-day/ch3',
							'/workshop/full-day/ch4',
							'/workshop/full-day/ch5',
							'/workshop/full-day/appendix_1',
						],
					},
					{
						title: '🐾 Mini Workshops',
						children: [
							'/workshop/minis/mini1',
							'/workshop/minis/mini2',
							'/workshop/minis/mini3',
							'/workshop/minis/mini4',
							[
								'https://nsvue-workshop.netlify.com',
								'🔮 Mini Workshop 5: Build a complete mobile app - TarotMoji',
							],
						],
					},
					{
						title: '👩‍🎓 Nano Activities',
						children: [
							'/workshop/nanos/nano1',
							'/workshop/nanos/nano2',
							'/workshop/nanos/nano3',
							'/workshop/nanos/nano4',
							'/workshop/nanos/nano5',
							'/workshop/nanos/nano6',
						],
					},
				],
			},
			'/de/': {
				selectText: 'Sprache',
				label: 'Deutsch',
				sidebar: [
					{
						title: '🐶 Tagesworkshop',
						children: [
							'/de/workshop/full-day/ch1',
							'/de/workshop/full-day/ch2',
							'/de/workshop/full-day/ch3',
							'/de/workshop/full-day/ch4',
							'/de/workshop/full-day/ch5',
							'/de/workshop/full-day/appendix_1',
						],
					},
				],
			},
		},
	},
	markdown: {
		lineNumbers: true,
	},
};
