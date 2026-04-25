What gets logged (`async/await` ordering)?
?

```javascript
async function run() {
  console.log("run-start");

  await Promise.resolve();

  console.log("after-await");
}

console.log("script-start");
run();
console.log("script-end");
```

