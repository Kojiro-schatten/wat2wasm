(module
  ;; 組み込み環境からimportしたオブジェクトenvが利用できる
  (import "env" "print_string" (func $print_string(param i32)))
  ;; バッファとは、複数の主体がデータを送受信する際に、処理速度や転送速度の差、タイミングのズレなどを補うためにデータを一時的に蓄えておく記憶装置や記憶領域のこと。
  ;; 線形メモリとは：　WebAssemblyは非常に単純なメモリモデルを持っています。 wasmモジュールは単一の「線形メモリ」にアクセスできます。これは基本的にはフラットなバイト配列です。このメモリは、ページサイズの倍数（64K）で増大する可能性があります。縮小することはできません。
  ;; envオブジェクトからメモリバッファをインポートすることと、そのバッファの名前がbufferあることをWebAssemblyに教える
  ;; memory 1 -> このバッファが１ページ（線形メモリに一度に割り当てることができるメモリブロックの最小単位）の線形メモリになることを示している
  ;; WebAssemblyのページサイズは６４KBで、このモジュールに必要な量よりも大きいため、１ページあれば十分。
  (import "env" "buffer" (memory 1))
  (global $start_string (import "env" "start_string") i32)
  (global $string_len i32 (i32.const 12))
  (data (global.get $start_string) "hello world!")
  (func (export "helloworld")
    (call $print_string (global.get $string_len))
  )
)
