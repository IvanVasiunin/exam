//данные для отправки на сервер
let initData = {
	init: 1
}

//данные для отправки на сервер
let filteredData = {
    	authorID: -999,
    	year: -9999,
    	month: null,
    	page: 1
    }

let articlesCount = 0;
let articlesOnPage = 0;

//месяцы для вывода в сайдбаре
let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];


$(document).ready(function() {
    initRequest();
});

//первый запрос на сервер
function initRequest()
{
	$('.preloaderContainer').show();
	$.ajax({
    	url:'/',
    	method: 'POST',
    	data: initData,
    	success(data){
    		console.log($.parseJSON(data));
    		let authors = $.parseJSON(data).authors;
    		let articles = $.parseJSON(data).articles;
    		let years = $.parseJSON(data).years;
    		articlesCount = $.parseJSON(data).articlesCount;
    		articlesOnPage = $.parseJSON(data).articlesOnPage;

    		renderAuthors(authors);
    		renderYears(years);
    		renderArticles(articles);

    		Pagination.render(articlesCount, articlesOnPage);
    		$('.preloaderContainer').hide();
    	}
    })
}

//обработка клика по блоку пагинации
$(document).on('click', '.page-link', function(e){

	if($(e.target).parent().hasClass('disabled'))
	{
		e.preventDeafault();
	}
	else
	{
		Pagination.clickOn($(e.target), articlesCount, articlesOnPage);
		filteredData.page = Pagination.currentPage();

		$('.preloaderContainer').show();
		$.ajax({
    	url:'/',
    	method: 'POST',
    	data: filteredData,
    	success(data){
    		console.log($.parseJSON(data));
    		let articles = $.parseJSON(data).articles;
    		renderArticles(articles);
    		$('.preloaderContainer').hide();
    	}
    })
	}
})

$('.sidebarAuthors').on('change', function(e){

	($('.sidebarAuthors').each(function(){
		filteredData.authorID = ($(':selected').data('id'));
	}))

	//обновляем данные для запроса, удаляем месяцы в сайдбаре
	$('.sidebar_months').empty();
	filteredData.month = null;
	filteredData.page = 1;

	//показываем/скрываем кнопку сброса
	if(filteredData.authorID != -999 || filteredData.year != -9999 || filteredData.month != null)
	{
		$('.sidebar_reset').css({'display':'flex'});
	}
	else
	{
		$('.sidebar_reset').hide();
	}

	$('.preloaderContainer').show();

	$.ajax({
    	url:'/',
    	method: 'POST',
    	data: filteredData,
    	success(data){
    		console.log($.parseJSON(data));
    		let articles = $.parseJSON(data).articles;
    		renderArticles(articles);
    		if(['months'] in $.parseJSON(data))
    		{
    			let monthsNumbers = $.parseJSON(data).months;
    			renderMonths(monthsNumbers);
    		}
    		articlesCount = $.parseJSON(data).articlesCount;
    		articlesOnPage = $.parseJSON(data).articlesOnPage;
    		$('nav').empty();
    		Pagination.render(articlesCount, articlesOnPage);
    		$('.preloaderContainer').hide();
    	}
    })
})

//обработчик клика по году
$(document).on('click', '.sidebar_year', function(e){
	
	if($(e.target).hasClass('sidebar_active'))
	{
		$(e.target).removeClass('sidebar_active');
		filteredData.year = -9999;
		$('.sidebar_months').empty();
		filteredData.month = null;
	}
	else
	{
		$('.sidebar_year').each(function(){
			$(this).removeClass('sidebar_active');
		})
		$(e.target).addClass('sidebar_active');
		filteredData.year = +$(e.target).text();
		$('.sidebar_months').empty();
		filteredData.month = null;
	}
	
	filteredData.page = 1;
	//показываем/скрываем кнопку сброса
	if(filteredData.authorID != -999 || filteredData.year != -9999 || filteredData.month != null)
	{
		$('.sidebar_reset').css({'display':'flex'});
	}
	else
	{
		$('.sidebar_reset').hide();
	}

	$('.preloaderContainer').show();

	$.ajax({
    	url:'/',
    	method: 'POST',
    	data: filteredData,
    	success(data){
    		console.log($.parseJSON(data));
    		let articles = $.parseJSON(data).articles;
    		renderArticles(articles);
    		// debugger;
    		if(['months'] in $.parseJSON(data))
    		{
    			let monthsNumbers = $.parseJSON(data).months;
    			renderMonths(monthsNumbers);
    		}
    		
    		$('.sidebar_months').show();
    		articlesCount = $.parseJSON(data).articlesCount;
    		articlesOnPage = $.parseJSON(data).articlesOnPage;
    		$('nav').empty();
    		Pagination.render(articlesCount, articlesOnPage);
    		$('.preloaderContainer').hide();
    	}
    })
})

