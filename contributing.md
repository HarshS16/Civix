# Contributing to Civix

We appreciate your interest in contributing to Civix!  
Civix aims to foster civic engagement and community collaboration, and we welcome contributors from all backgrounds.

## 👏 How you can contribute

- Reporting bugs or issues
- Suggesting new features or improvements
- Submitting bug fixes or new code
- Updating or adding to the documentation
- Providing UI/UX suggestions or design tweaks

---

## 🛠 Setting up for development

1. **Fork the repository**
 
2. **Clone the repository:**

  ```bash
git clone https://github.com/HarshS16/Civix.git
cd Civix
```
git clone https://github.com/Harshs16/civix.git

3. **Set up the project**.

## Contributing Guidelines

### Project Setup Instructions
**Prerequisites**
Node.js and npm
PostgreSQL

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/) (v8.x or later)
- [Postgres](https://www.postgresql.org/) (v13.x or later)

---

### Installation
1. **Clone the repository:**
2. **Install dependencies:**
   ```bash
       npm install
   ```
3. **Database Setup:** 
Create a new database for Civix:

```bash
createdb civix
```

Edit your configuration (typically a .env) to connect to your Postgres database:
```bash
DB_NAME=civix
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_pass
```
4. **Running the Application:**
Start the application in development:
```bash
npm start
```
### Branching Strategy

* Always branch out from `main`:

```bash
git checkout -b feat/your-feature-name
```

* Use these prefixes for your branches:

| Type    | Prefix   |
| ------- | -------- |
| Feature | `feat/`  |
| Fix     | `fix/`   |
| Docs    | `docs/`  |
| Chore   | `chore/` |

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```bash
git commit -m "feat(component): add navbar component"
```

### Pull Request Process

* Ensure your PR includes a clear title and description.
* Link to any relevant issues.
* Add screenshots or demos if applicable.
* PRs should:

  * Pass lint and formatting checks
  * Be reviewed by at least one maintainer
  * Be rebased or merged cleanly with `main`

---

## How to File a Bug

* Open an [issue]https://github.com/HarshS16/Civix/issues/new/choose
* Choose **Bug Report** template
* Include:

  * Steps to reproduce
  * Expected vs actual behavior
  * Screenshots or logs if helpful

---

## How to Request a Feature

* Open an [issue]https://github.com/HarshS16/Civix/issues/new/choose
* Choose **Feature Request** template
* Describe:

  * The problem you're solving
  * Why it's important
  * Your proposed solution

---

## Pull Request Checklist

Before submitting your pull request, please ensure the following:

* [ ] **Clear title and description** that explain what the PR does
* [ ] **Follows the branching strategy** (`feat/`, `fix/`, etc.) and **uses Conventional Commits**
* [ ] Code is **well-formatted** 
* [ ] Includes **tests** or **relevant usage examples**, if applicable
* [ ] All **new/updated components are documented**
* [ ] Screenshots/demos included (for UI changes)
* [ ] Linked to a related **issue** (if one exists)
* [ ] PR is up-to-date with the `main` branch (`git pull origin main` before pushing)
* [ ] Ready for review: tagged with appropriate labels (e.g., `enhancement`, `bug`, `docs`)
* [ ] Reviewed and approved by at least one maintainer

---

## Useful Resources

* [node](https://nodejs.org/en)
* [Conventional Commits Guide](https://www.conventionalcommits.org/en/v1.0.0/)
* [Open Source Guide](https://opensource.guide/how-to-contribute/)

---

## Code of Conduct

We follow the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). Be respectful, inclusive, and collaborative in all contributions.

---

Let’s build something great together!
