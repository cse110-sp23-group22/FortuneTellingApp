---
status: pending
date: 2023-06-05
deciders: Ryan Lee, Arjun Kumar
informed: N/A
---
# Unified Naming Convention

## Context and Problem Statement
We need a unified naming convention for as many files as possible.

## Considered Options
1. PascalCase for all files, camelCase for code variables. Make exceptions for things that require specific names like docs/ or config files.
  - There are... a lot near-root directories that are already lower case.
2. PascalCase for all "module" folders and .html, .css, .js, and .md files, as well as custom-made assets; kebab-case for everything else. Do not apply a naming convention to downloaded assets.
  - This includes kebab case for workflows, which seems to be common convention
  - exception to PascalCase: index.html. Also make exceptions for other things that require specific names like docs/ or config files. Also make exceptions for .md files that have to match the name of their directory (typially used to provide a description of what that directory is for).

## Decision Outcome
PascalCase for modules, kebab-case for everything else.