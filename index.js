import{i as k,a as f,S as X}from"./assets/vendor-_MF0lpIG.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();function E(e){e&&k.show({title:"❌",message:`Sorry, there are no ${e}.`,color:"red",position:"topRight",messageColor:"white",titleColor:"white",timeout:5e3})}function g(e){e.message&&k.show({title:"Error",color:"red",position:"topRight",messageColor:"white",titleColor:"white",message:e.message,timeout:5e3})}function R(e){k.show({title:"Error",color:"red",position:"topRight",messageColor:"white",titleColor:"white",message:e,timeout:5e3})}function _(){k.success({message:"Thank you for your feedback! It has been sent successfully.",position:"topRight",messageColor:"white",titleColor:"white",timeout:5e3})}f.defaults.baseURL="https://sound-wave.b.goit.study/api/";let d,D=1;async function N({name:e,page:s,sortName:t,genre:a}={}){d="artists";const n={limit:8,page:s,name:e,sortName:t,genre:a};try{const r=await f.get(d,{params:n}),o=r.data.artists;return D=Math.ceil(r.data.totalArtists/n.limit),o&&Array.isArray(o)&&o.length>0?o:E("artists")}catch(r){g(r)}}async function z(e){try{d=`artists/${e}`;const t=(await f.get(d,{})).data;return t||E("artist")}catch(s){g(s)}}async function Q(){try{d="feedbacks";const e=await f.get(d,{}),s=Math.ceil(e.data.data.length/10),a={limit:10,page:Z(s)},r=(await f.get(d,{params:a})).data.data;return r&&Array.isArray(r)&&r.length>0?r:E("feedbacks")}catch(e){g(e)}}function Z(e){return Math.floor(Math.random()*e)+1}const x=document.querySelector(".global-loader");function C(){x.classList.remove("hidden")}function q(){x.classList.add("hidden")}const V=document.querySelector(".list-artists"),l=document.getElementById("artist-modal-backdrop"),b=document.getElementById("artist-modal"),J=document.getElementById("artist-close-btn"),c=document.getElementById("artist-content");let u=null,m=null;V.addEventListener("click",e=>{const s=e.target.closest(".learn-more-artist");if(!s)return;const t=s.dataset.id;if(!t)return console.error("Artist ID is missing!");Y(t)});async function Y(e){if(!e)return console.error("Artist ID is missing!");if(l.classList.contains("hidden")){l.classList.remove("hidden"),C(),c.classList.add("hidden"),document.body.style.overflow="hidden";try{const s=await z(e);if(!s){E("artist"),L();return}const t=s.tracksList||[],a={};t.forEach(r=>{const o=r.strAlbum||"Unknown Album";a[o]||(a[o]=[]),a[o].push(r)});const n=Object.entries(a).map(([r,o])=>({strAlbum:r,tracks:o}));te(s,n)}catch(s){console.error(s),c.innerHTML="<p>Error loading artist.</p>",g(s)}finally{q(),c.classList.remove("hidden"),K()}W()}}function K(){c&&(c.scrollTop=0),b&&(b.scrollTop=0),l&&(l.scrollTop=0),requestAnimationFrame(()=>{if(c){const e=c.style.scrollBehavior;c.style.scrollBehavior="auto",c.scrollTo(0,0),c.style.scrollBehavior=e}b&&b.scrollTo(0,0),l&&l.scrollTo(0,0)})}function L(){l.classList.add("hidden"),document.body.style.overflow="",ee()}function W(){u||(u=e=>{e.key==="Escape"&&L()},document.addEventListener("keydown",u)),m||(m=e=>{e.target===l&&L()},l.addEventListener("click",m))}function ee(){u&&(document.removeEventListener("keydown",u),u=null),m&&(l.removeEventListener("click",m),m=null)}function te(e,s){const t=e.intFormedYear?e.intDiedYear&&e.intDiedYear!=="null"?`${e.intFormedYear} - ${e.intDiedYear}`:`${e.intFormedYear} - present`:"information missing";c.innerHTML=`
   <div class="artist-header">
  <h2>${e.strArtist}</h2>

  <div class="artist-header-content">
    <!-- Ліва колонка: фото -->
    <div class="artist-header-left">
      <img class="artist-header-photo" src="${e.strArtistThumb||""}" alt="${e.strArtist}">
    </div>

    <!-- Права колонка: інформація -->
    <div class="artist-header-right">
      ${t?`<p><b>Years active:</b> ${t}</p>`:""}
      ${e.strGender?`<p><b>Sex:</b> ${e.strGender}</p>`:""}
      ${e.intMembers?`<p><b>Members:</b> ${e.intMembers}</p>`:""}
      ${e.strCountry?`<p><b>Country:</b> ${e.strCountry}</p>`:""}
      ${e.strLabel?`<p><b>Label:</b> ${e.strLabel}</p>`:""}
      ${e.strBiographyEN?`<p><b>Biography:</b> ${e.strBiographyEN}</p>`:""}
      ${e.genres&&e.genres.length?`<p><b>Genres:</b> ${e.genres.join(", ")}</p>`:""}
    </div>
  </div>
