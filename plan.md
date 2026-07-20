1. **Refactor `CustomCursor.tsx` to use `useMotionValue` and `useSpring`**
   - Read `src/components/CustomCursor.tsx` again to ensure I understand all imports.
   - Replace the `useState` for `mousePosition` with `useMotionValue` for `cursorX` and `cursorY`.
   - Wrap the motion values with `useSpring` for smooth interpolation.
   - Update the `mousemove` event listener to call `.set()` on the motion values directly.
   - Introduce a nested `<motion.div>` structure:
     - The outer `div` handles continuous position updates (`x` and `y` mapped to the spring values via `style`).
     - The inner `div` manages discrete hover animations (`width`, `height`, offsets, and `backgroundColor` via the `animate` prop).

2. **Verify changes in `CustomCursor.tsx`**
   - Confirm the file contents are correct.
   - Run `npm run build` to verify there are no TypeScript compilation errors.
   - Use `frontend_verification_instructions` to test the custom cursor behavior in Playwright, ensuring it correctly follows the mouse and expands on hover, matching the original functionality.

3. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done**
   - Update `.jules/bolt.md` to document the critical learning about React state causing layout thrashing on high-frequency events (`mousemove`), and the solution using Framer Motion's nested structure and motion values.
   - Run `pnpm lint` and `pnpm test` (or their npm equivalents).
   - Get pre-commit instructions.

4. **Submit PR**
   - Submit the PR with the title '⚡ Bolt: Prevent unnecessary re-renders in custom cursor'.
   - The description will follow the requested format with What, Why, Impact, and Measurement.
