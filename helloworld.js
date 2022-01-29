const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/helloworld.wasm');

let hello_world = null; //関数は後で設定
let start_string_index = 100; //線形メモリでの文字列の位置
// Memoryオブジェクト＝WebAssemblyインスタンスがアクセスする線形メモリを表す。
let memory = new WebAssembly.Memory({ initial: 1 }); //線形メモリ

let importObject = {
  env : { // WebAssemblyモジュールをインスタンス化するときに渡す値。
    buffer: memory,
    start_string: start_string_index,
    print_string: function(str_len) {
      // メモリバッファ内の文字列の長さを取り出す。
      const bytes = new Uint8Array(memory.buffer, start_string_index, str_len);
      // その値を文字列の開始位置と組み合わせることで文字列オブジェクトを作成する
      const log_string = new TextDecoder('utf8').decode(bytes);
      console.log(log_string);
    }
  }
};

(async () => {
  let obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject);
  ({helloworld: hello_world} = obj.instance.exports);
  hello_world();
})()
// (async () => {
//   // 非同期IIFEで、WebAssemblyモジュールをインスタンス化する
//   let obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject);
//   ({ helloworld: hello_world } = obj.instance.exports);
//   hello_world();
// })();

// 文字列やその他のより高度なデータ構造は線形メモリで直接管理しなければならない。
// 代わりに、JSからグローバル変数をインポートすると、アプリケーションのJS部分でモジュール内の定数値を設定できる。
// JSの数値は６４ビット浮動小数点点数である。→３２ビット整数の全ての値を表すことができる