</div>

    <div class="albums">
      <h3>Albums</h3>
      <div class="albums-grid">
      ${s.length?s.map(a=>`
                
        <div class="album">
          <div class="album-title">${a.strAlbum||"—"}</div>
          ${a.tracks&&a.tracks.length?`
            <div class="tracks">
              <div class="track track-header">
                <span>Track</span>
                <span>Time</span>
                <span>Link</span>
              </div>
              ${a.tracks.map(n=>`
                <div class="track">
                  <span>${n.strTrack||"—"}</span>
                  <span>${se(n.intDuration)}</span>
                  <span>
                    ${n.movie?`<a href="${n.movie}" target="_blank" class="yt-link">▶</a>`:"-"}
                  </span>
                </div>
              `).join("")}
            </div>
          `:"<p>No tracks available</p>"}
        </div>
      `).join(""):"<p>No albums available.</p>"}
          </div>
    </div>
  `}function se(e){if(!e)return"-";const s=Math.floor(e/1e3),t=Math.floor(s/60),a=s%60;return`${t}:${a.toString().padStart(2,"0")}`}J.addEventListener("click",L);const re="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAPCAYAAADZCo4zAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABiSURBVHgBhZDLCYBADESDeNcSLMWSLMEO1o60ky1BrCBOQBF3k9kHc5oH+Yi0UNXUEowdGZlgZGRigi9pzYnMTHhZrO8lJkEaOuFc0YhvD6fMv0toWQiHet98yi1cE+UqhBuGMsXjw1amBwAAAABJRU5ErkJggg==",H=document.querySelector(".load-more");function ne(e){const{_id:s,genres:t,strArtist:a,strBiographyEN:n,strArtistThumb:r}=e;let o;return(Array.isArray(t)||t.length!==0)&&(o=t.map(p=>`<li class="genre-artist">${p}</li>`).join(`
`)),`<li class="item-artists">
        <img class="img-artist" src="${r}" alt="${a}" />
        <div class="info-artist">
          <ul class="genres-artist">
            ${o}
          </ul>
          <h3 class="name-artist">${a}</h3>
          <p class="desc-artist">${n}</p>
        </div>
       <button class="learn-more-artist" data-id="${s}">
          Learn More
          <img class="icon-learn-more" src="${re}" width="8" height="14" alt="icon right arrow"></img>
        </button>
      </li>