//обработчик клика по месяцу
$(document).on('click', '.sidebar_month', function(e){
	
	if($(e.target).hasClass('sidebar_active'))
	{
		$(e.target).removeClass('sidebar_active');
		filteredData.month = null;
	}
	else
	{
		// debugger;
		$('.sidebar_month').each(function(){
			$(this).removeClass('sidebar_active');
		})
		$(e.target).addClass('sidebar_active');
		filteredData.month = +$(e.target).data('month');
	}
	
	filteredData.page = 1;
	
	if(filteredData.authorID != -999 || filteredData.year != -9999 || filteredData.month != null)
	{
		$('.sidebar_reset').css({'display':'flex'});
	}
	else
	{
		$('.sidebar_reset').hide();
	}

	$('.preloaderContainer').show();

	$.ajax({
    	url:'/',
    	method: 'POST',
    	data: filteredData,
    	success(data){
    		console.log($.parseJSON(data));
    		let articles = $.parseJSON(data).articles;
    		renderArticles(articles);
    		// debugger;
    		articlesCount = $.parseJSON(data).articlesCount;
    		articlesOnPage = $.parseJSON(data).articlesOnPage;
    		$('nav').empty();
    		Pagination.render(articlesCount, articlesOnPage);
    		$('.preloaderContainer').hide();
    	}
    })
})

//обработчик клика по кнопке сброса
$('.sidebar_reset').click(function(){
	$('.sidebar_months').empty();
	$('.sidebar_year').each(function(){
		$(this).removeClass('sidebar_active');
	});
	$('.sidebarAuthors').val($('option').eq(0).text());
	$('.sidebar_reset').hide();
	filteredData.authorID = -999;
	filteredData.year = -9999;
	filteredData.month = null;
	filteredData.page = 1;
	$('.preloaderContainer').show();
	$.ajax({
    	url:'/',
    	method: 'POST',
    	data: filteredData,
    	success(data){
    		let articles = $.parseJSON(data).articles;
    		articlesCount = $.parseJSON(data).articlesCount;
    		articlesOnPage = $.parseJSON(data).articlesOnPage;
    		renderArticles(articles);
    		$('nav').empty();
    		Pagination.render(articlesCount, articlesOnPage);
    		$('.preloaderContainer').hide();
    	}
    })
})


 function renderAuthors(authors)
 {
 	for (let i = 0; i < authors.length; i++) {
		$(`<option data-id="${authors[i].id}">${authors[i].name}</option>`).appendTo('.sidebarAuthors');
	}
 }

 function renderYears(years)
 {
 	for (let i = 0; i < years.length; i++) {
		$(`<button class="sidebar-item__label sidebar_year">${years[i]}</button>`).appendTo('.sidebarYears');
	}
 }

  function renderMonths(monthsNumbers)
 {
 	for (let i = 0; i < monthsNumbers.length; i++) {
		$(`<button class="sidebar-item__label sidebar_month" data-month=${monthsNumbers[i]}>${months[monthsNumbers[i]-1]}</button>`).appendTo('.sidebar_months');
	}
 }

 function renderArticles(articles)
 {
 	$('.articles-list').empty();
 	for (let i = 0; i < articles.length; i++) {
		$(`<div class="article">
				<img src="${articles[i].link}" alt="Картинка статьи" />
				<div class="articleContent">
					<a href="#" class="articleTitle">${articles[i].title}</a>
					<div class="articleInfo">
						<span class="author">${articles[i].name}</span>
						<span class="date">${parseDate(articles[i].created_at)}</span>
					</div>
					<div class="articleAnnotation">${articles[i].annotation}</div>
				</div>
			</div>`).appendTo('.articles-list');
	}
 }

 function parseDate(date)
 {
 	let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
 	let monthNum = +(date[5] + date [6]);
 	let day = date[8] + date[9];
 	let newDate;
 	newDate = day + ' ' + months[monthNum-1] + ' ' + date.slice(0,4);
 	return newDate;
 }