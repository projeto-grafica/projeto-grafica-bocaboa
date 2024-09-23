/** @type {import('@docusaurus/types').Config} */

module.exports = {
  title: 'Projeto Gráfica',
  url: 'https://projeto-grafica.github.io',
  baseUrl: '/projeto-grafica-bocaboa/',
  organizationName: 'projeto-grafica',
  projectName: 'projeto-grafica-bocaboa',

  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Projeto Gráfica',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentação',
        },
      ],
    },
  },
};

