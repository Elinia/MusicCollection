
function getPlaylist() {
    var playlistJson;
    if (location.hostname == 'music.163.com' && location.pathname == '/playlist') {
        playlistJson = {};
        playlistJson['site'] = '网易云音乐';
        playlistJson['link'] = location.href;
        playlistJson['id'] = $(document.getElementById('content-operation')).attr('data-rid');
        playlistJson['name'] = $('h2')[0].innerHTML;
        var listArray = [];
        var songInfo = {};
        var allTr = $('tr');
        for (var j = 0; j < allTr.length; ++j) {
            var theTr = allTr[j];
            var allA = $(theTr).find('a');
            for (var i = 0; i < allA.length; ++i) {
                var theA = allA[i];
                var isSong = false;
                if ((/\/song\?id\=\d+$/).test(theA.href)) {
                    songInfo['songId'] = (theA.href).replace(/^.*\/song\?id=(\d+)$/, '$1');
                    songInfo['songLink'] = theA.href;
                    songInfo['songTitle'] = theA.childNodes[0].title;
                    isSong = true;
                }
                if ((/\/artist\?id\=\d+$/).test(theA.href)) {
                    songInfo['artistLink'] = theA.href;
                    songInfo['artistName'] = theA.innerHTML;
                    isSong = true;
                }
                if ((/\/album\?id\=\d+$/).test(theA.href)) {
                    songInfo['albumLink'] = theA.href;
                    songInfo['albumName'] = theA.innerHTML;
                    isSong = true;
                }
            }
            if (isSong) {
                listArray.push({
                    'songId': songInfo['songId'],
                    'songLink': songInfo['songLink'],
                    'songTitle': songInfo['songTitle'],
                    'artistLink': songInfo['artistLink'],
                    'artistName': songInfo['artistName'],
                    'albumLink': songInfo['albumLink'],
                    'albumName': songInfo['albumName']
                });
            }
        }
        playlistJson['playlist'] = listArray;
    }
    if (location.hostname == 'music.163.com' && (location.pathname == '/user/home' || location.pathname == '/user/songs/rank')) {
        playlistJson = {};
        playlistJson['site'] = '网易云音乐';
        playlistJson['link'] = location.href;
        playlistJson['type'] = location.pathname;
        playlistJson['id'] = $('#m-record').attr('data-uid');
        var listArray = [];
        var songInfo = {};
        var allLi = $('li');
        //console.log(allLi);
        for (var j = 0; j < allLi.length; ++j) {
            var theLi = allLi[j];
            //console.log(theLi);
            if (!theLi.id) {
                continue;
            }
            var txtSpan = $(theLi).find('.txt')[0];
            //console.log(txtSpan);
            if (!txtSpan) {
                continue;
            }
            songInfo['songId'] = (txtSpan.firstChild.href).replace(/^.*\/song\?id=(\d+)$/, '$1');
            songInfo['songLink'] = txtSpan.firstChild.href;
            songInfo['songTitle'] = txtSpan.firstChild.firstChild.title;
            songInfo['artistLink'] = txtSpan.lastChild.lastChild.firstChild.href;
            songInfo['artistName'] = txtSpan.lastChild.lastChild.title;
            //console.log(songInfo);
            listArray.push({
                'songId': songInfo['songId'],
                'songLink': songInfo['songLink'],
                'songTitle': songInfo['songTitle'],
                'artistLink': songInfo['artistLink'],
                'artistName': songInfo['artistName']
            });
        }
        playlistJson['playlist'] = listArray;
    }
    if (location.hostname == 'www.xiami.com' && (/\/collect\//).test(location.pathname)) {
        playlistJson = {};
        playlistJson['site'] = '虾米音乐';
        playlistJson['link'] = location.href;
        playlistJson['type'] = '精选集';
        playlistJson['id'] = (location.pathname).replace(/\/collect\/(\d+)$/, '$1');
        if ($('#cover_logo')[0]) {
            playlistJson['name'] = $('#cover_logo img')[0].alt;
        } else {
            playlistJson['name'] = $('.bigImgCover img')[0].alt;
        }
        var listArray = [];
        var songInfo = {};
        var allLi = $('li');
        //console.log(allLi);
        for (var j = 0; j < allLi.length; ++j) {
            var theLi = allLi[j];
            if (theLi.className != 'totle_up') {
                continue;
            }
            var allA = $(theLi).find('a');
            songInfo['songId'] = ($(theLi).find('input'))[0].value;
            songInfo['songLink'] = allA[0].href;
            if (allA[0].title && (allA[0].title !== '无题')) {
                songInfo['songTitle'] = allA[0].title;
            } else {
                songInfo['songTitle'] = allA[0].innerHTML;
            }
            songInfo['artistLink'] = allA[1].href;
            songInfo['artistTitle'] = allA[1].title;
            songInfo['artistName'] = allA[1].innerHTML;
            listArray.push({
                'songId': songInfo['songId'],
                'songLink': songInfo['songLink'],
                'songTitle': songInfo['songTitle'],
                'artistLink': songInfo['artistLink'],
                'artistTitle': songInfo['artistTitle'],
                'artistName': songInfo['artistName']
            });
        }
        playlistJson['playlist'] = listArray;
        $('#loader a').click(function() {
            setTimeout(actions, 200);
        });
    }
    if (location.hostname == 'www.xiami.com' && (/\/space\/lib-song/).test(location.pathname)) {
        playlistJson = {};
        playlistJson['site'] = '虾米音乐';
        playlistJson['link'] = location.href;
        playlistJson['type'] = '收藏';
        //playlistJson['id'] = (location.pathname).replace(/\/space\/lib-song\/u\/(\d+)$/, '$1');
        playlistJson['name'] = $('title').html();
        var listArray = [];
        var songInfo = {};
        var allTr = $('tr');
        for (var j = 0; j < allTr.length; ++j) {
            var theTr = allTr[j];
            if (!/lib_song_\d+/.test(theTr.id)) {
                continue;
            }
            songInfo['songId'] = (theTr.id).replace(/lib_song_(\d+)/, '$1');
            songInfo['songLink'] = $(theTr).find('.song_name a')[0].href;
            songInfo['songTitle'] = $(theTr).find('.song_name a')[0].title;
            songInfo['artistLink'] = $(theTr).find('.song_name a')[1].href;
            songInfo['artistTitle'] = $(theTr).find('.song_name a')[1].title;
            songInfo['artistName'] = $(theTr).find('.song_name a')[1].innerHTML;
            listArray.push({
                'songId': songInfo['songId'],
                'songLink': songInfo['songLink'],
                'songTitle': songInfo['songTitle'],
                'artistLink': songInfo['artistLink'],
                'artistTitle': songInfo['artistTitle'],
                'artistName': songInfo['artistName']
            });
        }
        playlistJson['playlist'] = listArray;
    }
    if (location.hostname == 'www.kugou.com') {
        playlistJson = {};
        playlistJson['site'] = '酷狗音乐';
        playlistJson['link'] = location.href;
        playlistJson['type'] = $('.mbx a')[1].title;
        playlistJson['id'] = (location.pathname).replace(/\/yy\/\w+\/single\/(\d+)\.html/, '$1');
        playlistJson['name'] = $('.mbx span')[0].innerHTML;
        var listArray = [];
        var songInfo = {};
        var allA = $('a');
        for (var j = 0; j < allA.length; ++j) {
            var theA = allA[j];
            if (!(/^play/).test($(theA).attr('onclick'))) {
                continue;
            }llA = $(theLi).find('a');
            songInfo['songId'] = ($(theA).attr('onclick')).replace(/^play\((\d+)\);sdnClick\(\d+\)$/, '$1');
            songInfo['songTitle'] = (theA.title).replace(/^(\S+) - (.*)/, '$2');
            songInfo['artistName'] = (theA.title).replace(/^(\S+) - (.*)/, '$1');
            listArray.push({
                'songId': songInfo['songId'],
                'songTitle': songInfo['songTitle'],
                'artistName': songInfo['artistName']
            });
        }
        playlistJson['playlist'] = listArray;
    }
    if (location.hostname == 'music.douban.com') {
        playlistJson = {};
        playlistJson['site'] = '豆瓣音乐';
        playlistJson['link'] = location.href;
        playlistJson['id'] = $('#songlist-id')[0].value;
        playlistJson['name'] = $('#songlist-title')[0].innerHTML;
        var listArray = [];
        var songInfo = {};
        var allLi = $('#songlist')[0].childNodes;
        for (var j = 0; j < allLi.length; ++j) {
            var theLi = allLi[j];
            if (!theLi.className) {
                continue;
            }
            songInfo['songId'] = theLi.id;
            songInfo['songTitle'] = $(theLi).children('.song-item').attr('data-title');
            songInfo['artistLink'] = $('.musician-search')[0].href;
            songInfo['artistName'] = $('.musician-search')[0].innerHTML;
            listArray.push({
                'songId': songInfo['songId'],
                'songTitle': songInfo['songTitle'],
                'artistLink': songInfo['artistLink'],
                'artistName': songInfo['artistName']
            });
        }
        playlistJson['playlist'] = listArray;
    }
    return playlistJson;
}

function sendJsonToBG(json) {
    if (json) {
        chrome.runtime.sendMessage(chrome.runtime.id, json);
    }
}

function actions() {
    var playlistJson = getPlaylist();
    console.log(playlistJson);
    //console.log(JSON.stringify(playlistJson));
    sendJsonToBG(playlistJson);
}

(function() {
    //console.log(location);
    actions();
})();