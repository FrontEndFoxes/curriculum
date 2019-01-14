module.exports = {
	base: '/docs/',
	head: [['link', { rel: 'icon', href: '/favicon.png' }]],
	title: 'Vue Vixens Workshops',
	description: 'Workshops to teach web and mobile development with Vue.js to beginners',
	themeConfig: {
		repo: 'vuevixens/docs',
		editLinks: true,
		// custom text for edit link. Defaults to "Edit this page"
		editLinkText: 'Help us improve this page!',
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Team', link: 'http://www.vuevixens.org' },
			{ text: 'Code of Conduct', link: '/workshop/CODE_OF_CONDUCT' },
		],
		sidebar: [
			{
				title: '🐶 Full Day Workshop',
				children: [
					'/workshop/full-day/ch1',
					'/workshop/full-day/ch2',
					'/workshop/full-day/ch3',
					'/workshop/full-day/ch4',
					'/workshop/full-day/ch5',
					'/workshop/full-day/ch6',
					'/workshop/full-day/appendix_1',
				],
			},
			{
				title: '🐾 Mini Workshops',
				children: ['/workshop/minis/mini1', '/workshop/minis/mini2', '/workshop/minis/mini3'],
			},
			{
				title: '👩‍🎓 Nano Activities',
				children: ['/workshop/nanos/nano1', '/workshop/nanos/nano2', '/workshop/nanos/nano3'],
			},
		],
	},
};
