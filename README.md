<h1>
    <img src="./static/logo-full-white.svg" height=25>
    Frontend - Your modern carsharing solution
</h1>

> also see [Voycar Backend](https://github.com/solid-stack-solutions/voycar-backend)!

### Technology Overview
- JavaScript (using [Node.js](https://nodejs.org))
- [Skeleton](https://www.skeleton.dev/), including...
    - [Tailwind CSS](https://tailwindcss.com/)
    - [SvelteKit](https://kit.svelte.dev/), including...
        - [Svelte](https://svelte.dev/)
        - [Vite](https://vitejs.dev/)
- Code style and debugging
    - [ESLint](https://eslint.org/)
    - [Prettier](https://prettier.io/)
    - [Svelte Inspector](https://github.com/qutran/svelte-inspector)

# Installation and Usage
- Have [Docker](https://www.docker.com/) set up
- Get the source code, e.g. with...
```sh
git clone https://github.com/solid-stack-solutions/voycar-frontend
cd voycar-frontend
```
- Run `docker compose up`

# Development
> Requires [`node` / `npm`](https://nodejs.org)

```sh
# run app locally
npm run dev
# reload by typing "r" and enter in the terminal
# inspect svelte components with ctrl+alt+i in webapp

# check formatting / code style
npm run check-format
# apply configured formatting rules
npm run format
```

### Conventions
- Run `npm run format` before creating a PR
- Comments start with a space and a capital letter, e.g. `// This is a comment`
