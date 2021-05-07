const searchContainer = document.getElementById("search-container");
const inputSearch = document.getElementById("input-search");
const iconSearch = document.getElementById("icon-search");
const btnVermas = document.getElementById("btn-vermas")

const suggestedContainer = document.getElementById("suggested-container");
const imageHeader = document.getElementById("img-header");
const titlePrincipal = document.getElementById("tittle-principal");
const sectionSearch = document.getElementById("section-searcher");

const sectionTrendingTerms = document.getElementById("section-trending-terms");
const lineInputBottom = document.getElementById("line-input-bottom");
const sectionResults = document.getElementById("section-results");
const containerGifosResult = document.getElementById("container-gifos-result");

let viewMoreCount = 0;
let pagOffset = 0;


async function addTrendingSearchTerms() {
  const paragraph = document.getElementById("trending-terms");

  try {
    const terms = await fetchTrendingSearchTerms();

    terms.data.forEach((term, index) => {
      if (index < 5) {
        const upperCaseTerm = term[0].toUpperCase() + term.slice(1);
        const linkTerm = document.createElement("span");
        linkTerm.innerText = upperCaseTerm;
        linkTerm.addEventListener("click", () => {
          addGifosResult(upperCaseTerm, 0);
          sectionResults.scrollIntoView({ behavior: "smooth" });
        });
        paragraph.appendChild(linkTerm);
        if (index !== 4) paragraph.append(',');
      }
    });
  } catch (error) {
    console.error(error);
  }
}

addTrendingSearchTerms();

/*******************************
 * Add Gifs Results
 *******************************/
async function addGifosResult(term, offset) {
  try {
    const searchedGifos = await fetchSeachGifs(term, offset);
    const headingResult = document.getElementById("heading-gifos-result");
    
    showElement(sectionResults);
    headingResult.textContent = term;
    containerGifosResult.innerHTML = "";

    if (searchedGifos.data.length) {
      createGifos(containerGifosResult, searchedGifos.data, {
        type: "search",
        search: term,
      });

      const { offset, total_count } = searchedGifos.pagination;
      addPagination(
        containerGifosResult,
        12,
        offset,
        total_count,
        (pageClicked) => {
          addGifosResult(term, pageClicked * 12);
        }
      );
      
    } else {
      // Not gifs found
      containerGifosResult.innerHTML = `
        <img
          class="no-result-icon"
          src="./images/icon-busqueda-sin-resultado.svg"
          alt="busqueda-sin-resultado"
        />
        <p class="no-result-text">Intenta con otra Búsqueda</p>
      `;
    }
  } catch (error) {
    console.error(error);
  }
}

/**********************************
 * Add Suggested words to Searcher
 **********************************/
inputSearch.addEventListener("input", async (e) => {
  if (e.target.value.length > 0) {
    addClass(iconSearch, "search");
    displayNone(imageHeader);
    displayNone(titlePrincipal);
    addClass(sectionTrendingTerms, "hidden");

    const suggestedWords = await fetchSuggestedWords(e.target.value);


    if (suggestedWords.data.length) {
      displayBlock(suggestedContainer);
      displayBlock(lineInputBottom);

      suggestedContainer.innerHTML = "";
      suggestedWords.data.forEach((word) => {
        const term = document.createElement("li");
        term.innerText = word.name;
        term.tabIndex = 0;
        suggestedContainer.appendChild(term);

        term.addEventListener("click", () => {
          inputSearch.value = term.innerText;
          inputSearch.focus();
          containerGifosResult.innerHTML = "";
          addGifosResult(inputSearch.value);
          displayNone(suggestedContainer);
          displayNone(lineInputBottom);
          displayBlock(sectionTrendingTerms);
          displayBlock(titlePrincipal);
          displayBlock(imageHeader);
          inputSearch.value = "";
          sectionResults.scrollIntoView({ behavior: "smooth" });
          clearSearch();

        });
      });

      iconSearch.addEventListener("click", () => {
        inputSearch.value = "";
        clearSearch();
      });
    }
  } else {
    clearSearch();
  }
});

function clearSearch() {
  suggestedContainer.innerHTML = "";
  inputSearch.removeEventListener("click", null);
  displayNone(suggestedContainer);
  displayNone(lineInputBottom);
  removeClass(sectionTrendingTerms, "hidden");
  removeClass(imageHeader, "hidden");
  removeClass(iconSearch, "search");
  searchContainer.style.marginTop = "0px";
}

inputSearch.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "Enter":
      if (inputSearch.value) {
        containerGifosResult.innerHTML = ``;
        addGifosResult(inputSearch.value);
        displayNone(suggestedContainer);
        displayBlock(sectionTrendingTerms);
        displayBlock(titlePrincipal);
        displayBlock(imageHeader);
        inputSearch.value = "";
        clearSearch();
        sectionResults.scrollIntoView({ behavior: "smooth" });
      }
      break;

    case "Escape":
      inputSearch.value = "";
      break;

    default:
      break;
  }
});
