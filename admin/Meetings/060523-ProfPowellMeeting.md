# Questions for Powell on Project Development
We plan to share our project with Powell to get guidance on our development (and also because he seems to like teams being in close contact with our “shareholders”). Write any questions that you want to ask him!

1. As the “shareholder,” do you like what you see?
2. The one question we really have: Is there anything that we have not mentioned that we are aware of that you, based on your experience, feel that we should change?
3. We recently reformatted almost the entire codebase (via aligning most branches with the development branch and reformatting the development branch). We currently only check for and warn about formatting issues, but don’t fix them. In such a case, are there still drawbacks to executing a reformat on build?
# Things we are aware of
- Usability/Readability
  - Make user aware of why the screen turns red (readability)
  - Add sound effects mirroring the effects happening on screen (for accessibility and plain ol’ user experience)
- Maintainability
  - Naming conventions — branch names and file names should have been similar
    - Currently there’s camelCase, kebab-case, and PascalCase!
    - Risky to do for branches, but perhaps file names can be refactored
- Documentation is present and descriptive, but messy
  - JSDocs are being generated, but not cleanly. We need to learn how to mold its output so that it’s properly organized. This may result in organizational/code clarity boons for the code itself.
- Testing should be more pervasive.
- Testing for Tarot Cards is underway; we just finished a basic version for that particular module.
- Testing involving localStorage is dicey. Will need more time to work out.
Our current model of Agile methodology
- Sprints every week, after which is a sprint review. After week 8 we figured out how to do retrospectives, which we do after every sprint review (just 1 so far but another coming tomorrow, this Tuesday)
  - We have been lucky enough to have all teams merge changes into the development branch (named prod for historical reasons) after each sprint review. This presents the occasional opportunity to refactor things repo-wide right after the sprint review.
- The workflow that has emerged is: first brainstorm the functionality only of the MVP, with minimal requirements for design. Complete that functionality; teams have the flexibility to modify whatever design specifications exist, if they cannot be completed in a reasonable amount of time. Afterward, brainstorm once more, specifically for design. Again lop off any requirement that is too technically taxing. ADRs created for each brainstorm and as needed after on-the-ground decisions.
CI/CD
- More closely aligns with GitFlow
- Build pipeline has linting and code format checks. They don’t need to pass to proceed with the push, but provide some guidance on what to do next.
Administration info
- Adding a contributors page could be nice.

## Notes
- Things in the user interface should be as effortless as possible (with a few changes
  - The first page is not particularly useful, especially since you recycle people back to the first page. You only go to the main selection page after.
- Text is too small, the images are a little overwhelming. 
  - The images could be greyed, text needs to be larger.
- What if you want to expand? Say, settings (e.g. toggling sound off), or more services. -  Make the home page more amenable to such expansion, somehow.
  - Possibly add a credits link.
- Continue button has a lot of mouse travel. 
  - Trigger on enter for example. Powell said, make the button more easy to click. Also signal when you’ve 
- There needs to be a ceremonial effect for the output page
  - Hey, we’ve already planned that! The gong was actually supposed to go with the end, and there would be a special transition for the end page.
Questionnaires appear a bit 
  - Aesthetic integrity: If you use a style, you have to be consistent across everything.
  - A dialogue box/visual novel text box will help keep aesthetics aligned
- On the Tarot card, line length has to be smaller. Make everything fit in a column.
- Give the person an illusion that “something is happening” every time.
  - Powell suggested making ChatGPT write a bunch of descriptions.
Localization for languages.
  - Refactor names by wednesday TODAY
- Resolve JSDocs after refactor, before or in parallel with cosmetics
  - Currently no one wants to use the JSDocs the way it looks.
  - This is one way graders would figure out how the app works! So it’s important even for grading (but even without grading it’s important).
- Testing: https://playwright.dev/
- Write Unit Tests even if they’re stupid simple (cuz you never know)
  - Consider even arbitrarily large amounts of input! 1MB!
- Could you brainstorm in isolation?
  - Yea, but you need super decoupled architecture.
- Delineate between developer-friendly build/pipeline processes and user processes
- Example of user-friendly build: minify, build, compression
- Example of developer friendly build: reformatting, check for comments/readability
- Example of mixing (should be avoided generally): reformatting while also deploying
