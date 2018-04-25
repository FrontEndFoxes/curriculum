module.exports = {
    themeConfig: {
      repo: 'vuevixens/docs',
        // if your docs are not at the root of the repo
        docsDir: 'workshop',
        // optional, defaults to master
        docsBranch: 'master',
        // defaults to true, set to false to disable
        editLinks: true,
        // custom text for edit link. Defaults to "Edit this page"
        editLinkText: 'Help us improve this page!',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Team', link: 'http://www.vuevixens.org' },
        ],
        sidebar: [
          '/workshop/',
          ['/workshop/ch1', 'Chapter 1: Introducing the My Pet Shop Web Site'],
          ['/workshop/ch2', 'Chapter 2: Build a Pet Gallery'],
          ['/workshop/ch3', 'Chapter 3: Connect your Project to an API'],
          ['/workshop/ch4', 'Chapter 4: Create a Dog Adoption Experience'],
          ['/workshop/ch5', 'Chapter 5: Complete the Adoption Experience with a Form'],
          ['/workshop/mini1', 'Mini Workshop 1: Build a Mobile App to Choose a Pet']
        ]
      },
    title: 'Vue Vixens Workshops',
    description: 'Workshops to teach web and mobile development with Vue.js to beginners'
  }