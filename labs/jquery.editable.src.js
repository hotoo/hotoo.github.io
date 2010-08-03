/**
 * @author 闲耘™ (hotoo.cn[AT]gmail.com)
 * @version 1.0, 2010/08/03
 */
(function($){
    $.fn.editable = function(options){
        var defaults = {
            operateColumn   : "tr>td:last-child",
            editbar         : "tr>td:last-child>a.edit",
            removebar       : "tr>td:last-child>a.remove",
            savebar         : "tr>td:last-child>a.save",
            cancelbar       : "tr>td:last-child>a.cancel",
            columns         : [],
            action          : "",
            data            : {},
            method          : "post"
        };
        var settings = $.extend(settings, defaults, options);
        var _this = this;
        $(settings.editbar, this).live("click", function(){
            var line = $(this).parent().parent(),
                columns = line.find(">td");
            for(var i=0,val,l=columns.length; i<l; i++){
                if(!settings.columns[i].type){continue;}
                val = columns[i].innerHTML;
                switch(settings.columns[i].type){
                case "readonly":
                    break;
                case "number":
                case "int":
                case "float":
                    val = parseInt(val);
                    columns[i].innerHTML = '<input type="number" size="'+size(settings.columns[i].max)+'" value="'+val+'" />';
                    break;
                case "text":
                    columns[i].innerHTML = '<input type="text" size="'+settings.columns[i].max+'" value="'+val+'" />';
                    break;
                default:
                    break;
                }
            }
            // FIXME: get the button.
            var p=$(_this);
            $(settings.editbar, p).hide();
            $(settings.removebar, p).hide();
            $(settings.savebar, p).show();
            $(settings.cancelbar, p).show();
        });
        $(settings.removebar, this).click(function(){
            $(this).parent().parent().remove();
        });
        $(settings.savebar, this).click(function(){
            settings.save.call(this);
        });
        $(settings.cancelbar, this).click(function(){
            // FIXME: get the button.
            var p = $(_this).parent();
            $(settings.savebar, p).hide();
            $(settings.cancelbar, p).hide();
            $(settings.editbar, p).show();
            $(settings.removebar, p).show();
        });

        function size(val){
            return String(val).length;

            if(typeof val =="string" || val instanceof String){
                return val.length;
            }else if(typeof(val)=="number" || val instanceof Number){
                return String(val).length;
            }
        }
    };
})(jQuery);
