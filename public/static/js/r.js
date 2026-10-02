// https://that-random-cat.github.io/!#+e8586490

const LINK_TYPES={
    UNDEFINED:0,
    NORMAL:1,
    PRIVATE:2,
    CUSTOM:3
};

function main() {
    return new Promise(async (resolve, reject) => {
        const hash=location.hash.slice(1);
        let link_type=LINK_TYPES.UNDEFINED;
        if(hash.startsWith("+")){link_type=LINK_TYPES.NORMAL;}else if(hash.startsWith("~")){link_type=LINK_TYPES.PRIVATE;}else if(hash.startsWith("-")){link_type=LINK_TYPES.CUSTOM;}
        if(link_type===LINK_TYPES.UNDEFINED){reject("[422] Undefined link type");}
        if(link_type===LINK_TYPES.PRIVATE){reject("[401] Unauthorized");}
        const slug=hash.slice(1);

        const _data=await fetch("https://trc-static-conf.vercel.app/services/6a08aa87/data.json", {cache:"no-cache",credentials:"omit",method:"GET",referrerPolicy:"no-referrer"});
        if(!_data.ok){reject(_data.statusText);}
        const data = await _data.json();
        console.table(data);

        if(data?.[slug]){resolve(data[slug]);}else{reject("[404] Link not found")}
    });
}

main().then((url)=>{
    const el_meta=document.createElement("meta");
    el_meta.setAttribute("http-equiv", "refresh");
    el_meta.setAttribute("content", `1; url=${url}`);
    document.querySelector("head").appendChild(el_meta);
}).catch((reason)=>{
    document.querySelector("p#error").innerText="Error: "+reason;
});
