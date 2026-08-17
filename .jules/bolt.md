## YYYY-MM-DD - [Optimize Event Listeners]
**Learning:** Attaching global event listeners for interactions like scroll or clicks when components are mounted but in an inactive state (e.g. collapsed tooltips) leads to unnecessary background execution of callbacks and possible main thread lagging.
**Action:** Always conditionally attach event listeners when an element transitions into an active or expanded state, using the state variable as a dependency in the `useEffect` hook, and return early when not active to prevent registration of the listener until needed.
