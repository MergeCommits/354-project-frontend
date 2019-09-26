## Notes:
* Information from the "Overall Code Conventions" file applies here.

## Actual rules:
* K&R bracket style with spaces between control statements and parentheses/braces.
    * Put the opening bracket at the end of the first line.
    * Use one space before the opening bracket.
    * Put the closing bracket on a new line, without leading spaces.

```js
//Do this:
if (args) {

}

do {

} while (args);

// And not this:
if(args){

}

do{

}while(args);

// And not this either:
if (args)
{

}

do
{

}
while(args);
```
* Use braces even when they can be omitted.

```js
// Do this:
if (args) {
    foo();
}

// And not this:
if (args)
    foo();

// Single-line if statements are allowed, but braces are still required.
if (args) { foo(); }
```

* Lower camelCase for function and variable names.
```js
let theThing = "banana sunday";
```
* Upper CamelCase for class/struct names.
```js
class TheThing {

}
```

* Use `===`/`!==` over `==`/`!=` equality checks to avoid type cohesion.
* Avoid implicit casting period. Use `integerVal.toString()` to cast numbers to strings.