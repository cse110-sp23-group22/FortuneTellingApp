
* JSDocs generates html style documentation based on ***block comments*** (describing the function) and ***tutorial*** files.
  In order for JSDocs to recognize the documentation, it must adhere to the following format.
```
/**
 * <Function Description>
 * @class <Class Name>
 * @tutorial <Tutorial Filename>
 */
function Socket() {}
```
* (Note the /\*\* comment \*/ format for block comments. It's silly, but /\* comment \*/ won't work.)
* The @class header will group the function descriptions to a single page. Otherwise, it defaults to the "Global" page.
* The @tutorials <filename> will add a link to the markdown/html file containing additional documentation (excluding the extension).