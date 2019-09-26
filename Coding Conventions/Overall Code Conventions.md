# The ~~Communist~~ Manefesto
## Notes:
* This is still a draft. Rules are subject to change/debate until the back-end and front-end coordinators agree upon them.

* Due to the differences between each language's coding conventions, they have been split into multiple files. This one refers to conventions that should be followed on all platforms. Other language-specific details will be in their own respective coding convention files.

* In the event that someone unwillingly violates these conventions don't be overly dickish about it. Either discuss it with them calmly or silently fix it yourself.

## Actual rules:
### Syntax:
* Indentations that are multiples of 4 spaces, no tabs. Different editors will interpret tab sizes differently.

* Match continuation lines horizontally. Note that this may violate the 4 spaces rule.

```py
# Do this:
foo = long_function_name(var_one, var_two,
                         var_three, var_four)

# And not this:
foo = long_function_name(var_one, var_two,
    var_three, var_four)
```

* Line breaks should go before binary operators.

```py
# Do This:
income = (gross_wages
          + taxable_interest
          + (dividends - qualified_dividends)
          - ira_deduction
          - student_loan_interest)

# And not this:
income = (gross_wages +
          taxable_interest +
          (dividends - qualified_dividends) -
          ira_deduction -
          student_loan_interest)
```

* Always put spaces between operators/control statements.

```js
// Do this:
int thing = 1;
if (param) {
    thing = 2;
}

// And not this:
int thing=1;
if(param){
    thing=2;
}
```

* Do not put a space after function names.
```js
// Do this:
foo(1);

// And not this:
foo (1);
```

* Start variable/function names with ASCII letters and nothing else.

* All caps SNAKE_CASE for constants/enum values.

* Use double quotes for literal strings. `"` and not `'`.

### File:

* LF newlines. Only exception is .txt files which should be CRLF newlines because of Windows Notepad.

* UTF-8 encoding.

* Explicitly close/dispose of files and sockets when done with them.

### Done?