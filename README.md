# is

```unix
// Add as a dependency
npm install is.all --save
```
```javascript
import is from 'is.all';
```


```javascript
// Before

if (val === 'cat' || val === 'dog' || val === 'car' || val === 'home') {
  // code here ...
}

// After

if (is(val).any.equalsTo('cat', 'dog', 'car', 'home')) {
  // code here
}

```

```javascript
// Before

if (val === undefined || value === null) {
  // code here ...
}

// After

if (is(val).undefined.or.null()) {
  // code here
}

```


```javascript
// Before

if (typeof val === null || typeof val === 'function') {
  // code here ...
}

// After

if (is(val).type.null.or.func()) {
  // code here
}

```


```javascript
// Before

if (typeof val === 'string' || typeof val === 'number' || typeof val === 'symbol') {
  // code here ...
}

// After

if (is(val).type.string.or.number.or.symbol()) {
  // code here
}

// OR

if (is(val).type.any('string', 'number', 'symbol')) {
  // code here
}
```


