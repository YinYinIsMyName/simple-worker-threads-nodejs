const { Worker, isMainThread } = require("worker_threads")
const logupdate = require('log-update')
const Limit = 1000000
const threads = 10;
const numberPerThread = Limit / threads
const outputFile = `${__dirname}/output/text.txt`

//fill value 0 into empty array
//test with no ... ,you will see one array section
//as it must have ...,you will see 10 array section
//when you want to run App.js,use this command line node --experimental-worker App.js
let names = [...Array(threads)].fill(0)

//when you starts the app it will create workers
//workers works as much as threads has
if (isMainThread) {
    for (let i = 0; i < threads; i++) {
        const port = new Worker(require.resolve("./worker.js"), {
            workerData: { outputFile, numberPerThread }
        })

        port.on("message", (data) => hanldeMessage(data, i));
        //workers will loop untill thread number
        //if parent workers and child workers cannot communicate, it will pop up error message
        port.on("error", (e) => console.log(e))
        //after finished looping,it will leave from the loop with code 
        port.on("exit", (code) => console.log(`Exit code ${code}`))
    }

}
const hanldeMessage = (_, index) => {
    names[index]++
    console.log(names)
    logupdate(

        names.map((status, i) => `Threads ${i}:${status}`).join("\n")
    );
}

//this is the reference site =>https://itnext.io/going-multithread-with-node-js-492258ba32cf