`}function O(e){return e.map(ne).join(`
`)}function ae(e){const s=document.querySelector(".list-artists"),t=O(e);s.insertAdjacentHTML("afterbegin",t)}function oe(e){const s=document.querySelector(".list-artists"),t=O(e);s.insertAdjacentHTML("beforeEnd",t)}function P(e){e===D?F():ie()}function F(){H.classList.add("is-display-none")}function ie(){H.classList.remove("is-display-none")}const ce=document.querySelector(".header-container");function j(e){let t=document.querySelector(e).getBoundingClientRect(),a=ce.getBoundingClientRect(),n=t.bottom-t.height-a.height;window.scrollBy({top:n,behavior:"smooth"})}async function le(){try{const e=await Q();if(!Array.isArray(e)||e.length===0){console.warn("No feedbacks available.");const t=document.getElementById("reviews-container");t&&(t.innerHTML='<p class="feedback-no-data">No feedbacks available.</p>');return}const s=e.map(t=>({name:t.author||t.name||"Anonymous",text:t.descr||t.text||t.feedback||"",rating:t.rating||5}));de(s)}catch(e){console.error("Error loading feedbacks",e)}}function de(e){const s=document.getElementById("reviews-container");if(!s)return;s.innerHTML="";const t=document.createDocumentFragment();e.forEach(r=>{const o=document.createElement("div");o.className="swiper-slide review-card",o.innerHTML=`
      <div class="rating ${me(r.rating)}">
        ${ue(r.rating)}
      </div>
      <p class="feedback-text">${r.text}</p>
      <h3 class="feedback-author">${r.name}</h3>
    `,t.appendChild(o)}),s.appendChild(t);const a=new X(".swiper",{loop:!1,slidesPerView:1,autoHeight:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,type:"custom",renderCustom:(r,o,p)=>{const w=r.slides.length;let $=2;return r.realIndex===0?$=1:r.realIndex===w-1&&($=3),[1,2,3].map(I=>`<span class="swiper-pagination-bullet${I===$?" swiper-pagination-bullet-active":""}" data-index="${I}"></span>`).join("")}},spaceBetween:5});document.querySelector(".swiper-pagination")?.addEventListener("click",r=>{if(!r.target.classList.contains("swiper-pagination-bullet"))return;const o=Number(r.target.dataset.index),p=a.slides.length-(a.loop?2:0);let w=o===1?0:o===3?p-1:Math.floor((p-1)/2);a.slideToLoop(w)})}function ue(e){const s=Math.floor(e),t=5;let a="";for(let n=1;n<=t;n++)a+=`<div class="star">
      <svg class="${n<=s?"star-filled":"star-empty"}" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
        <path fill="${n<=s?"#764191":"#fff"}" d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
        1.402 8.173L12 18.897l-7.336 3.86 
        1.402-8.173L.132 9.21l8.2-1.192z"></path>
      </svg>
    </div>`;return`<div class="star-container">${a}</div>`}function me(e){return`value-${Math.floor(e)}`}const fe=document.querySelector(".feedback-close-btn"),M=document.querySelector(".backdrop-feedback-modal");document.querySelector(".feedback-is-open");const U=document.querySelector(".feedback-modal-form"),v=document.querySelector(".feedback-modal-input"),y=document.querySelector(".feedback-modal-textarea"),ge=document.querySelector(".feedback-modal-list"),h=document.querySelectorAll(".feedback-modal-rating"),i={name:"",descr:"",rating:0};function pe(){document.body.classList.add("no-scroll"),v.addEventListener("input",e=>{e.target.value.length<2||e.target.value.length>16?v.classList.add("is-error"):v.classList.remove("is-error")}),y.addEventListener("input",e=>{e.target.value.length<10||e.target.value.length>512?y.classList.add("is-error"):y.classList.remove("is-error")}),ge.addEventListener("click",e=>{const s=e.target.closest("button");if(s){i.rating=Number(s.dataset.value);for(let t=0;t<h.length;t++)h[t].children[0].classList.remove("is-click");for(let t=0;t<i.rating;t++)h[t].children[0].classList.add("is-click")}}),U.addEventListener("submit",async e=>{if(e.preventDefault(),i.name=e.target.elements["user-name"].value.trim(),i.descr=e.target.elements["user-message"].value.trim(),i.name.length>=2&&i.name.length<=16&&i.descr.length>=10&&i.descr.length<=512&&i.rating)try{const s=await f.post("https://sound-wave.b.goit.study/api/feedbacks",i);e.target.reset(),i.rating=0,h.forEach(t=>{t.children[0].classList.remove("is-click")}),M.classList.remove("feedback-is-open"),document.body.classList.remove("no-scroll"),_()}catch(s){R(s)}else R("Please fill all fields and select a rating!")}),fe.addEventListener("click",S),M.addEventListener("click",e=>{e.target===e.currentTarget&&S()}),window.addEventListener("keydown",G)}function G(e){e.key==="Escape"&&(S(),window.removeEventListener("keydown",G))}function he(){U.reset(),i.rating=0,h.forEach(e=>{e.children[0].classList.remove("is-click")}),v.classList.remove("is-error"),y.classList.remove("is-error")}function S(){M.classList.remove("feedback-is-open"),document.body.classList.remove("no-scroll"),he()}const be=document.querySelector(".load-more"),ve=document.querySelector(".list-artists");let A=1;document.addEventListener("DOMContentLoaded",async()=>{C();try{F();const e=await N({});e?.length>0&&ae(e)}catch(e){g(e)}finally{q(),P(A)}le()});be.addEventListener("click",async()=>{A+=1,C();try{F();const e=await N({page:A});e?.length>0&&oe(e)}catch(e){g(e)}finally{q(),P(A)}});ve.addEventListener("click",e=>{const s=e.target.closest(".learn-more-artist");if(!s)return;const t=s.dataset.id;t&&Y(t)});const B=document.querySelector(".burger-btn"),T=document.querySelector(".burger-menu"),ye=document.querySelector(".nav-list");B.addEventListener("click",()=>{B.classList.toggle("is-open"),T.classList.toggle("is-open"),document.body.classList.toggle("no-scroll")});T.addEventListener("click",e=>{e.target.nodeName==="A"&&(e.preventDefault(),B.classList.remove("is-open"),T.classList.remove("is-open"),document.body.classList.remove("no-scroll"),j(e.target.getAttribute("href")))});ye.addEventListener("click",e=>{e.target.nodeName==="A"&&(e.preventDefault(),j(e.target.getAttribute("href")))});const Ae=document.querySelector(".backdrop-feedback-modal"),Le=document.querySelector(".leave-feedback");Le.addEventListener("click",()=>{Ae.classList.add("feedback-is-open"),pe()});
//# sourceMappingURL=index.js.map
