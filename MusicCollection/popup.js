
var BackgroundPage = chrome.extension.getBackgroundPage();

$('#managePlaylistButton').click(function() {
	//BackgroundPage.Manage.openPage();
});

(function() {
	BackgroundPage.getPlaylist(function(playlistJson) {
		console.log(playlistJson);
		$('#savePlaylistButton').click(function() {
			BackgroundPage.addPlaylist(playlistJson);
			BackgroundPage.getLocalPlaylist();
		});
		$('#siteName').html(playlistJson['site']);
		$('#playlistType').html(playlistJson['type']);
		$('#playlistName').html(playlistJson['name']);
		for (var i = 0; i < playlistJson['playlist'].length; ++i) {
			$song = $('<li></li>');
			$('#playlist').append($song);
			$artistName = $('<span class=\'artistName\'></span>');
			$split = $('<span class=\'split\'> - </span>');
			$songTitle = $('<span class=\'songTitle\'></span>');
			$song.append($artistName);
			$song.append($split);
			$song.append($songTitle);
			$artistName.html(playlistJson['playlist'][i]['artistName']);
			$artistName.attr('title', playlistJson['playlist'][i]['artistName']);
			$songTitle.html(playlistJson['playlist'][i]['songTitle']);
			$songTitle.attr('title', playlistJson['playlist'][i]['songTitle']);
		}
	});
})();