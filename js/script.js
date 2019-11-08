'use strict';

const titleClickHandler = function(event){
	
	event.preventDefault();
	const clickedElement = this;
	console.log('Link was clicked!');
	// console.log('clickedElement (width plus): ' + clickedElement);

	/* [DONE] remove class 'active' from all article links  */
	const activeLinks = document.querySelectorAll('.titles a.active');

	for(let activeLink of activeLinks){
	  activeLink.classList.remove('active');
	}

	/* [DONE] remove class 'active' from all articles */
	const activeArticles = document.querySelectorAll('.posts .active');
	
	for(let activeArticle of activeArticles) {
		activeArticle.classList.remove('active');
	}
	
	/* [DONE] add class 'active' to the clicked link */
	clickedElement.classList.add('active');
	
	/* [DONE] get 'href' attribute from the clicked link */
	const clickedLink = clickedElement.getAttribute("href");
	console.log(clickedLink);

	/* [DONE] find the correct article using the selector (value of 'href' attribute) */
	const showArticle = document.querySelector(clickedLink);
	
	/* [DONE] add class 'active' to the correct article */
	showArticle.classList.add('active');
}


const optArticleSelector = '.post',
	  optTitleSelector = '.post-title',
	  optTitleListSelector = '.titles';

function generateTitleLinks(){

	/* [DONE] remove contents of titleList */
	const titleList = document.querySelector(optTitleListSelector);
	titleList.innerHTML = '';
	
	/* [DONE] for each article */
	const articles = document.querySelectorAll(optArticleSelector);
	
	for(let article of articles) {
		/* [DONE] get the article id */
		const articleId = article.getAttribute("id");
		
		/* [DONE] find the title element and get the title from the title element*/
		const articleTitle = article.querySelector(optTitleSelector).innerHTML;
		
		/* [DONE] create HTML of the link */
		const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
		
		/* [DONE] insert links into title list */
		titleList.insertAdjacentHTML('beforeend', linkHTML);
	}
	const links = document.querySelectorAll('.titles a');
	console.log(links);

	for(let link of links){
		link.addEventListener('click', titleClickHandler);
	}
}

generateTitleLinks();
