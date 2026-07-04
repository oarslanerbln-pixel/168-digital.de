import re

with open("src/components/CustomCursor.tsx", "r") as f:
    content = f.read()

# Replace the cursorX/Y sets to just use e.clientX/Y
content = content.replace(
    "cursorX.set(e.clientX - 3);",
    "cursorX.set(e.clientX);"
)
content = content.replace(
    "cursorY.set(e.clientY - 3);",
    "cursorY.set(e.clientY);"
)

# Update the animate block to use width/height and left/top
old_animate = """        // Performance Optimization: Animate `scale` instead of `width`/`height`
        // to prevent costly browser layout thrashing on hover state transitions.
        animate={{
          scale: isHovered ? 32 / 6 : 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
          border: isHovered ? '1px solid rgba(255, 255, 255, 0.4)' : '0px solid rgba(255, 255, 255, 0)'
        }}"""

new_animate = """        animate={{
          width: isHovered ? 32 : 6,
          height: isHovered ? 32 : 6,
          left: isHovered ? -16 : -3,
          top: isHovered ? -16 : -3,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
          border: isHovered ? '1px solid rgba(255, 255, 255, 0.4)' : '0px solid rgba(255, 255, 255, 0)'
        }}"""

content = content.replace(old_animate, new_animate)

# Remove left: 0, top: 0, width: 6, height: 6 from style
old_style = """          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',"""

new_style = """          position: 'fixed',
          borderRadius: '50%',"""

content = content.replace(old_style, new_style)

with open("src/components/CustomCursor.tsx", "w") as f:
    f.write(content)
