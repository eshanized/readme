export function getGitHubStats(username: string): string[] {
  return [
    `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=nord)`,
    `![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=nord)`,
    `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=nord)`,
    `![Profile Views](https://komarev.com/ghpvc/?username=${username}&color=#6495ed&style=for-the-badge)`
  ];
}