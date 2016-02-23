
SettingsFuncs.SC = (function() {
	var autoLoginCheckbox = document.getElementById('autoLoginCheckbox');
	var autoLoginTimeInput = document.getElementById('autoLoginTimeInput');
	var contextMenusCheckbox = document.getElementById('contextMenusCheckbox');
	var dialogOpacityRange = document.getElementById('dialogOpacityRange');
	var dialogOpacitySpan = document.getElementById('dialogOpacitySpan');
	var dialogOverlayOpacityRange = document.getElementById('dialogOverlayOpacityRange');
	var dialogOverlayOpacitySpan = document.getElementById('dialogOverlayOpacitySpan');
	var dialogOverlayCheckbox = document.getElementById('dialogOverlayCheckbox');
	var settingsSaveButton = document.getElementById('settingsSaveButton');
	var settingsCloseButton = document.getElementById('settingsCloseButton');
	var settingsReturnToDefaultButton = document.getElementById('settingsReturnToDefaultButton');
	var percentage = function(number) {
		return (parseInt(number * 100)).toString() + "%";
	};

	return {
		elementActivation: function() { /* 设置元素激活 */
			/* 填充当前设置到相应元素 */
			autoLoginCheckbox.checked = Settings.autoLogin;
			autoLoginTimeInput.value = Settings.autoLoginTime;
			contextMenusCheckbox.checked = Settings.contextMenus;
			dialogOpacityRange.value = 1 - Settings.dialogOpacity;
			dialogOverlayOpacityRange.value = 1 - Settings.dialogOverlayOpacity;
			dialogOverlayCheckbox.checked = Settings.dialogOverlay;
			$(dialogOpacitySpan).html(percentage(dialogOpacityRange.value));
			$(dialogOverlayOpacitySpan).html(percentage(dialogOverlayOpacityRange.value));

		    dialogOpacityRange.oninput = function() {
		    	$(dialogOpacitySpan).html(percentage(this.value));
		    };
		    dialogOverlayOpacityRange.oninput = function() {
		    	$(dialogOverlayOpacitySpan).html(percentage(this.value));
		    };

		    settingsSaveButton.onclick = function() {
				BackgroundPage.Settings.SC.updateSettings({
					autoLogin: autoLoginCheckbox.checked,
					autoLoginTime: autoLoginTimeInput.value,
					contextMenus: contextMenusCheckbox.checked,
					dialogOpacity: 1 - dialogOpacityRange.value,
					dialogOverlayOpacity: 1 - dialogOverlayOpacityRange.value,
					dialogOverlay: dialogOverlayCheckbox.checked
				});
				EditDialogIns.setOptions({
					opacity: 1 - dialogOpacityRange.value,
					overlayOpacity: 1- dialogOverlayOpacityRange.value,
					modal: dialogOverlayCheckbox.checked
				});
				ExcDialogIns.setOptions({
					opacity: 1 - dialogOpacityRange.value,
					overlayOpacity: 1- dialogOverlayOpacityRange.value,
					modal: dialogOverlayCheckbox.checked
				});
				SettingsDialogIns.setOptions({
					opacity: 1 - dialogOpacityRange.value,
					overlayOpacity: 1- dialogOverlayOpacityRange.value,
					modal: dialogOverlayCheckbox.checked
				});
				SettingsDialogIns.hide();
			};
			settingsCloseButton.onclick = function() {
				SettingsDialogIns.hide();
			};
			settingsReturnToDefaultButton.onclick = function() {
				var defaultSettings = BackgroundPage.Settings.SC.getDefaultSettings();
				autoLoginCheckbox.checked = defaultSettings.autoLogin;
				autoLoginTimeInput.value = defaultSettings.autoLoginTime;
				contextMenusCheckbox.checked = defaultSettings.contextMenus;
				dialogOpacityRange.value = 1 - defaultSettings.dialogOpacity;
				dialogOverlayOpacityRange.value = 1 - defaultSettings.dialogOverlayOpacity;
				dialogOverlayCheckbox.checked = defaultSettings.dialogOverlay;
				$(dialogOpacitySpan).html(percentage(dialogOpacityRange.value));
				$(dialogOverlayOpacitySpan).html(percentage(dialogOverlayOpacityRange.value));
			};
		}
	};
})();

(function() {
    SettingsFuncs.SC.elementActivation();
})();

$('#generalFieldTag').html(chrome.i18n.getMessage('general'));
$('#appearanceFieldTag').html(chrome.i18n.getMessage('appearance'));
$('#autoLoginText').html(chrome.i18n.getMessage("auto_login"));
$('#autoLoginText2').html(chrome.i18n.getMessage("second"));
$('#contextMenusText').html(chrome.i18n.getMessage("context_menus"));
$('.opacityText').html(chrome.i18n.getMessage("opacity"));
$('#dialogOpacityText').html(chrome.i18n.getMessage("dialog"));
$('#dialogOverlayOpacityText').html(chrome.i18n.getMessage("dialog_overlay"));
$('#settingsReturnToDefaultButton').html(chrome.i18n.getMessage('returntodefault_value'));
$('#settingsSaveButton').html(chrome.i18n.getMessage('save_value'));
$('#settingsCloseButton').html(chrome.i18n.getMessage('close'));