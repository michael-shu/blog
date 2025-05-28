---
title: "Barrel Files"
date: "05/07/2025"
slug: "barrel-files"
length: "5 min"
tags: "javascript, typescript, barrel"
---

## Understanding Barrel Files in JavaScript/TypeScript

Libraries are used by software engineers as a quick and easy way to add functionality that isn't in the base language. Packages are the compiled versions of these libraries that you download throughout your codebase.

For instance, in a React project, a typical structure is to have a components folder that contains UI elements that occur commonly throughout your pages. This would be your component library. A simple component library might look something like this.  

```ts
/components
  ├── Button.tsx
  ├── Modal.tsx
  └── Card.tsx
```

Which you would import using the following code. Your import path will change depending on how far down the target file is in your folder structure.
```ts
Index.ts
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import { Card } from './components/Card';
```

This isn't an issue with smaller codebases. But when you're importing numerous files, it becomes quite cumbersome to import them all. So, what is the solution? **Barrel Files**

## 🔍 What is a Barrel File?

A **barrel file** is typically an `index.ts` or `index.js` file that re-exports selected exports from other files in the same directory.

For example, instead of writing:
```ts
Index.ts
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import { Card } from './components/Card';
```

You can write:
```ts
Index.ts
import { Button, Modal, Card } from './components';
```

Thanks to a barrel file at ```components/index.ts```.  As for published libraries, using barrel files is a must, because requiring the user to know the structure of your codebase to import would remove a great deal of the convenience of installing the package. 

---

## 🛠️ Making a Barrel File

You would modify the file structure, by creating an index.ts like so:
```ts
/components
  ├── Button.tsx
  ├── Modal.tsx
  ├── Card.tsx
  └── index.ts // [!code ++]
```

**index.ts** (barrel file) would look like this:
```ts 
Index.ts
export {Button} from './Button';
export {Modal} from './Modal';
export {Card} from './Card';
```

## ⚠️ Costs of barrel files

Barrel files make our lives easier as software developers. So, what's the catch?

An ironclad rule of software engineering is that there is no free lunch. No free lunch means that this convenience like so many other things in software engineering, is a tradeoff between developer experience and app performance. 

We're going to examine how the bundle that is passed to your client, is affected by the addition and by definition, the removal of barrel files. 

---

## Example Project

I created my own sample application, with 10 dummy files being imported into a barrel file. 
Only one of them is imported and used, but all 10 are exported from the barrel file. 

When we use the nextjs bundle analyzer to examine the bundle size, we find that the package sent to the nodejs part of the application is bigger when using barrel files. This becomes very clear when 


---

## ✅ Benefits of Using Barrel Files

- **Cleaner imports**: Keeps your import statements tidy.
- **Centralized exports**: One place to manage module exports.
- **Easier refactoring**: Changing a file path in one place updates everywhere.
- **Scales well**: Especially useful in large codebases or component libraries.

---

## ⚠️ Costs of Barrel Files

- 🔄 **Circular dependencies**: Be cautious if multiple modules import each other via barrels.
- 🐢 **Potential build slowdown**: Re-exporting everything can make tree-shaking less efficient.
- 🧱 **Overuse**: Only barrel things that logically belong together.

---

## 📌 Conclusion

Barrel files are a smart and simple way to clean up your imports and keep your project organized. When used thoughtfully, they reduce friction during development and make your codebase easier to navigate.

---

*Happy coding! 🧑‍💻*
