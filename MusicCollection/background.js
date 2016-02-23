
var TabData = [];

function setListeners() {
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) { /* 接收来自网站页面的消息并处理 */
        //console.log(msg);
        TabData[sender.tab.id] = msg;
    });
}

function saveData(data) {
    var myData = JSON.stringify(data);
    window.localStorage.setItem('MusicCollection', myData);
}

function loadData() {
    var myData = window.localStorage.getItem('MusicCollection');
    myData = JSON.parse(myData);
    if (!myData) {
        myData = {'idUsed': 0, 'list': []};
    }
    return myData;
}

function getLocalPlaylist() {
    var collection = loadData();
    console.log(collection['list']);
    return collection['list'];
}

function addPlaylist(newPlaylist) {
    var collection = loadData();
    newPlaylist['id'] = collection['idUsed']++;
    collection['list'].push(newPlaylist);
    saveData(collection);
}

function removePlaylist(playlistId) {
    var collection = loadData();
    for (var i = 0; i < collection['list'].length; ++i) {
        if (playlistId == collection['list'][i]['id']) {
            delete collection['list'][i];
        }
    }
    collection['list'].push(newPlaylist);
    saveData(collection);
}

function getPlaylist(callback) {
    chrome.tabs.getSelected(function(tab) {
        callback(TabData[tab.id]);
    });
}

function Page() {
    var _page, _pageTabId;
    this.setPage = function(thePage, theTabId) {
        _page = thePage;
        _pageTabId = theTabId;
    };
    this.resetPage = function() {
        _page = null;
        _pageTabId = null;
    };
    this.openPage = function() {
        if (_page) {
            chrome.tabs.update(_pageTabId, {active: true});
        } else {
            window.open('manage/manage.html');
        }
    };
}
var Manage = new Page();

(function() {
    setListeners();
})();