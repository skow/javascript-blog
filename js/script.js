'use strict';

const titleClickHandler = function(event){
	
	event.preventDefault();
	const clickedElement = this;
	// console.log('clickedElement (width plus): ' + clickedElement);

	/* [DONE] remove class 'active' from all article links  */
	const activeLinks = document.querySelectorAll('.titles a.active');

	for (let activeLink of activeLinks) {
	  activeLink.classList.remove('active');
	}

	/* [DONE] remove class 'active' from all articles */
	const activeArticles = document.querySelectorAll('.posts .active');
	
	for (let activeArticle of activeArticles) {
		activeArticle.classList.remove('active');
	}
	
	/* [DONE] add class 'active' to the clicked link */
	clickedElement.classList.add('active');
	
	/* [DONE] get 'href' attribute from the clicked link */
	const href = clickedElement.getAttribute('href');
	console.log(href);

	/* [DONE] find the correct article using the selector (value of 'href' attribute) */
	const showArticle = document.querySelector(href);
	
	/* [DONE] add class 'active' to the correct article */
	showArticle.classList.add('active');
}


const optArticleSelector = '.post',
	  optTitleSelector = '.post-title',
	  optTitleListSelector = '.titles',
	  optArticleTagsSelector = '.post-tags .list',
	  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){

	/* [DONE] remove contents of titleList */
	const titleList = document.querySelector(optTitleListSelector);
	titleList.innerHTML = '';
	
	/* [DONE] for each article */
	const articles = document.querySelectorAll(optArticleSelector + customSelector);
	
	for (let article of articles) {
		/* [DONE] get the article id */
		const articleId = article.getAttribute('id');
		
		/* [DONE] find the title element and get the title from the title element*/
		const articleTitle = article.querySelector(optTitleSelector).innerHTML;
		
		/* [DONE] create HTML of the link */
		const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
		
		/* [DONE] insert links into title list */
		titleList.insertAdjacentHTML('beforeend', linkHTML);
	}
	const links = document.querySelectorAll('.titles a');
	console.log(links);

	for (let link of links) {
		link.addEventListener('click', titleClickHandler);
	}
}
generateTitleLinks();

function generateTags(){
	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);
	/* START LOOP: for every article: */
	for (let article of articles) {
		/* find tags wrapper */
		const tagList = article.querySelector(optArticleTagsSelector);

		/* get tags from data-tags attribute */
		const articleTags = article.getAttribute('data-tags');
		
		/* split tags into array */
		const articleTagArray = articleTags.split(' ');
		
		/* START LOOP: for each tag */
		for (let tag of articleTagArray) {
			/* generate HTML of the link */
			const tagLink = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
			
			/* add generated code to html variable */
			tagList.insertAdjacentHTML('beforeend', tagLink);
			
		}

  /* END LOOP: for every article: */
	}
}
generateTags();

function tagClickHandler(event){
	/* prevent default action for this event */
	event.preventDefault();
	
	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;
	console.log('Link was clicked!');
	
	/* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = clickedElement.getAttribute('href');
	
	/* make a new constant "tag" and extract tag from the "href" constant */
	const tag = href.replace('#tag-', '');

	/* find all tag links with class active */
	const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

	/* START LOOP: for each active tag link */
	for (let activeLink of activeTagLinks) {
		/* remove class active */
		activeLink.classList.remove('active');
	}
	/* END LOOP: for each active tag link */

	/* find all tag links with "href" attribute equal to the "href" constant */
	const allTagHref = document.querySelectorAll('a[href="' + href + '"]');
	
	/* START LOOP: for each found tag link */
	for (let oneTagHref of allTagHref) {
		/* add class active */
		oneTagHref .classList.add('active');
	}
	/* END LOOP: for each found tag link */

	/* execute function "generateTitleLinks" with article selector as argument */
	generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
	
	/* find all links to tags */
	const links = document.querySelectorAll('a[href^="#tag-"]');
	console.log(links);
	
	/* START LOOP: for each link */
	for (let link of links) {
		/* add tagClickHandler as event listener for that link */
		link.addEventListener('click', tagClickHandler);
	}
	/* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors(){
	/* find all articles */
	const articles = document.querySelectorAll(optArticleSelector);
	
	/* START LOOP: for every article: */
	for (let article of articles) {
		/* find author wrapper */
		const authorWrapper = article.querySelector(optArticleAuthorSelector);
		
		/* get author from data-author attribute */
		const author = article.getAttribute('data-author');
		
		/* generate HTML of the link */
		const authorLink = 'by <a href="#author-' + author + '">' + author + '</a>';
		
		/* add link with author on wrapper */
		authorWrapper.insertAdjacentHTML('beforeend', authorLink);

	/* END LOOP: for every article: */
	}
}
generateAuthors();

function authorClickHandler(event){
	/* prevent default action for this event */
	event.preventDefault();
	
	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;
	console.log('Link was clicked!');
	
	/* make a new constant "href" and read the attribute "href" of the clicked element */
	const href = clickedElement.getAttribute('href');
	
	/* make a new constant "author" and extract author from the "href" constant */
	const author = href.replace('#author-', '');

	/* find all authors links with class active */
	const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

	/* START LOOP: for each active author link */
	for (let activeLink of activeAuthorLinks) {
		/* remove class active */
		activeLink.classList.remove('active');
	}
	/* END LOOP: for each active author link */

	/* find all authors links with "href" attribute equal to the "href" constant */
	const allAuthorHref = document.querySelectorAll('a[href="' + href + '"]');
	
	/* START LOOP: for each found author link */
	for (let oneAuthorHref of allAuthorHref) {
		/* add class active */
		oneAuthorHref .classList.add('active');
	}
	/* END LOOP: for each found author link */

	/* execute function "generateTitleLinks" with article selector as argument */
	generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
	
	/* find all links to authors */
	const links = document.querySelectorAll('a[href^="#author-"]');
	console.log(links);
	
	/* START LOOP: for each link */
	for (let link of links) {
		/* add authorClickHandler as event listener for that link */
		link.addEventListener('click', authorClickHandler);
	}
	/* END LOOP: for each link */
}

addClickListenersToAuthors();


