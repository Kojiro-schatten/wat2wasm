(module
  ;; まずエクスポートの名前をSumSquaredに変更する
  (func (export "SumSquared")
    (param $value_1 i32) (param $value_2 i32)
    (result i32)
    ;; $sum = ローカル変数の追加
    (local $sum i32)
    ;; i32を呼び出す
    (i32.add (local.get $value_1) (local.get $value_2))
    ;; $sum　にlocal.set $sumを呼び出しスタックから値をポップして、格納する
    local.set $sum
    ;; S式構文で、i32.mulを呼び出し。
    ;; local.get呼び出しを使って、両方のパラメータに$sumの値を渡す
    (i32.mul (local.get $sum) (local.get $sum))
  )
)
