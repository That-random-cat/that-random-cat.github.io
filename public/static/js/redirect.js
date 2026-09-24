async function getConfig() {
	const _res=await fetch("/.config/redirects", {cache:"no-cache",method:"GET",credentials:"omit"});
	if (!_res.ok) {throw new Error("Network Error:", _res.statusText);}
	const _ret=atob(await _res.text());
	return _ret;
}

async function main() {
	if (location.pathname.startsWith("/!")) {
		try {
			const _slg=location.pathname.replace("/!","");
			const _conf=await getConfig();
			const conf=JSON.parse(atob(_conf));
			conf.forEach((e)=>{
				if (e.slg=_slg) {
					let uri="";
					switch (e.cat) {
						case 0:
							throw new Error("This link has been disabled !");
						
						case 1:
							throw new Error("This link is restricted !");

						case 2: 
							const _lnk=JSON.parse(atob(e.lnk));
							uri=new URL(`${_lnk.pr}://${_lnk.ho}/${_lnk.pa}`);
							break;

						default:
							uri="/422";
							break;
					}
					const el_meta=document.createElement("meta");
					el_meta.setAttribute("http-equiv", "refresh");
					el_meta.setAttribute("content", `1; url=${uri}`);
					document.querySelector("head").appendChild(el_meta);
				}
			});
		} catch (e) {
			document.querySelector("#content.hide").classList.remove("hide");
			document.querySelector(".error_info#ei").textContent=e;
			console.error(e);
		}
	}
}

main();
