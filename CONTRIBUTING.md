# Contributing to Wellness

First off, thank you for considering contributing to Wellness! It's people like you that make Wellness such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** if possible.
* **Include your environment details** (OS, browser, Node.js version, etc.).

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps** or provide mockups/wireframes.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Explain why this enhancement would be useful** to most Wellness users.

### Pull Requests

* Fill in the required template
* Follow the TypeScript styleguide
* Include screenshots and animated GIFs in your pull request whenever possible
* End all files with a newline
* Follow the existing code style and conventions

## Development Process

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/wellness.git
   cd wellness
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. Make your changes in your feature branch
2. Test your changes:
   ```bash
   npm run dev
   ```
3. Lint your code:
   ```bash
   npm run lint
   ```
4. Build the project to ensure it compiles:
   ```bash
   npm run build
   ```
5. Commit your changes with a descriptive commit message
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Open a Pull Request

### Commit Message Guidelines

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
  * 🎨 `:art:` when improving the format/structure of the code
  * 🐛 `:bug:` when fixing a bug
  * ✨ `:sparkles:` when introducing new features
  * 📝 `:memo:` when writing docs
  * 🚀 `:rocket:` when improving performance
  * ✅ `:white_check_mark:` when adding tests
  * 🔒 `:lock:` when dealing with security
  * ⬆️ `:arrow_up:` when upgrading dependencies
  * ⬇️ `:arrow_down:` when downgrading dependencies
  * 🔧 `:wrench:` when changing configuration files

## Styleguides

### TypeScript Styleguide

* Use TypeScript for all new code
* Prefer `const` over `let` and avoid `var`
* Use arrow functions when possible
* Use template literals for string interpolation
* Use async/await over promises when possible
* Add types to all function parameters and return values
* Use meaningful variable names
* Keep functions small and focused on a single task
* Add JSDoc comments for complex functions

### Component Styleguide

* Use functional components with hooks
* Keep components small and focused
* Extract reusable logic into custom hooks
* Use proper prop types
* Follow the existing component structure in the project
* Place shared components in `src/components/`
* Place UI components in `src/components/ui/`

### CSS/Styling Styleguide

* Use Tailwind CSS utility classes
* Follow mobile-first responsive design
* Keep custom CSS minimal
* Use CSS variables for theme values
* Maintain consistency with existing components

## Project Structure

```
wellness/
├── src/
│   ├── components/       # Reusable components
│   │   └── ui/          # Shadcn UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── ...config files
```

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Documentation only changes
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `question` - Further information is requested

## Questions?

Don't hesitate to ask questions by opening an issue. We're here to help!

## Recognition

Contributors will be recognized in the project. Thank you for your contributions!

---

Thank you for contributing to Wellness! 🎉
