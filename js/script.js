'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
}

const opt = {
	articleSelector: '.post',
	titleSelector: '.post-title',
	titleListSelector: '.titles',
	articleTagsSelector: '.post-tags .list',
	articleAuthorSelector: '.post-author',
	tagsListSelector: '.tags',
	cloudClassCount: 5,
	cloudClassPrefix: 'tag-size-',
	authorsListSelector: '.authors'
};

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
	// console.log(href);

	/* [DONE] find the correct article using the selector (value of 'href' attribute) */
	const showArticle = document.querySelector(href);
	
	/* [DONE] add class 'active' to the correct article */
	showArticle.classList.add('active');
}

function generateTitleLinks(customSelector = ''){

	/* [DONE] remove contents of titleList */
	const titleList = document.querySelector(opt.titleListSelector);
	titleList.innerHTML = '';
	
	/* [DONE] for each article */
	const articles = document.querySelectorAll(opt.articleSelector + customSelector);
	
	for (let article of articles) {
		/* [DONE] get the article id */
		const articleId = article.getAttribute('id');
		
		/* [DONE] find the title element and get the title from the title element*/
		const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
		
		/* [DONE] create HTML of the link */
		const linkHTMLData = {id: articleId, title: articleTitle};
		const linkHTML = templates.articleLink(linkHTMLData);
		
		/* [DONE] insert links into title list */
		titleList.insertAdjacentHTML('beforeend', linkHTML);
	}
	const links = document.querySelectorAll('.titles a');
	// console.log(links);

	for (let link of links) {
		link.addEventListener('click', titleClickHandler);
	}
}
generateTitleLinks();

function calculateTagsParams(tags){
	const params = {
		max: 0,
		min: 999999
	}
	for(let tag in tags) {
		if(tags[tag] > params.max) {
			params.max = tags[tag];
		}
		else if(tags[tag] < params.min) {
			params.min = tags[tag];
		}
	}
	return params;
}

function calculateTagClass(count, params){
	const normalizedCount = count - params.min;
	const normalizedMax = params.max - params.min;
	const percentage = normalizedCount / normalizedMax;
	const classNumber = Math.floor( percentage * (opt.cloudClassCount - 1) + 1 );
	
	return opt.cloudClassPrefix + classNumber;
}

function generateTags(){
	/* create a new variable allTags with an empty object */
	let allTags = {};
	
	/* find all articles */
	const articles = document.querySelectorAll(opt.articleSelector);
	/* START LOOP: for every article: */
	for (let article of articles) {
		/* find tags wrapper */
		const tagList = article.querySelector(opt.articleTagsSelector);

		/* get tags from data-tags attribute */
		const articleTags = article.getAttribute('data-tags');
		
		/* split tags into array */
		const articleTagArray = articleTags.split(' ');
		
		/* START LOOP: for each tag */
		for (let tag of articleTagArray) {
			/* generate HTML of the link */
			const linkTagHTMLData = {tag: tag};
			const tagLink = templates.articleTagLink(linkTagHTMLData);
			
			/* add generated code to html variable */
			tagList.insertAdjacentHTML('beforeend', tagLink);
			
			/* check if this link is NOT already in allTags */
			if(!allTags.hasOwnProperty(tag)) {
				/* add tag to allags object*/
				allTags[tag] = 1;
			} else {
				allTags[tag]++;
			}		
		}
		/* END LOOP: for every article: */
		
		/* find list of tags in right column */
		const tagListPlace = document.querySelector(opt.tagsListSelector);

		/* create variable for all links HTML code */
		const tagsParams = calculateTagsParams(allTags);
		
		const allTagsData = {tags: []};
		
		/* START LOOP: for each tag in allTags */
		for(let tag in allTags) {
			/* Generate code of a link and add it to allTagsHTML */
			allTagsData.tags.push ({
				tag: tag,
				count: allTags[tag],
				className: calculateTagClass(allTags[tag], tagsParams)
			});
		}
		/* END LOOP: for each tag in allTags */
		
		/* add html from allTagsHTML to tagList */
		tagListPlace.innerHTML = templates.tagCloudLink(allTagsData);
	}
}
generateTags();

function tagClickHandler(event){
	/* prevent default action for this event */
	event.preventDefault();
	
	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;
	// console.log('Link was clicked!');
	
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
		oneTagHref.classList.add('active');
	}
	/* END LOOP: for each found tag link */

	/* execute function "generateTitleLinks" with article selector as argument */
	generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
	
	/* find all links to tags */
	const links = document.querySelectorAll('a[href^="#tag-"]');
	// console.log(links);
	
	/* START LOOP: for each link */
	for (let link of links) {
		/* add tagClickHandler as event listener for that link */
		link.addEventListener('click', tagClickHandler);
	}
	/* END LOOP: for each link */
}
addClickListenersToTags();

function generateAuthors(){
	/* create a new variable allAuthors with an empty object */
	let allAuthors = {};
	
	/* find all articles */
	const articles = document.querySelectorAll(opt.articleSelector);
	
	/* START LOOP: for every article: */
	for (let article of articles) {
		/* find author wrapper */
		const authorWrapper = article.querySelector(opt.articleAuthorSelector);
		
		/* get author from data-author attribute */
		const author = article.getAttribute('data-author');
		
		/* generate HTML of the link */
		const linkAuthorHTMLData = {author: author};
		const authorLink = templates.articleAuthorLink(linkAuthorHTMLData);
		
		/* add link with author on wrapper */
		authorWrapper.insertAdjacentHTML('beforeend', authorLink);
		
		/* check if this link is NOT already in allAuthors */
		if(!allAuthors.hasOwnProperty(author)) {
			/* [NEW] add Author to allAuthors object*/
			allAuthors[author] = 1;
		} else {
			allAuthors[author]++;
		}
		/* END LOOP: for every article: */
	}
	
	/* find list of authors in right column */
	const authorList = document.querySelector(opt.authorsListSelector);
		
	/* add html from allAuthors to authorList */
	const allAuthorsData = {authors: []};
	
	for (let SingleAuthor in allAuthors) {
		/* Generate code of a link and add it to authorList */
		allAuthorsData.authors.push ({
			author: SingleAuthor,
			count: allAuthors[SingleAuthor]
		});
	}
	/* add html from allTagsHTML to AuthorList */
	authorList.innerHTML = templates.authorListLink(allAuthorsData);
}
generateAuthors();

function authorClickHandler(event){
	/* prevent default action for this event */
	event.preventDefault();
	
	/* make new constant named "clickedElement" and give it the value of "this" */
	const clickedElement = this;
	// console.log('Link was clicked!');
	
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
	// console.log(links);
	
	/* START LOOP: for each link */
	for (let link of links) {
		/* add authorClickHandler as event listener for that link */
		link.addEventListener('click', authorClickHandler);
	}
	/* END LOOP: for each link */
}
addClickListenersToAuthors();