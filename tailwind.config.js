// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
      "./src/*.{html,ts}",
      "./projects/**/*.{html,ts}",
      "./node_modules/primeng/**/*.{html,ts}"
    ],
    plugins: [],
    corePlugins: {
      preflight: true, // Mantém o reset CSS
    },
    // Adicione temas/extensões se necessário
    theme: {
      extend: {

      }
    }
  }
