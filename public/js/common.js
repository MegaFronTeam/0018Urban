"use strict";

const JSCCommon = {
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			// showClass: "fancybox-throwOutUp",
			// hideClass: "fancybox-throwOutDown",
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		document.addEventListener('click', (event) => {
			let element = event.target.closest(link)
			if (!element) return;
			let modal = document.querySelector("#" + element.dataset.src);
			const data = element.dataset;

			function setValue(val, elem) {
				if (elem && val) {
					const el = modal.querySelector(elem)
					el.tagName == "INPUT"
						? el.value = val
						: el.innerHTML = val;
					// console.log(modal.querySelector(elem).tagName)
				}
			}
			setValue(data.title, '.ttu');
			setValue(data.text, '.after-headline');
			setValue(data.btn, '.btn');
			setValue(data.order, '.order');
		})
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	// closeMenu() {
	// 	const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
	// 	const menu = document.querySelector(".menu-mobile--js");
	// 	if (!menu) return;
	// 	if (menu.classList.contains("active")) {
	// 		toggle.forEach(element => element.classList.remove("on"));
	// 		menu.classList.remove("active");
	// 		[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
	// 	}

	// },
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		let menuItems = document.querySelectorAll(".menu-item a");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body].forEach(el => el.classList.remove("fixed"));
		}
		for (let menuItem of menuItems) {
			menuItem.addEventListener('click', function() {
				document.body.classList.remove('fixed');
				menu.classList.remove('active');
				toggle.forEach(element => element.classList.remove("on"));
			});
		}
	},
	mobileMenu() {
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({ "mask": "+9(999)999-99-99", showMaskOnHover: false }).mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;
					$(this.parentElement).toggleClass('active');
					$(this.parentElement).find('.dd-content-js').slideToggle(function () {
						$(this).toggleClass('active');
					});

					// $(ChildHeads).each(function () {
					// 	if (this === clickedHead) {
					// 		//parent element gain toggle class, style head change via parent
					// 	}
					// 	else {
					// 		$(this.parentElement).removeClass('active');
					// 		$(this.parentElement).find('.dd-content-js').slideUp(function () {
					// 			$(this).removeClass('active');
					// 		});
					// 	}
					// });

				});
			}
		}
	},
	imgToSVG() {
		const convertImages = (query, callback) => {
			const images = document.querySelectorAll(query);

			images.forEach(image => {
				fetch(image.src)
					.then(res => res.text())
					.then(data => {
						const parser = new DOMParser();
						const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

						if (image.id) svg.id = image.id;
						if (image.className) svg.classList = image.classList;

						image.parentNode.replaceChild(svg, image);
					})
					.then(callback)
					.catch(error => console.error(error))
			});
		};

		convertImages('.img-svg-js');
	},
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.getCurrentYear('.currentYear');
	JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	
	const dataPickers = document.querySelectorAll('.data-picker-wrap');
	for (const dataPickerEll of dataPickers) {
		const dataPicker = dataPickerEll.querySelector('.data-picker--js');
		const dataPickerIcon = dataPickerEll.querySelector(`.data-picker ~ .icon`);
		
		new AirDatepicker(dataPicker, {
			autoClose: false,
			// inline: true,
			container: dataPickerEll,
			onShow() {
				dataPickerIcon.classList.add('active');
			},
			onHide() {
			dataPickerIcon.classList.remove('active');
		},
		navTitles: {
			days: 'yyyy <i>MMMM</i>',
		},
	});
}

	const selects = document.querySelectorAll('.js-choice');
	if (selects) {
		selects.forEach(choice => {
			let choices = new Choices(choice, {
				searchEnabled: false,
				searchChoices: false,
				itemSelectText: '',
				allowHTML: true,
				position: 'auto',
			});
		});
	}

	const textRemoveBtns = document.querySelectorAll('.remove-btn--js');
	const interestRemoveBtns = document.querySelector('.interest-btn--js');

	if (textRemoveBtns) {
		textRemoveBtns.forEach(textRemoveBtn => {
			let textRemoveInput = new Choices(textRemoveBtn,
				{
					placeholder: true,
					allowHTML: true,
					delimiter: ',',
					editItems: true,
					maxItemCount: 5,
					removeItemButton: true,
					itemSelectText: 'Нажмите, чтобы выбрать',
					noChoicesText: 'Больше вариантов нет',
					addItemText: (value) => {
						return `Нажмите Enter чтобы добавить <b>"${value}"</b>`;
					},
				}
			)
		});
	}

	if (interestRemoveBtns) {
		let interestRemoveInput = new Choices(interestRemoveBtns,
			{
				placeholder: true,
				placeholderValue: 'Интересы',
				allowHTML: true,
				delimiter: ',',
				editItems: true,
				maxItemCount: 5,
				removeItemButton: true,
				itemSelectText: 'Нажмите, чтобы выбрать',
				noChoicesText: 'Больше вариантов нет',
				addItemText: (value) => {
					return `Нажмите Enter чтобы добавить <b>"${value}"</b>`;
				},
			})
	}

	// Tooltip
	const tooltipButtons = document.querySelectorAll('.sForum__img-wrap');
	if (tooltipButtons) {
		tooltipButtons.forEach((btn) => {
			const tooltip = btn.nextElementSibling;
			const popperInstance = Popper.createPopper(btn, tooltip, {
				placement: 'right',
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, 8],
						},
					},
				],
			});
			function show() {
				tooltip.setAttribute('data-show', '');
				popperInstance.update();
			}

			function hide() {
				tooltip.removeAttribute('data-show');
			}

			const showEvents = ['mouseenter', 'focus'];
			const hideEvents = ['mouseleave', 'blur'];

			showEvents.forEach((event) => {
				btn.addEventListener(event, show);
			});

			hideEvents.forEach((event) => {
				btn.addEventListener(event, hide);
			});
		})
	}

	// Табы из селекта на странице запросов
	const requestTabs = document.querySelector('.sRequest__tabs');
	const selectTabsBtn = document.querySelectorAll('.tabs-option');
	const requestTabsBtn = document.querySelectorAll('.sRequest__tabs-btn');
	const tabsContent = document.querySelectorAll('.sRequest__tabs-content');
	



	if (requestTabs) {
		const select = document.querySelector(".tabs-caption-select");

		document.addEventListener('click', (e) => {
			let target = e.target.closest(".tabs-caption-select__head");
			let targetActive = e.target.closest(".tabs-caption-select.active");
			let targetBodyA = e.target.closest(".tabs-caption-select__body.active");
			if (!targetActive) {
				$(".tabs-caption-select").removeClass("active").find(".tabs-caption-select__body").removeClass("active")
			}
			if (target) { 
				$(target).parent().toggleClass("active").find(".tabs-caption-select__body").toggleClass("active")
			}
		})
		document.querySelector('.sRequest__tabs-caption').addEventListener('click', (e) => {
			const tab = e.target.closest('[data-tabs-path]');
			const tabsPath = e.target.dataset.tabsPath;
			const content = tab.innerHTML;
			// console.log(content);
			document.querySelector(".tabs-caption-select__head-content").innerHTML = content
			requestTabsBtn.forEach(el => { el.classList.remove('active') });
			tab.classList.add('active');
			tabsHandler(tabsPath);
		})
	}


	const tabsHandler = (path) => {
		tabsContent.forEach(el => { el.classList.remove('active') });
		document.querySelector(`[data-tabs-target="${path}"]`).classList.add('active');
	};
	// /Табы из селекта на странице запросов

	const TabsSlider = new Swiper(".tabs__slider--js", {
		slidesPerView: 'auto',
	});

	FilePond.registerPlugin(
		// encodes the file as base64 data
		FilePondPluginFileEncode,

		// validates the size of the file
		FilePondPluginFileValidateSize,

		// corrects mobile image orientation
		FilePondPluginImageExifOrientation,

		// previews dropped images
		FilePondPluginImagePreview,
		FilePondPluginImageCrop,
		FilePondPluginImageResize,
		FilePondPluginImageTransform,
		FilePondPluginImageEdit
	);
	FilePond.create(
		document.querySelector('.filepond'),
		{
			// labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
			labelIdle: `Перетащите свой файл или загрузите с компьютера`,
			labelMaxFileSizeExceeded: `Файл слишком большого размера`,
			labelMaxFileSize: `Максимальный размер - 10Мб`,
		}
	);
	FilePond.create(
		document.querySelector('.filepond-round'),
		{
			labelIdle: `Перетащиетe свой файл или&nbsp;загрузите с компьютера`,
			labelMaxFileSizeExceeded: `Файл слишком большого размера`,
			labelMaxFileSize: `Максимальный размер - 10Мб`,
			imagePreviewHeight: 128,
			imageCropAspectRatio: '1:1',
			imageResizeTargetWidth: 200,
			imageResizeTargetHeight: 200,
			stylePanelLayout: 'compact circle',
			styleLoadIndicatorPosition: 'center bottom',
			styleProgressIndicatorPosition: 'right bottom',
			styleButtonRemoveItemPosition: 'center bottom',
			styleButtonProcessItemPosition: 'right bottom',
		}
	);

	// Мобильный фильтр

	const mobFilterBtn = document.querySelector('.filter-btn');
	const filterWrap = document.querySelector('.filter-wrap')

	if (mobFilterBtn) {
		const menu = document.querySelector(mobFilterBtn.dataset.toggle);
		mobFilterBtn.addEventListener('click', function (event) {
			if (menu.classList.contains('active')) {
				menu.classList.remove('active')
				filterWrap.classList.remove('active')
				mobFilterBtn.classList.remove('active')
			} else if (!(menu.classList.contains('active'))) {
				menu.classList.add('active')
				filterWrap.classList.add('active')
				mobFilterBtn.classList.add('active')
				event._isOpen = true;
			}
		});
		// document.addEventListener('click', function (event) {
		// 	if (event.composedPath().includes(menu)) return;
		// 	if (!event._isOpen) {
		// 		menu.classList.remove('active')
		// 		filterWrap.classList.remove('active')
		// 		mobFilterBtn.classList.remove('active')
		// 	}
		// })
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 768) {
				filterWrap.classList.remove('active');
			} else {
				filterWrap.classList.add('active');
			}
		});
	}

	// / Мобильный фильтр

	// Дропдаун фильтра в каталоге

	const dropBtns = document.querySelectorAll('.network-filter__dropdown-btn');

	if (dropBtns) {
		dropBtns.forEach(btn => {
			btn.addEventListener('click', function (event) {
				let dropBody = document.getElementById(btn.dataset.toggle);
				if (dropBody.classList.contains('active')) {
					btn.classList.remove('active');
					dropBody.classList.remove('active');
				}
				else if (!(dropBody.classList.contains('active'))) {
					btn.classList.add('active');
					dropBody.classList.add('active');
					event._isOpen = true;
				}
				document.addEventListener('click', function (event) {
					if (event.composedPath().includes(dropBody)) return;
					if (!event._isOpen) {
						dropBody.classList.remove('active');
						btn.classList.remove('active');
					}
				});
			});
		});
	}

	// / Дропдаун фильтра в каталоге

	// Кнопка "подробнее" в карточках запросов контактов	
	const moreBtns = document.querySelectorAll('.profile-item__show-more');

	if (moreBtns) {
		moreBtns.forEach(btn => {
			btn.addEventListener('click', function (event) {
				let profileBody = btn.closest('.profile-item').querySelector('.profile-item__body');
				profileBody.classList.add('active');
				btn.hidden = true;
			});
		});
	}
	// / Кнопка "подробнее" в карточках запросов контактов

	// Мобильный фильтр в мероприятиях
	const eventsBtn = document.querySelector('.events-filter__btn--js');

	if (eventsBtn) {
		const eventsMenu = document.querySelector(eventsBtn.dataset.toggle);

		eventsBtn.addEventListener('click', function (event) {
			if (eventsMenu.classList.contains('active')) {
				eventsMenu.classList.remove('active')
				eventsBtn.classList.remove('active')
				return
			} else if (!(eventsMenu.classList.contains('active'))) {
				eventsMenu.classList.add('active')
				eventsBtn.classList.add('active')
				event._isOpen = true;
			}
		})

		document.addEventListener('click', function (event) {
			if (event.composedPath().includes(eventsMenu)) return;
			if (!event._isOpen) {
				eventsMenu.classList.remove('active')
				eventsBtn.classList.remove('active')
			}
		})
	}

	// /Мобильный фильтр в мероприятиях



	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true,
		freeMode: {
			enabled: true,
			sticky: true,
		},
	});

	const newsSwiper = new Swiper('.sNewsItem__slider--js', {
		...defaultSl
	})

	const mainPageItems = document.querySelectorAll('.sMainUnits__item');
	if (mainPageItems) {
		for (let mainItem of mainPageItems) {
			const mainItemSlider = new Swiper(mainItem.querySelector('.swiper'), {
				slidesPerView: 'auto',
				navigation: {
					nextEl: mainItem.querySelector('.swiper-button-next'),
					prevEl: mainItem.querySelector('.swiper-button-prev'),
				},
			});
		}
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	let thanx = document.querySelector('.thanx');
	if (thanx) {
		document.querySelector('.thanx__btn').addEventListener('click', function () {
			thanx.classList.remove('active');
		});
	};
	// modal window
	document.addEventListener('click', function (event) {
		let targetToggleActive = event.target.closest('.toggle-contact-js.active');
		let targetDropdownActive = event.target.closest(`.dropdown-contact-js.active`);
		let toggleActive = $('.toggle-contact-js');
		let dropdownActive = $(`.dropdown-contact-js`);
		// console.log(toggleActive);
		// console.log(dropdownActive);
		if (!targetToggleActive && !targetDropdownActive) {
			dropdownActive.removeClass('active');
			toggleActive.removeClass('active');
		};
		let toggle = event.target.closest('.toggle-contact-js');
		if (toggle) {
			let dropdown = document.querySelector(toggle.dataset.id);
			dropdown.classList.toggle('active');
			toggle.classList.toggle('active');
		};
	});

	AOS.init({
		disable: 'mobile',
		// offset: 200,
		once: true, 
		duration: 600,
		easing: 'ease-in-out-cubic',
		// delay: 100,
	});


	$(".сustom-select-js").select2({
		tags: true,
		tokenSeparators: [',', ' ']
	});

	$('.сustom-select-js').on('select2:opening select2:closing', function (event) {
		var $searchfield = $(this).parent().find('.select2-search__field');
		$searchfield.prop('disabled', true);
	});
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }