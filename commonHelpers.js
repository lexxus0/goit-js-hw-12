import{a as v,S as w,i as g}from"./assets/vendor-ee72e1a4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();const x="44377249-dc3d438c16ab3b76144728d61";async function f(e,t,r){const a="https://pixabay.com/api/",s=new URLSearchParams({key:x,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:r,page:t});return(await v.get(a,{params:s})).data}const S=new w(".results a",{captionsData:"title",captionDelay:0});function y(e,t){const r=t.map(a=>`
    <a href="${a.largeImageURL}" class='img-link' data-lightbox="gallery">
      <div class="img-card">
        <img src="${a.webformatURL}" width='358' height='152' alt="${a.tags}" title="${a.tags}">
        <div class="card-info">
          <p>Likes <span class='span-data'>${a.likes}</span></p>
          <p>Views <span class='span-data'>${a.views}</span></p>
          <p>Comments <span class='span-data'>${a.comments}</span></p>
          <p>Downloads <span class='span-data'>${a.downloads}</span></p>
        </div>
      </div>
    </a>`).join("");e.insertAdjacentHTML("beforeend",r),S.refresh()}const p=document.getElementById("photos_input"),L=document.getElementById("submit_button"),m=document.querySelector(".results"),o=document.querySelector(".loading-img"),n=document.getElementById("load-btn");let d=1,h="";const b=15;let u=0,c=0;o.classList.add("hidden");L.addEventListener("click",async()=>{const e=p.value.trim();if(!e){g.warning({title:"Warning",message:"Please fill the search field first.",position:"topRight"});return}h=e,d=1,c=0,m.innerHTML="",o.classList.remove("hidden"),n.classList.add("hidden");try{const t=await f(h,d,b);if(o.classList.add("hidden"),!t.hits||t.hits.length===0){g.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",maxWidth:"400px",color:"#b90e0a",messageColor:"#fff",messageLineHeight:"150%",messageSize:"16px"}),p.value="";return}u=t.totalHits,c=t.hits.length,y(m,t.hits),c<u&&n.classList.remove("hidden")}catch(t){o.classList.add("hidden"),console.log(t)}});n.addEventListener("click",async()=>{d++,n.classList.add("hidden"),o.classList.remove("hidden");try{const e=await f(h,d,b);o.classList.add("hidden"),e.hits&&e.hits.length>0&&(c+=e.hits.length,y(m,e.hits),c>=u?(n.classList.add("hidden"),g.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",maxWidth:"400px",color:"#b90e0a",messageColor:"#fff",messageLineHeight:"150%",messageSize:"16px",backgroundColor:"aqua"})):n.classList.remove("hidden"),P())}catch(e){o.classList.add("hidden"),n.classList.add("hidden"),console.log(e)}});p.addEventListener("keypress",e=>{e.key==="Enter"&&L.click()});function P(){const e=document.querySelector(".img-card");if(e){const t=e.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
