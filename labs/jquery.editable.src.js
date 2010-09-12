/**
 * @author 闲耘™ (hotoo.cn[AT]gmail.com)
 * @version 1.0, 2010/08/03
 */
(function($){
    $.fn.editable = function(options){
        var defaults = {
            newbar          : null,
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
        if(settings.newbar){
            settings.newbar.click(function(){
                _this.find("tbody").append('');
            });
        }
        $(settings.editbar, this).live("click", function(){
            var line = $(this).parent().parent(),
                columns = line.find(">td");
            for(var i=0,col,$col,val,l=columns.length; i<l; i++){
                if(!settings.columns[i] || !settings.columns[i].type){continue;}
                col=columns[i], $col=$(col);
                val = $col.text();
                switch(settings.columns[i].type){
                case "readonly":
                    break;
                case "number":
                case "int":
                case "float":
                    val = parseInt(val);
                    columns[i].innerHTML = '<input type="number" style="width:'+($col.innerWidth()-5)+'px;" size="'+size(settings.columns[i].max)+'" value="'+val+'" />';
                    break;
                case "text":
                    columns[i].innerHTML = '<input type="text" style="width:'+($col.innerWidth()-5)+'px;" size="'+settings.columns[i].max+'" value="'+val+'" />';
                    break;
                default:
                    break;
                }
            }
            // FIXME: get the button.
            var p=$(_this), idx=line[0].rowIndex-1;
            $(settings.editbar, p).eq(idx).hide();
            $(settings.removebar, p).eq(idx).hide();
            $(settings.savebar, p).eq(idx).show();
            $(settings.cancelbar, p).eq(idx).show();
        });
        $(settings.removebar, this).click(function(){
            $(this).parent().parent().remove();
        });
        $(settings.savebar, this).click(function(){
            settings.save.call(this);
        });
        $(settings.cancelbar, this).click(function(){
            var line = $(this).parent().parent();
                columns = line.find(">td");
            // TODO:
            for(var i=0,col,$col,val,l=columns.length; i<l; i++){
                if(!settings.columns[i] || !settings.columns[i].type){continue;}
                col=columns[i], $col=$(col);
                val = $col.text();
                switch(settings.columns[i].type){
                case "readonly":
                    break;
                case "number":
                case "int":
                case "float":
                    val = parseInt(val);
                    //columns[i].innerHTML = '<input type="number" style="width:'+($col.innerWidth()-5)+'px;" size="'+size(settings.columns[i].max)+'" value="'+val+'" />';
                    columns[i].innerHTML = '<div></div>';
                    break;
                case "text":
                    columns[i].innerHTML = '<input type="text" style="width:'+($col.innerWidth()-5)+'px;" size="'+settings.columns[i].max+'" value="'+val+'" />';
                    break;
                default:
                    break;
                }
            }
            // FIXME: get the button.
            //var p = $(_this).parent();
            var p=$(_this), idx=line[0].rowIndex-1;
            $(settings.savebar, p).eq(idx).hide();
            $(settings.cancelbar, p).eq(idx).hide();
            $(settings.editbar, p).eq(idx).show();
            $(settings.removebar, p).eq(idx).show();
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
