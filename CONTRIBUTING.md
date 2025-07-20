# Git Workflow: Team Collaboration Guide

**This document outlines our standard Git workflow to ensure smooth collaboration, maintain code quality, and prevent conflicts.**

---

### **1. `Main` Branch (The Source of Truth)**

- **The main branch always contains stable, production-ready code.**

- **`NEVER` push directly to main. All changes must go through a Pull Request.**

### **2. Feature Branches (For All Your Work)**

- **Always create a new branch for every new feature, bug fix, or significant change.**

- **Naming: Use descriptive names, e.g., feature/add-user-profile, bugfix/fix-login-error, refactor/api-cleanup.**

**How to create:**

```bash
git checkout main              # Ensure you're on main
git pull origin main           # Get the latest update from main
git checkout -b feature/your-feature-name # Create and switch to your new branch
```

### **3. Working on your branch**

**Commit and push regularly**

```bash
git add .
git commit -m "Descriptive message of your change"
git push origin feature/your-feature-name
```

### **4. Keeping Your Branch Updated (Stay Synced with `main`)**

**Regularly pull in changes from main to your feature branch to minimize merge conflicts later.**

```bash
git checkout feature/your-feature-name
git merge main # Resolve conflicts if any
git push origin feature/your-feature-name
```

### **5. Pull Requests (PRs) & Merging**

- **When ready: When your feature is complete and tested, open a Pull Request (PR) from your `feature/your-feature-name` branch to main.**

- **Code Review: Either a team member review your code or you do that yourself to ensure everything is correct.**

- **Automated Checks: Ensure all automated tests/checks pass before merging.**

- **Merging: Once approved and checks pass, merge the PR into main. Use `"Squash and Merge"` on GitHub to keep main's history clean. `NOTE:` clicking on `"Merge"` will not merge, use `"Squash and Merge"` instead.**

- **Clean Up: Delete your feature branch after it's merged.**
