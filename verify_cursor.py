import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={'width': 1280, 'height': 800},
            record_video_dir="/home/jules/verification/videos"
        )
        page = await context.new_page()

        # Intercept and bypass the preloader so we can interact immediately
        await page.add_init_script("""
            window.localStorage.setItem('1618_bypass_preloader', 'true');
        """)

        await page.goto('http://localhost:5174')

        # Wait a bit for the app to load
        await page.wait_for_timeout(2000)

        # Move mouse to trigger cursor updates
        await page.mouse.move(500, 500)
        await page.wait_for_timeout(500)
        await page.mouse.move(600, 600)
        await page.wait_for_timeout(500)

        # Hover over the "Alle Akzeptieren" cookie button to trigger hover state
        button = page.locator('button:has-text("Alle Akzeptieren")').first
        if await button.is_visible():
            box = await button.bounding_box()
            if box:
                await page.mouse.move(box['x'] + box['width']/2, box['y'] + box['height']/2)
                await page.wait_for_timeout(1000)

        await page.screenshot(path='/home/jules/verification/screenshots/verification2.png')

        # Close the context to finish the video recording
        await context.close()
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
