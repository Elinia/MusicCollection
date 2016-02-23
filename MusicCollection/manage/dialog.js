
function Dialog(content, options) {
    var defaults = { 
        title: 'Title',         // 标题文本，若不想显示title请通过CSS设置其display为none 
        draggable: true,        // 是否移动 
        modal: true,            // 是否是模态对话框 
        center: true,           // 是否居中。 
        fixed: false,           // 是否跟随页面滚动。
        id: false,              // 对话框的id，若为false，则由系统自动产生一个唯一id。
        opacity: 0.9,           // 默认透明度
        overlayOpacity: 0.8     // 遮罩层默认透明度
    };
    var options = $.extend(defaults, options);
    options.id = options.id ? options.id: 'dialog-' + Dialog.__count; // 唯一ID
    var overlayId = options.id + '-overlay'; // 遮罩层ID
    var isShow = false;

    /* 对话框的布局及标题内容。*/
    var dialog = document.createElement('div');
    dialog.id = options.id;
    dialog.className = 'dialog';
    var barHtml = document.createElement('div');
    barHtml.className = 'bar';
    var titleSpan = document.createElement('span');
    titleSpan.className = 'title';
    $(titleSpan).html(options.title);
    $(barHtml).append(titleSpan);
    $(dialog).append(barHtml);
    var contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    $(dialog).append(contentDiv);
    dialog = $(dialog).hide();
    $('body').append(dialog);

    var dialogOverlay;

    /**
     * 重置对话框的位置。
     *
     * 主要是在需要居中的时候，每次加载完内容，都要重新定位
     *
     * @return void
     */
    var resetPos = function() {
        /* 是否需要居中定位，必需在已经知道了dialog元素大小的情况下，才能正确居中，也就是要先设置dialog的内容。 */
        if (options.center) {
            var top = ($(window).height() - $(dialog).height()) / 2;
            var left = ($(window).width() - $(dialog).width()) / 2;
            dialog.animate({
                top: top,
                left: left
            }, "fast");
        }
    }

    /**
     * 初始化位置及一些事件函数。
     *
     * 其中的this表示Dialog对象而不是init函数。
     */
    var init = function() {
        /* 是否需要初始化背景遮罩层 */
        //if (options.modal) {
            dialogOverlay = document.createElement('div');
            dialogOverlay.id = overlayId;
            dialogOverlay.className = 'dialog-overlay';
            $('body').append(dialogOverlay);
            $(dialogOverlay).css({
                'z-index': Dialog.__zindex++,
                'position': 'absolute',
                'opacity': options.overlayOpacity
            }).hide();
        //}

        dialog.css({
            'z-index': Dialog.__zindex++,
            'position': options.fixed ? 'fixed': 'absolute'
        });

        /* 以下代码处理框体是否可以移动 */
        var mouse = {x:0, y:0};
        function moveDialog(event) {
            var e = window.event || event;
            var top = parseInt(dialog.css('top')) + (e.clientY - mouse.y);
            var left = parseInt(dialog.css('left')) + (e.clientX - mouse.x);
            dialog.css({
                top: top,
                left: left
            });
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        dialog.find('.bar').mousedown(function(event) {
            if (!options.draggable) {
                return;
            }

            var e = window.event || event;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            $(document).bind('mousemove', moveDialog);
        });
        $(document).mouseup(function(event) {
            $(document).unbind('mousemove', moveDialog);
        });

        /* 绑定一些相关事件。 */
        dialog.bind('mousedown', function() {
            dialog.css('z-index', Dialog.__zindex++);
        });
    }

    /**
     * 设置对话框的内容。 
     *
     * @param string c url。
     * @return void
     */
    this.setContent = function(c) {
        var div = dialog.find('.content');
        div.html('加载中...');
        $.ajax({
            url: c,
            success: function(html) {
                div.html(html);
                resetPos();
            },
            error: function(xml, textStatus, error) {
                div.html('出错啦')
            }
        });
    }

    /**
     * 显示对话框
     */
    this.show = function() {
        if (undefined != options.beforeShow && !options.beforeShow()) {
            return;
        }

        /* 是否显示背景遮罩层 */
        if (options.modal) {
            $(dialogOverlay).fadeTo('slow', options.overlayOpacity);
        }
        /* 显示前定位 */
        dialog.css({
            'z-index': Dialog.__zindex++,
            'display': 'block',
            'opacity': 0
        });
        resetPos();
        /* 淡入效果 */
        dialog.fadeTo('slow', options.opacity, function() {
            if (undefined != options.afterShow) {
                options.afterShow();
            }
            isShow = true;
            //resetPos();
        });

        //resetPos();
    }

    /**
     * 隐藏对话框。但并不取消窗口内容。
     */
    this.hide = function() {
        if (!isShow) {
            return;
        }

        if (undefined != options.beforeHide && !options.beforeHide()) {
            return;
        }

        dialog.fadeOut('slow', function() {
            if (undefined != options.afterHide) {
                options.afterHide();
            }
        });
        //if (options.modal) {
            $(dialogOverlay).fadeOut('slow');
        //}

        isShow = false;
    }

    /**
     * 关闭对话框 
     *
     * @return void
     */
    this.close = function() {
        if (undefined != options.beforeClose && !options.beforeClose()) {
            return;
        }

        dialog.fadeOut('slow', function() {
            $(this).remove();
            isShow = false;
            if (undefined != options.afterClose) {
                options.afterClose();
            }
        });
        if (options.modal) {
            $(dialogOverlay).fadeOut('slow', function() {
                $(this).remove();
            });
        }
    }

    this.setOptions = function(newOptions) {
        options = $.extend(options, newOptions);
    }

    init.call(this);
    this.setContent(content);
    resetPos();

    Dialog.__count++;
    Dialog.__zindex++;
}
Dialog.__zindex = 500;
Dialog.__count = 1;
Dialog.version = '1.0 beta';

function dialog(content, options) {
    var dlg = new Dialog(content, options);
    dlg.show();
    return dlg;
}