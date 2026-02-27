# lakbai website

Website for lakbai navigation and routing system

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lakbai-platform/lakbai-web.git
   cd lakbai-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Contact the team lead or check the internal team hub for the `DATABASE_URL` and `DIRECT_URL` connection strings and add them.

4. Generate the Prisma Client (required for database models):
   ```bash
   npx prisma generate
   ```

### Running Locally

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Next.js** - React framework for production
- **TailwindCSS** - Utility-first CSS framework
- **Mapbox GL** - Interactive maps and navigation

## Contributing

This is an academic project and we encourage this projects primary developers to participate.

**Before contributing, please read our [Contributing Guide](CONTRIBUTING.md)**
for:

- Development workflow
- Branching and commit conventions
- Coding standards
- Pull request guidelines

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git switch -c feat/your-feature`
3. Make your changes following our
   [coding standards](CONTRIBUTING.md#coding-standards)
4. Commit using
   [conventional commits](CONTRIBUTING.md#commit-message-conventions)
5. Push and create a Pull Request

## License

This project will be licensed under AGPL v3. See [LICENSE](LICENSE) file for
details.

## Contact

- **Email:** [lakbai.phl@gmail.com](mailto:lakbai.phl@gmail.com)
- **GitHub Issues:**
  [Report bugs or request features](https://github.com/lakbai-platform/lakbai-web/issues)
- **Repository:**
  [https://github.com/lakbai-platform/lakbai-web](https://github.com/lakbai-platform/lakbai-web)
