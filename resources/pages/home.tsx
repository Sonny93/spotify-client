import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState<number>(0)
  return (
    <div>
      hello
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  )
}
