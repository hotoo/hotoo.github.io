/**
 * smart sync scroll.
 * @author 闲耘™(hotoo.cn[AT]gmail.com)
 * @version 0.1, 2011/09/04
 */
var SmartSyncScroll = function(){
    this._elems = Array.prototype.slice.apply(arguments);
    this._init();
};
SmartSyncScroll.prototype = {
    _init: function(){
        var ME = this;
        function _sync(){
            var T = this.document.body.scrollTop ||
            this.document.documentElement.scrollTop,
            L = this.document.body.scrollLeft ||
            this.document.documentElement.scrollLeft;
            // hack for IE repain.
            //window.status = Math.random()+":"+T+","+L;
            for(var i=0,l=ME._elems.length; i<l; i++){
                (function(i){
                    //window.status += "I:"+i+ME._elems[i].id;
                    if(this != ME._elems[i].contentWindow){
                        ME.sync(ME._elems[i], T, L);
                    }
                })(i);
            }
            //window.status = window.defaultStatus;
        }
        for(var i=0,l=this._elems.length; i<l; i++){
            ME._elems[i].contentWindow.onscroll = _sync;
            //E.add(ME._elems[i].contentWindow, "scroll", _sync);
        }
    },
    sync: function(elem, t, l){
        try{
            elem.contentWindow.document.body.scrollTop = t;
            elem.contentWindow.document.body.scrollLeft = l;
        }catch(ex){alert(ex.message)}
        try{
            elem.contentWindow.document.documentElement.scrollTop = t;
            elem.contentWindow.document.documentElement.scrollLeft = l;
        }catch(ex){alert(ex.message)}
    }
};
