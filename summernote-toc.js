/**
 * @author Sachin Gimhan
 * @license Apache
 * @version V1.0.0
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    $.extend(true, $.summernote.plugins, {
        'toc': function (context) {
            var self = this;
            var ui = $.summernote.ui;

            context.memo('button.toc', function () {
                var button = ui.button({
                    contents: 'ToC',
                    tooltip: 'Generate Table of Contents',
                    click: function () {
                        self.createTableOfContents();
                    }
                });
                return button.render();
            })

            this.createTableOfContents = function () {
                var layoutInfo = context.layoutInfo;
                var $editable = layoutInfo.editable;
                var tocHtml = buildTOC($editable);
                context.invoke('editor.pasteHTML', '<p><b>Table of Contents</b></p>');
                context.invoke('editor.pasteHTML', tocHtml);
            }

            function buildTOC($content) {
                var tocHtml = '<ol class="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; font-family: Georgia, serif; font-size: 17px;">';
                var previousLevel = 1;
                var openTags = 0;
                // finding only h1,h2 tags
                $content.find('h1, h2').each(function () {
                    var tag = $(this).prop("tagName").toLowerCase();
                    var text = $(this).text();
                    var level = parseInt(tag.replace('h', ''), 10);
                    var id = 'toc_' + text.replace(/\s+/g, '_').toLowerCase();
                    $(this).attr('id', id);
                    // ordering the h1 and h2
                    if (level > previousLevel) {
                        tocHtml += '<ul>';
                        openTags++;
                    } else if (level < previousLevel) {
                        tocHtml += '</li>';
                        for (var i = previousLevel - level; i > 0; i--) {
                            tocHtml += '</ul></li>';
                            openTags--;
                        }
                    } else {
                        tocHtml += '</li>';
                    }

                    tocHtml += '<li><a href="#' + id + '">' + text + '</a>';
                    previousLevel = level;
                });

                for (var i = 0; i < openTags; i++) {
                    tocHtml += '</li></ol>';
                }
                tocHtml += '</li></ol>';

                return tocHtml;
            }
        }
    })
}));