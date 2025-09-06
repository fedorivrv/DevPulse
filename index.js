import{i as k,a as g,S as z}from"./assets/vendor-_MF0lpIG.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();function E(e){e&&k.show({title:"❌",message:`Sorry, there are no ${e}.`,color:"red",position:"topRight",messageColor:"white",titleColor:"white",timeout:5e3})}function p(e){e.message&&k.show({title:"Error",color:"red",position:"topRight",messageColor:"white",titleColor:"white",message:e.message,timeout:5e3})}function D(e){k.show({title:"Error",color:"red",position:"topRight",messageColor:"white",titleColor:"white",message:e,timeout:5e3})}function Q(){k.success({message:"Thank you for your feedback! It has been sent successfully.",position:"topRight",messageColor:"white",titleColor:"white",timeout:5e3})}g.defaults.baseURL="https://sound-wave.b.goit.study/api/";let u,N=1;async function Y({name:e,page:s,sortName:t,genre:o}={}){u="artists";const n={limit:8,page:s,name:e,sortName:t,genre:o};try{const r=await g.get(u,{params:n}),a=r.data.artists;return N=Math.ceil(r.data.totalArtists/n.limit),a&&Array.isArray(a)&&a.length>0?a:E("artists")}catch(r){p(r)}}async function Z(e){try{u=`artists/${e}`;const t=(await g.get(u,{})).data;return t||E("artist")}catch(s){p(s)}}async function V(){try{u="feedbacks";const e=await g.get(u,{}),s=Math.ceil(e.data.data.length/10),o={limit:10,page:J(s)},r=(await g.get(u,{params:o})).data.data;return r&&Array.isArray(r)&&r.length>0?r:E("feedbacks")}catch(e){p(e)}}function J(e){return Math.floor(Math.random()*e)+1}const H=document.querySelector(".global-loader");function C(){H.classList.remove("hidden")}function q(){H.classList.add("hidden")}const K=document.querySelector(".list-artists"),l=document.getElementById("artist-modal-backdrop"),b=document.getElementById("artist-modal"),W=document.getElementById("artist-close-btn"),c=document.getElementById("artist-content");let m=null,f=null;K.addEventListener("click",e=>{const s=e.target.closest(".learn-more-artist");if(!s)return;const t=s.dataset.id;if(!t)return console.error("Artist ID is missing!");O(t)});async function O(e){if(!e)return console.error("Artist ID is missing!");if(l.classList.contains("hidden")){l.classList.remove("hidden"),C(),c.classList.add("hidden"),document.body.style.overflow="hidden";try{const s=await Z(e);if(!s){E("artist"),L();return}const t=s.tracksList||[],o={};t.forEach(r=>{const a=r.strAlbum||"Unknown Album";o[a]||(o[a]=[]),o[a].push(r)});const n=Object.entries(o).map(([r,a])=>({strAlbum:r,tracks:a}));re(s,n)}catch(s){console.error(s),c.innerHTML="<p>Error loading artist.</p>",p(s)}finally{q(),c.classList.remove("hidden"),ee()}te()}}function ee(){c&&(c.scrollTop=0),b&&(b.scrollTop=0),l&&(l.scrollTop=0),requestAnimationFrame(()=>{if(c){const e=c.style.scrollBehavior;c.style.scrollBehavior="auto",c.scrollTo(0,0),c.style.scrollBehavior=e}b&&b.scrollTo(0,0),l&&l.scrollTo(0,0)})}function L(){l.classList.add("hidden"),document.body.style.overflow="",se()}function te(){m||(m=e=>{e.key==="Escape"&&L()},document.addEventListener("keydown",m)),f||(f=e=>{e.target===l&&L()},l.addEventListener("click",f))}function se(){m&&(document.removeEventListener("keydown",m),m=null),f&&(l.removeEventListener("click",f),f=null)}function re(e,s){const t=e.intFormedYear?e.intDiedYear&&e.intDiedYear!=="null"?`${e.intFormedYear} - ${e.intDiedYear}`:`${e.intFormedYear} - present`:"information missing";c.innerHTML=`
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
      ${s.length?s.map(o=>`
                
        <div class="album">
          <div class="album-title">${o.strAlbum||"—"}</div>
          ${o.tracks&&o.tracks.length?`
            <div class="tracks">
              <div class="track track-header">
                <span>Track</span>
                <span>Time</span>
                <span>Link</span>
              </div>
              ${o.tracks.map(n=>`
                <div class="track">
                  <span>${n.strTrack||"—"}</span>
                  <span>${ne(n.intDuration)}</span>
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
  `}function ne(e){if(!e)return"-";const s=Math.floor(e/1e3),t=Math.floor(s/60),o=s%60;return`${t}:${o.toString().padStart(2,"0")}`}W.addEventListener("click",L);const oe="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAPCAYAAADZCo4zAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABiSURBVHgBhZDLCYBADESDeNcSLMWSLMEO1o60ky1BrCBOQBF3k9kHc5oH+Yi0UNXUEowdGZlgZGRigi9pzYnMTHhZrO8lJkEaOuFc0YhvD6fMv0toWQiHet98yi1cE+UqhBuGMsXjw1amBwAAAABJRU5ErkJggg==",P=document.querySelector(".load-more");function ae(e){const{_id:s,genres:t,strArtist:o,strBiographyEN:n,strArtistThumb:r}=e;let a;return(Array.isArray(t)||t.length!==0)&&(a=t.map(h=>`<li class="genre-artist">${h}</li>`).join(`
`)),`<li class="item-artists">
        <img class="img-artist" src="${r}" alt="${o}" />
        <div class="info-artist">
          <ul class="genres-artist">
            ${a}
          </ul>
          <h3 class="name-artist">${o}</h3>
          <p class="desc-artist">${n}</p>
        </div>
       <button class="learn-more-artist" data-id="${s}">
          Learn More
          <img class="icon-learn-more" src="${oe}" width="8" height="14" alt="icon right arrow"></img>
        </button>
      </li>
`}function j(e){return e.map(ae).join(`
`)}function ie(e){const s=document.querySelector(".list-artists"),t=j(e);s.insertAdjacentHTML("afterbegin",t)}function ce(e){const s=document.querySelector(".list-artists"),t=j(e);s.insertAdjacentHTML("beforeEnd",t)}function U(e){e===N?F():le()}function F(){P.classList.add("is-display-none")}function le(){P.classList.remove("is-display-none")}const de=document.querySelector(".header-container");function G(e){let t=document.querySelector(e).getBoundingClientRect(),o=de.getBoundingClientRect(),n=t.bottom-t.height-o.height;window.scrollBy({top:n,behavior:"smooth"})}async function ue(){try{const e=await V();if(!Array.isArray(e)||e.length===0){console.warn("No feedbacks available.");const t=document.getElementById("reviews-container");t&&(t.innerHTML='<p class="feedback-no-data">No feedbacks available.</p>');return}const s=e.map(t=>({name:t.author||t.name||"Anonymous",text:t.descr||t.text||t.feedback||"",rating:t.rating||5}));me(s)}catch(e){console.error("Error loading feedbacks",e)}}function me(e){const s=document.getElementById("reviews-container");if(!s)return;s.innerHTML="";const t=document.createDocumentFragment();e.forEach(r=>{const a=document.createElement("div");a.className="swiper-slide review-card",a.innerHTML=`
      <div class="rating ${ge(r.rating)}">
        ${fe(r.rating)}
      </div>
      <p class="feedback-text">${r.text}</p>
      <h3 class="feedback-author">${r.name}</h3>
    `,t.appendChild(a)}),s.appendChild(t);const o=new z(".swiper",{loop:!1,slidesPerView:1,autoHeight:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0,type:"custom",renderCustom:(r,a,h)=>{const w=r.slides.length;let $=2;return r.realIndex===0?$=1:r.realIndex===w-1&&($=3),[1,2,3].map(R=>`<span class="swiper-pagination-bullet${R===$?" swiper-pagination-bullet-active":""}" data-index="${R}"></span>`).join("")}},spaceBetween:5});document.querySelector(".swiper-pagination")?.addEventListener("click",r=>{if(!r.target.classList.contains("swiper-pagination-bullet"))return;const a=Number(r.target.dataset.index),h=o.slides.length-(o.loop?2:0);let w=a===1?0:a===3?h-1:Math.floor((h-1)/2);o.slideToLoop(w)})}function fe(e){const s=Math.floor(e),t=5;let o="";for(let n=1;n<=t;n++)o+=`<div class="star">
      <svg class="${n<=s?"star-filled":"star-empty"}" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
        <path fill="${n<=s?"#764191":"#fff"}" d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 
        1.402 8.173L12 18.897l-7.336 3.86 
        1.402-8.173L.132 9.21l8.2-1.192z"></path>
      </svg>
    </div>`;return`<div class="star-container">${o}</div>`}function ge(e){return`value-${Math.floor(e)}`}const pe=document.querySelector(".feedback-close-btn"),x=document.querySelector(".backdrop-feedback-modal");document.querySelector(".feedback-is-open");const I=document.querySelector(".feedback-modal-form"),v=document.querySelector(".feedback-modal-input"),y=document.querySelector(".feedback-modal-textarea"),M=document.querySelector(".feedback-modal-list"),d=document.querySelectorAll(".feedback-modal-rating"),i={name:"",descr:"",rating:0};function he(){document.body.classList.add("no-scroll"),v.addEventListener("input",e=>{e.target.value.length<2||e.target.value.length>16?v.classList.add("is-error"):v.classList.remove("is-error")}),y.addEventListener("input",e=>{e.target.value.length<10||e.target.value.length>512?y.classList.add("is-error"):y.classList.remove("is-error")}),M.addEventListener("mouseover",e=>{const s=e.target.closest("button");if(s)for(let t=i.rating;t<s.dataset.value;t++)d[t].children[0].classList.add("is-click")}),M.addEventListener("mouseout",e=>{if(e.target.closest("button"))for(let t=i.rating;t<d.length;t++)d[t].children[0].classList.remove("is-click")}),M.addEventListener("click",e=>{const s=e.target.closest("button");if(s){i.rating=Number(s.dataset.value);for(let t=0;t<d.length;t++)d[t].children[0].classList.remove("is-click");for(let t=0;t<i.rating;t++)d[t].children[0].classList.add("is-click")}}),I.addEventListener("submit",_),pe.addEventListener("click",S),x.addEventListener("click",e=>{e.target===e.currentTarget&&S()}),window.addEventListener("keydown",X)}function X(e){e.key==="Escape"&&(S(),window.removeEventListener("keydown",X))}async function _(e){if(e.preventDefault(),i.name=e.target.elements["user-name"].value.trim(),i.descr=e.target.elements["user-message"].value.trim(),i.name.length>=2&&i.name.length<=16&&i.descr.length>=10&&i.descr.length<=512&&i.rating>0)try{const s=await g.post("https://sound-wave.b.goit.study/api/feedbacks",i);e.target.reset(),i.rating=0,d.forEach(t=>{t.children[0].classList.remove("is-click")}),x.classList.remove("feedback-is-open"),document.body.classList.remove("no-scroll"),Q()}catch(s){D(s)}else D("Please fill all fields and select a rating!")}function be(){I.reset(),i.rating=0,d.forEach(e=>{e.children[0].classList.remove("is-click")}),v.classList.remove("is-error"),y.classList.remove("is-error")}function S(){x.classList.remove("feedback-is-open"),I.removeEventListener("submit",_),document.body.classList.remove("no-scroll"),be()}const ve=document.querySelector(".load-more"),ye=document.querySelector(".list-artists");let A=1;document.addEventListener("DOMContentLoaded",async()=>{C();try{F();const e=await Y({});e?.length>0&&ie(e)}catch(e){p(e)}finally{q(),U(A)}ue()});ve.addEventListener("click",async()=>{A+=1,C();try{F();const e=await Y({page:A});e?.length>0&&ce(e)}catch(e){p(e)}finally{q(),U(A)}});ye.addEventListener("click",e=>{const s=e.target.closest(".learn-more-artist");if(!s)return;const t=s.dataset.id;t&&O(t)});const B=document.querySelector(".burger-btn"),T=document.querySelector(".burger-menu"),Ae=document.querySelector(".nav-list");B.addEventListener("click",()=>{B.classList.toggle("is-open"),T.classList.toggle("is-open"),document.body.classList.toggle("no-scroll")});T.addEventListener("click",e=>{e.target.nodeName==="A"&&(e.preventDefault(),B.classList.remove("is-open"),T.classList.remove("is-open"),document.body.classList.remove("no-scroll"),G(e.target.getAttribute("href")))});Ae.addEventListener("click",e=>{e.target.nodeName==="A"&&(e.preventDefault(),G(e.target.getAttribute("href")))});const Le=document.querySelector(".backdrop-feedback-modal"),ke=document.querySelector(".leave-feedback");ke.addEventListener("click",()=>{Le.classList.add("feedback-is-open"),he()});
//# sourceMappingURL=index.js.map
