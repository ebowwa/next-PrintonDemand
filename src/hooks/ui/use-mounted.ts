import * as React from "react"

export function useMounted() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
// The `useMounted` function is a custom React hook designed to determine whether a component is mounted or not.

// It initializes state using the `useState` hook from React to hold a boolean value indicating whether the component is mounted (`mounted`).

// The `useEffect` hook is employed to update the `mounted` state to `true` when the component mounts. Since the dependency array is empty (`[]`), this effect only runs once after the initial render.

// Once the component mounts, the `mounted` state is set to `true`, indicating that the component is now mounted.

// The hook returns the `mounted` state value, allowing components to check whether they are currently mounted or not.
