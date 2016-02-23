
var BackgroundPage = chrome.extension.getBackgroundPage();
//var Settings = BackgroundPage.Settings.SC.getSettings();
var EditDialogIns, SettingsDialogIns;
var ManageFuncs = {},
    EditFuncs = {},
    SettingsFuncs = {};

/*function EditDialog() {
    var _self = this;
    var _interval = null;
    var _showSelfI = function() {
        _self.show();
        EditFuncs.SC.update();
        clearInterval(_interval);
        _interval = null;
    };

    this.showSelf = function() {
        if (_interval) {
            clearInterval(_interval);
        }
        _interval = setInterval(_showSelfI, 100);
    };
}
EditDialog.prototype = new Dialog('edit.html', {
    title: chrome.i18n.getMessage("edit_page"),
    opacity: Settings.dialogOpacity,
    overlayOpacity: Settings.dialogOverlayOpacity,
    modal: Settings.dialogOverlay
});
EditDialog.prototype.constructor = EditDialog;
function SettingsDialog() {
    var _self = this;

    this.showSelf = function() {
        SettingsFuncs.SC.elementActivation();
        _self.show();
    };
}
SettingsDialog.prototype = new Dialog('settings.html', {
    title: chrome.i18n.getMessage("settings_page"),
    opacity: Settings.dialogOpacity,
    overlayOpacity: Settings.dialogOverlayOpacity,
    modal: Settings.dialogOverlay
});
SettingsDialog.prototype.constructor = SettingsDialog;*/

$(document).ready(function() {
    chrome.tabs.getCurrent(function(tab) { /* 告知后台页面自身的存在 */
        BackgroundPage.Manage.setPage(self, tab.id);
    });
});

$(window).unload(function() { /* 告知后台页面自身的消失 */
    BackgroundPage.Manage.resetPage();
});

(function(){
    //EditDialogIns = new EditDialog();
    //SettingsDialogIns = new SettingsDialog();
})();

$('#manageHeader').html(chrome.i18n.getMessage("manage_page"));
$('#addUserSpan').html(chrome.i18n.getMessage("add_user"));
$('#setExcSpan').html(chrome.i18n.getMessage("set_exc"));
$('#adjustSettingsSpan').html(chrome.i18n.getMessage("adjust_settings"));
$('#usernameLabel').html(chrome.i18n.getMessage("username_label"));
$('#urlLabel').html(chrome.i18n.getMessage("url_label"));
$('#settingsLabel').html(chrome.i18n.getMessage("settings_label"));
$('#searchInput').attr("placeholder", chrome.i18n.getMessage("search_keyword"));