const fs = require('fs-extra')
const { getRandomIndex } = require('./utlis')
const first_json = require('./data/first_name.json')
const middle_json = require('./data/middle_name.json')
const second_json = require('./data/second_name.json')
const Limit = 1000000
const outputFile = `${__dirname}/output/text.txt`
///have to read json file and loop all of data using async and await
//you can create another txt file and append to it and test again
//this is single thread ,it works at a time
   const a= async() => {
        try {
            
            for (let i = 0; i < Limit; i++) {
                const data = [first_json,middle_json,second_json].map(getRandomIndex).concat("\n").join(" ")
    
                return await fs.appendFile(outputFile,data)
            }
        } catch (error) {
            return error
        }
    }

    a().then(d=>console.log("get done"))


    