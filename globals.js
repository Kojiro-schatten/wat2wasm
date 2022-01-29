const fs = require('fs');
const bytes = fs.readFileSync('./globals.wasm');
let global_test = null;

let importObject = {
  js: {
    log_i32: (value) => { console.log("i32: ", value) },
    log_f32: (value) => { console.log("f32: ", value) },
    log_f64: (value) => { console.log("f64: ", value) },
  },
  env: {
    // JSとWATの数値では、アンダースコアは無視される
    // ３２ビット符号なし整数の最大値が4,294,967,295 +1を足すと、３２ビット整数は０の値に戻っている。
    // JSとWebAssemblyの３２ビット浮動少数点数は、数値を２３ビット使い、
    import_i32: 5_000_000_000,
    import_f32: 123.0123456789,
    import_f64: 123.0123456789,
  }
};

(async () => {
  let obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject);
  ({globaltest: global_test} = obj.instance.exports);
  global_test();
})();

// ローカル変数やパラメータに格納される値は、local.getを使ってスタックにプッシュする。
