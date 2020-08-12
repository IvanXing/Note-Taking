#! /usr/bin/env node
console.log(process.argv.slice(2).reduce((memo,current)=>memo+=current,0))