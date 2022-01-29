// Node.jsからWebAssemblyを呼び出す。
const fs = require('fs')

// bytesは、WebAssemblyファイルから受け取ったバイトでーた
const bytes = fs.readFileSync(__dirname + '/AddInt.wasm')
// process.argv[0] nodeコマンドが含まれている
// process.argv[1] JSのファイルの名前が含まれている
// process.argv[2],[3] 引数が含まれている
const value_1 = parseInt(process.argv[2]);
const value_2 = parseInt(process.argv[3]);

// call WebAssembly function with then callback
WebAssembly.instantiate(new Uint8Array(bytes))
  .then(obj => {
    let add_value = obj.instance.exports.AddInt(value_1, value_2);
    console.log(`${value_1} + ${value_2} = ${add_value}`)
  })


// (async () => {
//   const obj = await WebAssembly.instantiate(new Uint8Array(bytes))
//     console.log(obj)
//     let add_value = await obj.instance.exports.AddInt(value_1, value_2)
//     console.log(`${value_1} + ${value_2} = ${add_value}`)
//   })
// ()
