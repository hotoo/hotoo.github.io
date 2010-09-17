(function(){
    var url=location.href;
    if(!(/\/index\.html$/.test(url)) &&
        !(/\/archive-\d{4}\.html$/.test(url))){return;}
    var cont=document.getElementById("container");
    var a=cont.getElementsByTagName("a");
    for(var i=a.length-1; i>=0; i--){
        if(a[i].parentNode.tagName.toLowerCase()!="li"){continue;}
        var cmt=document.createElement("a");
        cmt.className="comment-count";
        cmt.href=a[i].href+"#disqus_thread";
        cmt.appendChild(document.createTextNode("评论"));
        var span=document.createElement("span");
        span.className="comment-count";
        span.appendChild(document.createTextNode("("));
        span.appendChild(cmt);
        span.appendChild(document.createTextNode(")"));
        a[i].parentNode.appendChild(span);
    }
})();
