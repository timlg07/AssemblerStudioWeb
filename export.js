function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var  a = document.createElement("a"),
           url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}


function export_(){
    let type = "text/plain;charset=utf-8",
        text = $storage.speicherZellen.map((o,i)=>o.value+((i%2==0)?" ":"\n")).join(""),
        file = "assembler_export_"+Date.now();
    download(text,file,type);
}
