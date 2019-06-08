const Pagination = (function(){

	return {
		currentPage: function(){
			for(i = 0; i < $('.page-item').length; i++)
			{
				if($('.page-item').eq(i).hasClass('active'))
				{
					return $('.page-item').eq(i).children().data('num');
				}
			}
			
		},
		render: function(itemsCount, itemsOnPage){
			let pages = 0;
			if(itemsCount%itemsOnPage==0)
			{
				pages=itemsCount/itemsOnPage;
			}
			else
			{
				pages=Math.trunc(itemsCount/itemsOnPage)+1;
			}

			let content;
			content = `<ul class="pagination">
						<li class="page-item disabled">
					      <a href="#" class="page-link" data-nav="first"><i class="fas fa-angle-double-left"></i></a>
					    </li>
					    <li class="page-item disabled">
					      <a href="#" class="page-link" data-nav="prev"><i class="fas fa-angle-left"></i></a>
					    </li>
					    <li class="page-item active">
					    	<a href="#" class="page-link" data-num="1">1</a>
					    </li>`;
			if(pages<=3)
			{
				for (var i = 0; i < pages-1; i++) {
					content += `<li class="page-item">
			    					<a href="#" class="page-link" data-num="${i+2}">${i+2}</a>
			    				</li>`;
				}
				content += `<li class="page-item">
		      					<a href="#" class="page-link" data-nav="next"><i class="fas fa-angle-right"></i></a>
		    				</li>
		    				<li class="page-item">
		      					<a href="#" class="page-link" data-nav="last"><i class="fas fa-angle-double-right"></i></a>
		    				</li>
						</ul>`;
			}
			else if(pages>3)
			{
				
				content += `<li class="page-item">
						    	<a href="#" class="page-link" data-num="2">2</a>
						    </li>
						    <li class="page-item dots">...</li>
						    <li class="page-item">
						    	<a href="#" class="page-link" data-num="${pages}">${pages}</a>
						    </li>
						    <li class="page-item">
		      					<a href="#" class="page-link"  data-nav="next"><i class="fas fa-angle-right"></i></a>
		    				</li>
		    				<li class="page-item">
		      					<a href="#" class="page-link"  data-nav="last"><i class="fas fa-angle-double-right"></i></a>
		    				</li>
						</ul>`;
			}
			$(content).appendTo('nav');
		},
		clickOn: function(elem,itemsCount, itemsOnPage){
			if(!$(elem).parent().hasClass('active'))
			{
				let content;
				let pages = 0;
				let pageNumber = Pagination.currentPage();

				// считаем количество страниц
				if(itemsCount%itemsOnPage == 0)
				{
					pages = itemsCount/itemsOnPage;
				}
				else
				{
					pages = Math.trunc(itemsCount/itemsOnPage)+1;
				}
				// debugger;
				// убираем класс active и назначаем новый номер страницы
				if($(elem).data('nav')=='next' || $(elem).parent().data('nav')=='next')
				{
					$(`.page-link[data-num="${pageNumber}"]`).parent().removeClass('active');
					pageNumber++;
				}
				else if($(elem).data('nav')=='prev' || $(elem).parent().data('nav')=='prev')
				{
					$(`.page-link[data-num="${pageNumber}"]`).parent().removeClass('active');
					pageNumber--;
				}
				else if($(elem).data('nav')=='first' || $(elem).parent().data('nav')=='first')
				{
					$(`.page-link[data-num="${pageNumber}"]`).parent().removeClass('active');
					pageNumber = 1;
				}
				else if($(elem).data('nav')=='last' || $(elem).parent().data('nav')=='last')
				{
					$(`.page-link[data-num="${pageNumber}"]`).parent().removeClass('active');
					pageNumber = pages;
				}
				else if($(elem).data('num'))
				{
					$(`.page-link[data-num="${pageNumber}"]`).parent().removeClass('active');
					pageNumber = $(elem).data('num');
				}
				$(`.page-link[data-num="${pageNumber}"]`).parent().addClass('active');

				// debugger;
				if(pageNumber == 1 && pages > 3)
				{
					content = `<li class="page-item active">
							    	<a href="#" class="page-link" data-num="1">1</a>
							    </li>
							    <li class="page-item">
							    	<a href="#" class="page-link" data-num="2">2</a>
							    </li>
							    <li class="page-item dots">...</li>
							    <li class="page-item">
							    	<a href="#" class="page-link" data-num="${pages}">${pages}</a>
							    </li>`;
				}
				else if(pageNumber == 2 && pages > 3)
				{
					content = `<li class="page-item">
							    	<a href="#" class="page-link" data-num="1">1</a>
							    </li>
							    <li class="page-item active">
							    	<a href="#" class="page-link" data-num="2">2</a>
							    </li>
							    <li class="page-item">
							    	<a href="#" class="page-link" data-num="3">3</a>
							    </li>
							    <li class="page-item dots">...</li>
							    <li class="page-item">
							    	<a href="#" class="page-link" data-num="${pages}">${pages}</a>
							    </li>`;
				}
				else if(pageNumber > 2 && pageNumber < pages - 1 && pages > 3)
				{
				 	content = `<li class="page-item">
							    	<a href="#" class="page-link" data-num="1">1</a>
							    </li>
							    <li class="page-item dots">...</li>
							    <li class="page-item active">
							    	<a href="#" class="page-link" data-num="${pageNumber}">${pageNumber}</a>
							    </li>
							    <li class="page-item dots">...</li>
							    <li class="page-item">
							    	<a href="#" class="page-link" data-num="${pages}">${pages}</a>
							    </li>`;
				}
				else if(pageNumber == pages-1 && pages > 3)
				{
					content = `<li class="page-item">
							    	<a href="#" class="page-link" data-num="1">1</a>
							    </li>
							    <li class="page-item dots">...</li>
							    <li class="page-item">
							    	<a href="#" class="page-link" data-num="${pages-2}">${pages-2}</a>
							    </li>
							    <li class="page-item active">
							    	<a href="#" class="page-link" data-num="${pages-1}">${pages-1}</a>
							    </li>
							    <li class="page-item">
							    	<a href="#" class="page-link" data-num="${pages}">${pages}</a>
							    </li>`;
				}
				else if(pageNumber == pages && pages > 3)
				{
					content = `<li class="page-item">
							    	<a href="#" class="page-link" data-num="1">1</a>
							    </li>
							    <li class="page-item dots">...</li>
							    <li class="page-item">
							    	<a href="#" class="page-link" data-num="${pages-1}">${pages-1}</a>
							    </li>
							    <li class="page-item active">
							    	<a href="#" class="page-link" data-num="${pages}">${pages}</a>
							    </li>`;
				}
				
				if(pages > 3)
				{
					$('nav').empty();
					$(`<ul class="pagination">
							<li class="page-item">
						      <a href="#" class="page-link" data-nav="first"><i class="fas fa-angle-double-left"></i></a>
						    </li>
						    <li class="page-item">
						      <a href="#" class="page-link" data-nav="prev"><i class="fas fa-angle-left"></i></a>
						    </li>
						    ${content}
						    <li class="page-item">
		      					<a href="#" class="page-link"  data-nav="next"><i class="fas fa-angle-right"></i></a>
		    				</li>
		    				<li class="page-item">
		      					<a href="#" class="page-link"  data-nav="last"><i class="fas fa-angle-double-right"></i></a>
		    				</li>
						</ul>`).appendTo('nav');
				}
				

				// убираем/назначаем класс disabled
				if(pageNumber > 1)
				{
					$('.page-link[data-nav="prev"]').parent().removeClass('disabled');
					$('.page-link[data-nav="first"]').parent().removeClass('disabled');
				}
				if(pageNumber == 1)
				{
					$('.page-link[data-nav="prev"]').parent().addClass('disabled');
					$('.page-link[data-nav="first"]').parent().addClass('disabled');
				}
				if(pageNumber == pages)
				{
					$('.page-link[data-nav="next"]').parent().addClass('disabled');
					$('.page-link[data-nav="last"]').parent().addClass('disabled');
				}
				if(pageNumber < pages)
				{
					$('.page-link[data-nav="next"]').parent().removeClass('disabled');
					$('.page-link[data-nav="last"]').parent().removeClass('disabled');
				}
				

			}	
		}
	}
})();