const run = async () => {
    const currentTab = browser.tabs.query({currentWindow: true, active: true});
    const remoteTabs = await browser.tabs.query({
        currentWindow: false
    });
    const windowId = (await currentTab)[0].windowId;
    await browser.tabs.move(remoteTabs.map(t => t.id), { windowId, index: 0 });
    const tabs = await browser.tabs.query({
        currentWindow: true
    });
    tabs.sort((a, b) => a.url > b.url);
    await browser.tabs.move(tabs.map(t => t.id), { index: 0 });
};

const handleBrowserActionClick = () => {
    run();
};

browser.browserAction.onClicked.addListener(handleBrowserActionClick);
