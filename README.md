# testcafe-axe-example
Helper for using Axe in TestCafe tests

## How to install it?

Just copy `axe-helper.js` and `axe.min.js` and put them in some dir in your project.

## How to use it?

You can write TestCafe test like this:

```js
import axeCheck from './axe-helper';

fixture `TestCafe tests with Axe`
    .page `http://localhost/testcafe/index.html`;

test('Automated accessibility testing', async () => {
    await axeCheck();
});
```

If some accessibility problems will be found you will see corresponding error.

![Accessibility errors](https://github.com/helen-dikareva/testcafe-axe-example/blob/master/error.png)

## Axe options

Please see [Axe run](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axerun) method API.
You can define `context` and `options` in TestCafe test:

```js
test('Automated accessibility testing', async () => {
    var axeContext = { exclude: [['select']] };
    var axeOptions = { rules: { 'html-has-lang': { enabled: false } } };

    await axeCheck(axeContext, axeOptions);
});

```
