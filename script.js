const menu = document.querySelector(".mobile-menu");
const openMenu = document.querySelector(".icon-menu");
const btnSubmit = document.querySelector("#btn-short");
const input = document.querySelector("#url-input");
const renderUrl = document.querySelector(".list-link");
const msgerror = document.querySelector(".error-msg");
let arrayLinks = [];


addEventListener("DOMContentLoaded",(e)=>{
   arrayLinks = JSON.parse(localStorage.getItem("link")) || [];
   
   for (const link of arrayLinks) {
      renderLink(link);
   }
})

openMenu.addEventListener("click", () => {
  {
    menu.classList.toggle("open");
  }
});

btnSubmit.addEventListener("click", () => {
  let inputUrl = input.value;
  if (!inputUrl.trim() == "") {
    urlShort(inputUrl);
  }else{
    msgerror.style.visibility = "visible";
    input.style.border = "2px solid red"
  }
 

});

function urlShort(inputUrl) {
     const tinyUrlApi = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(inputUrl)}`;

  fetch(tinyUrlApi)
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Error al acortar la URL.');
    })
    .then(shortUrl => {
      console.log('URL corta:', shortUrl);
      const id = Date.now();
      const nuevoLink = {id,inputUrl,shortUrl};
      arrayLinks.push(nuevoLink);
      renderLink(nuevoLink);
      localStorage.setItem("link",JSON.stringify(arrayLinks));
      
    })
    .catch(error => console.error('Error:', error));
}

function renderLink(link){
     const div = document.createElement("div");
       div.classList.add("card-link");
       const p = document.createElement("p");
       p.textContent = link.inputUrl;

       const hr = document.createElement("hr");

       const a = document.createElement("a");
       a.setAttribute("href",`${link.shortUrl}`);
       a.textContent=link.shortUrl;

       const btnCopy = document.createElement("button");

       btnCopy.textContent = "copy";

       btnCopy.classList.add("btncopy");
       
       btnCopy.addEventListener("click",()=>{
         navigator.clipboard.writeText(link.shortUrl)
          .then(()=>{
            btnCopy.classList.toggle("copiado")
            btnCopy.textContent="copied!"
          })
          .catch(err =>{
            console.error(err);
          })
       })

       div.append(p,hr,a,btnCopy)

       renderUrl.append(div);
}