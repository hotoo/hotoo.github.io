String.prototype.startsWith = function(prefix){
    return !this.indexOf(prefix);
};
(function(){
    window.onload = function(){
        return;
        var as = document.getElementsByTagName("a");
        for(var i=0,l=as.length; i<l; i++){
            var a=as[i], href=a.getAttribute("href") || a.href;
            if(href.startsWith("http://") ||
              href.startsWith("https://")){
                a.className="external";
            }
        }
    };
})();
