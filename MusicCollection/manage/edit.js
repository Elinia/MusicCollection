
EditFuncs.SC = (function() {
    var url = document.getElementById('url'),
        host = document.getElementById('host'),
        name = document.getElementById('name'),
        username = document.getElementById('username'),
        password = document.getElementById('password'),
        showpassIcon = document.getElementById('showpassIcon'),
        saveBtn = document.getElementById('save'),
        cancelBtn = document.getElementById('cancel');
    var addUserFunc = function(userdata) { /* 添加新用户 */
        //console.log("addUserFunc!");
        return BackgroundPage.MyRequest.SC.postAddUserdata(userdata, "edit");
    };
    var editUserFunc = function(userdata) { /* 修改现有用户信息 */
        //console.log("editUserFunc!");
        return BackgroundPage.MyRequest.SC.postEditUserdata(userdata, "edit");
    };

    return {
        elementActivation: function() { /* 按钮、图标、输入框事件绑定 */
            url.onkeypress = function() {
                if (event.keyCode === 13) {
                    saveBtn.click();
                }
            };
            host.onkeypress = function() {
                if (event.keyCode === 13) {
                    saveBtn.click();
                }
            };
            name.onkeypress = function() {
                if (event.keyCode === 13) {
                    saveBtn.click();
                }
            };
            username.onkeypress = function() {
                if (event.keyCode === 13) {
                    saveBtn.click();
                }
            };
            password.onkeypress = function() {
                if (event.keyCode === 13) {
                    saveBtn.click();
                }
            };
            showpassIcon.onmouseover = function() {
                $(showpassIcon).fadeTo(0, 1);
            };
            showpassIcon.onmouseout = function() {
                $(showpassIcon).fadeTo(0, 0.5);
            };
            showpassIcon.onmousedown = function() {
                password.type = "text";
            };
            showpassIcon.onmouseup = function() {
                password.type = "password";
            };
            showpassIcon.onmouseleave = function() {
                password.type = "password";
            };

            cancelBtn.onclick = function() {
                EditDialogIns.hide();
            };

            //update();
        },
        update: function() { /* 编辑对话框内容更新 */
            var editMode = BackgroundPage.Edit.SC.getMode();
            var editUserdata = BackgroundPage.Edit.SC.getUserdata();
            switch (editMode) {
            case "edit": /* 用户编辑模式 */
                $(saveBtn).html(chrome.i18n.getMessage("edit"));
                url.value = editUserdata.url;
                host.value = editUserdata.host;
                host.setAttribute("disabled", "disabled");
                username.value = editUserdata.username;
                password.value = editUserdata.password;
                saveBtn.onclick = function() {
                    editUserFunc({
                        "uid": editUserdata.uid, 
                        "host": host.value, 
                        "username": username.value, 
                        "password": password.value, 
                        "url": url.value
                    });
                    EditDialogIns.hide();
                };
                break;
            case "add": /* 网站添加新用户模式 */
                url.value = editUserdata.url;
                host.value = editUserdata.host;
                host.removeAttribute("disabled");
                username.value = "";
                password.value = "";
                $(saveBtn).html(chrome.i18n.getMessage("add"));
                saveBtn.onclick = function() {
                    addUserFunc({
                        "host": host.value, 
                        "username": username.value, 
                        "password": password.value, 
                        "url": url.value
                    });
                    EditDialogIns.hide();
                };
                break;
            case "blank": /* 添加全新用户模式 */
                url.value = "";
                host.value = "";
                host.removeAttribute("disabled");
                username.value = "";
                password.value = "";
                $(saveBtn).html(chrome.i18n.getMessage("add"));
                saveBtn.onclick = function() {
                    if (addUserFunc({
                        "host": host.value,
                        "username": username.value, 
                        "password": password.value, 
                        "url": url.value
                    })) {
                        EditDialogIns.hide();
                    }
                };
                break;
            default:
                break;
            }
        }
    };
})();

(function(){
    EditFuncs.SC.elementActivation();
})();

$('#urlText span').html(chrome.i18n.getMessage("url_span"));
$('#hostText span').html(chrome.i18n.getMessage("host_span"));
$('#nameText span').html(chrome.i18n.getMessage("name_span"));
$('#usernameText span').html(chrome.i18n.getMessage("username_span"));
$('#passwordText span').html(chrome.i18n.getMessage("password_span"));
$('#url').attr('placeholder', chrome.i18n.getMessage("url_placeholder"));
$('#host').attr('placeholder', chrome.i18n.getMessage("host_placeholder"));
$('#name').attr('value', chrome.i18n.getMessage("name_value"));
//$('#save').attr('value', chrome.i18n.getMessage("save_value"));
$('#cancel').html(chrome.i18n.getMessage("cancel_value"));