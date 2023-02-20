# couch-supply

This is my first-ever VueJS project. Created from scratch.

<br />

> **Done is better than perfect.**
>
> I hope that you'll read this README carefully, as there are a lot of small things to master, but we actually don't need the perfect for this "educational" purpose.

## Live
[nezed.github.io/couch-supply](https://nezed.github.io/couch-supply)

## Contributing

On local setup, development and contribution see [CONTRIBUTING.md](./CONTRIBUTING.md).


## Left TODOs

- The beauty of UI, of course
    - As I'm not the designer, I've tried to focus on the quality of the project and the markup itself.
- More docs on services and components (eg storybook) should be
- Offline support is easy with ServiceWorker
- More space for reusable and separate services needs to be, eg in the case of `Promise.all`
- More normalized and stable models should be, would be nice to have codegen for DTOs
- More types of components, as well as levels of separation for the whole application structure, is the key to growth, eg NX monorepo-based approach to developing huge angular applications 
- Accessibility Check
- AdBlock check (which is nice to be a part of E2E in a Delivery cycle)
- Security audit (there are small security checkups provided by NPM and GitHub, but it's not enough for production)

<br />

## Software Architecture decisions

### Framework selection
There's not much to share in this case because:
- You're already using Vue
- I want to show how fast I can roll in it
- Vue is nice and proven tech with reasonable pros and cons

> Overall: <br />
> I've found Vue is really nice for small-to-medium projects and fast bootstrap.

### Tools and technologies
1. `create-vue` — was really necessary to save a lot of time in the initial setup for two reasons:
    - This is the first ever made VueJS project, so I'd better jump straight into technology than struggle with the initial setup;
    - Nice tooling setup takes really a lot of time.

    I'll describe this better below.
2. `pinia` – nice and Vue ecosystem-friendly syntax sugar, making work with actions (aka effects in some frameworks) and Vue's reactive ref's comfortable.
    > This looks really similar to a mix of Redux and MobX, which I'm finding extremely nice for quick and easy solutions, but for huge projects, I'd prefer RxJS with an effects-based approach or so.
3. `mande` — just about twenty lines of syntax sugar around Fetch API, more than enough for a such small project. So a pleasure to have such powerful browser API's nowadays.
    > For a big project I'd prefer a solution covering more specific cases, eg automatic request cancellations, which for example works out of the box when using Angular's HTTP module with RxJS.
4. `vitest` — ecosystem solution, which the main benefit for me is a nice module-oriented mocking approach. <br/>
    This is extremely nice in context with VueJS, which is module-oriented and does not have data types such as Singleton, (ES) Classes, and Objects.
5. JSX — easy to use, proven by time for approx 10 years, makes views safer to XSS and injections, but I found the escaping and security of Vue view not so safe as in Angular, for example. But it's a bit safer than in Angular.
6. `eslint` and `prettier` — it's hard to describe how code-analyzing tools are necessary nowadays, not only to spot best practices, and possible mistakes and make code with fewer formatting changes.
    > I'll not dig deeper here, cuz there are hours of things to talk about.
    > But there are some nice thoughts I want to share:
    > 1. For a Senior SWE positions interview, I have a question: "What is most important in Code review? How to make code review faster?" expecting from candidate to reveal both tools and Continuos approaches knowledge.
    > 2. Continuous **Deployment** ([don't mess with Delivery](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)) and approaches like Trunk Based Development<sup>[1]</sup> are impossible without proper Continuous culture and toolsю

    But I'm wondering, why there's no Prettier-compatible `.editorconfig` generated 🤔.
7. `Cypress` — proven and powerful recent game-changer in E2E testing for frontend purposes, there's nothing to add 😉.
    
    But even the Cypress is not perfect, so Playwright is trying to solve even more problems with its design. <br />
    This is nice evolution, and I've already heard some positive feedback on it. But it's not a big deal to choose for such a small project.
8. `typescript` — is necessary nowadays for such large projects to keep project scalable and maintainable


### Vue3, Composition API, and precompiled `"setup"` script
Despite legacy Vue approaches being so popular, I've tried to use most latest approaches, to make this code contain less code debt and be more consistent.

`"setup"` script approach is really nice to its precompiled features, even considering that it was not clear to me how to use it in some cases.

> Actually the Composition API looks extremely similar to React's hooks, and it's nice to see when proven approaches are commonly spread.


### Basic boilerplates
Yes, there was `create-vue` used to bootstrap the project.

But it's actually a codegen, you should yous code gens to make your work more efficient and make fewer mistakes.

> To make sure of my tooling experience, I do have
> - [`@tinkoff/linters`](https://github.com/Tinkoff/linters/graphs/contributors?from=2019-01-13&to=2023-02-16&type=a), where I've been the main contributor for a few months;
> - some old repos with [my own Webpack plugins](https://github.com/nezed?tab=repositories&q=webpack);
> - really old, but the approach to launch [BEM-based React CSS-modules](https://github.com/react-bem) together with Yandex (as BEM was invented as Yandex), before the css-modules or css-in-js became popular.


### Project structure
Despite there no so many elements and layers in project architecture decomposition, they still should follow principles such as **low coupling and high cohesion**.

One of the best approaches to organize such entities and layers is SOLID, which is flexible for architecture layers but strict for coupling and cohesion.

> This also brings me to understand that I'm feeling a lack of Dependency Inversion in common usages of VueJS, while Vue does have Dependency Injection API.

### Service-oriented architecture
> Please read the "Project structure" chapter first.

This is why at least the `clients` were introduced to project structure, as in modern data-intensive applications there are a lot of different kinds of services (in terms of Frontend), and they should follow SOLID-like guides to be reusable, extendable, and testable.

### Testing pyramid <sup>[2]</sup>

<img src="https://martinfowler.com/articles/practical-test-pyramid/testPyramid.png" style="background: rgba(255, 255, 255, .8);" />

1. `cypress/e2e/**/*.cy.ts` is the e2e test — which focused on product flow testing, to sure that real user is will be likely to be able to use the product

1. `.spec.jsx` is the module/component test — which focused on the component's behavior

1. `.test.ts` is the unit test — which focused on logic and services

### Test design and practices

The test design in this project is focused on:
- not to repeat tests on every layer of the pyramid
- test the most important and fragile parts of implemented logic
- make sure that real user is will likely to be able to use the product

AAA (Arrange, Act, Assert)<sup>[3]</sup> <sup>[4]</sup> — nice and easy to use as a convenient way to write atomic, easy to read, and debug tests.


<br />

## My first experience with Vue in overall

### ➕ The pros

#### Flexibility
This gives ability 

#### Easy to scale (at the beginning)

Everybody is capable to use Vue for any company's project however, relying on a bunch of Vue-ecosystem solutions, which release rapidly, would bring us to inconsistency soon, as well as:
- different approaches to setup test infrastructure
- different approaches to handle navigation (eg, query or hash)
- different approaches to sate managing

<br />

### ➖ The cons

#### The code base may become outdated fast and frequently
As the Vue ecosystem is growing fast, the price for the flexible solution is its fast mutation and growth, bringing a lot of backwards compatible and incompatible, but changes.

#### Hard to scale at the same time, when a project grows to huge sizes
As I've mentioned in the pros section, with Vue for a company it's easy to start and develop.

But such a picture can make the Inner-Sourcing of shared components much harder and bring additional problems, especially in case if most developers are entry to mid-level.

> **Important to notice:**
>
> Tinkoff Bank's frontend was initially built to serve retail banking and to grow fast, so React was chosen. That was ~2015's.
>
> Later much more departments and products were created, and including experience with React, the company decided to go further with most of the new products with Angular. <br />
> This brings the company to the situation where half is React, half is Angular and two completely same UI-kits on different frameworks are maintained.

#### Not-so-safe views
Example:
```jsx
<MyComponent :prop="Number(store.value)" />
<TvShowPreviewItem :href="'/show/' + show.id" />
```
As you can see, I'm able to execute both the `Number` function from global scope and string templates, which means that Global scope is accessible within the view and the code execution is likely to be possible.<br />

> **This may be exploited.**
> 
> E.g. due to lack of escaping or with buffer overflow/out-of-bounds attack.

#### Sometimes there's too much freedom
This requires more rules and guides to be created and followed by the company for not to get into a situation when the project becomes hard to maintain and scale soon after the beginning.


<br />

---

## References
- [1] https://trunkbaseddevelopment.com/
- [2] https://martinfowler.com/articles/practical-test-pyramid.html
- [3] https://blog.ncrunch.net/post/arrange-act-assert-aaa-testing.aspx
- [4] https://martinfowler.com/bliki/GivenWhenThen.html
- https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment