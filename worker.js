const fs = require('fs-extra')
const { getRandomIndex } = require('./utlis')
const first_json = require('./data/first_name.json')
const middle_json = require('./data/middle_name.json')
const second_json = require('./data/second_name.json')
const { parentPort, workerData } = require('worker_threads')

const { numberPerThread, outputFile } = workerData
const a = async () => {
    try {

        for (let i = 0; i < numberPerThread; i++) {
            const data = [first_json, middle_json, second_json].map(getRandomIndex).concat("\n").join(" ")

            await fs.appendFile(outputFile, data)
            //have to communicate with child and parent,so that app works properly
            //test with no parentPort and see the result
            parentPort.postMessage(data)
            return
        }
    } catch (error) {
        return error
    }
}

a().then(d => {
    console.log("get done")
})
    .catch(err => console.log(err))

