from playwright.sync_api import sync_playwright
import time

def login_only():
    with sync_playwright() as p:
        print("[Python] Launching Chromium browser...")
        browser = p.chromium.launch(headless=False)  # Launch in non-headless mode
        page = browser.new_page()

        print("[Python] Navigating to Simplicity login page...")
        page.goto('https://ppe-mall-management.lotuss.com/Simplicity-uat/apptop.aspx')
        time.sleep(3)  # Give time for page to load

        print("[Python] Filling in login credentials...")
        page.fill('#login_UserName', 'TH40184213')
        page.fill('#login_Password', 'P@ssword12345')

        print("[Python] Clicking login...")
        page.click('#login_Login')
        time.sleep(10)  # Wait for post-login page to load

        print("[Python] Login complete. You are now logged in.")
        page.wait_for_timeout(15000)  # Keep the window open for observation

        browser.close()

if __name__ == '__main__':
    login_only()