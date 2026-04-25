// promisify setTimeout

// standard promise chain
// const promiseOut = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('setTimeout')
//   })
// })

// promiseOut.then((response) => {
//   console.log(response)
// })

// use await/async
// async function promiseOut(time) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(`timeout for ${time}`);
//     }, time)
//   })
// }

// (async () => {
//   const output = await promiseOut(500);
//   console.log(output);
//   }
// )()

// Use a HOF to set the timeout values
// async function promiseOut() {
//   return (time) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(`timeout for ${time}`);
//       }, time);
//     });
//   };
// }


// (async () => {
//   const timeoutPromise = await promiseOut();
//   const message = await timeoutPromise(500);
//   console.log(message);
//   }
// )()


// One liner

// const wait = (time) => new Promise(resolve => setTimeout(resolve, time));


// async function processing() {
//   console.log("start");
//   await wait(500);
//   console.log("done");
// }

// processing();






