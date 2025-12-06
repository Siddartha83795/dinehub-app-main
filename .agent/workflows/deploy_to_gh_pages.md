---
description: How to deploy the Next.js app to GitHub Pages
---

# Deploy to GitHub Pages Guide

This guide explains how to deploy your application to GitHub Pages using the configured workflow.

## Prerequisite: GitHub Repository Settings

1.  Push your code to your GitHub repository.
2.  Go to your repository on GitHub.
3.  Navigate to **Settings** -> **Pages**.
4.  Under **Build and deployment** -> **Source**, select **GitHub Actions**.
    *   *Note: This is crucial. Do not select "Deploy from a branch".*

## Deployment Process

1.  The workflow is defined in `.github/workflows/deploy.yml`.
2.  It triggers automatically when you push to the `main` branch.
3.  You can view the progress in the **Actions** tab of your repository.

## Important Notes

*   **Static Export**: The application has been configured as a Static Site (`output: 'export'`).
*   **Dynamic Features**: Server-side features (like AI Wait Time Prediction) have been **mocked/disabled** because they cannot run on GitHub Pages (which is static hosting only).
*   **Routing**: Dynamic routes (e.g., `/menu/outlet-1`) are pre-rendered at build time.

## Verification

Once the "Deploy to GitHub Pages" action completes (Green checkmark):
1.  The URL will be shown in the Actions run summary.
2.  It typically looks like `https://<your-username>.github.io/<repo-name>/`.
