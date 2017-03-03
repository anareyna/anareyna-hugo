var App = (() =>  {
	var st = {
			body: "body",
			header: ".l-header",
			ftImg: ".u-ftImg",
			iconHeaderMenu: ".l-header__icon"
		},
		dom = {},
		catchDom = () => {
			dom.body = $(st.body);
			dom.header = $(st.header);
			dom.ftImg = $(st.ftImg);
			dom.iconHeaderMenu = $(st.iconHeaderMenu);
		},
		subscribeEvents = () => {
			$(window).scroll(events.fixHeader)
			dom.iconHeaderMenu.on("click", events.toggleMenu)
		},
		events = {
			fixHeader() {
				if ( $(this).scrollTop() > 200 ) {
					dom.header.addClass("is-fixed")
				} else {
					dom.header.removeClass("is-fixed")
				}
			},
			toggleMenu() {
				dom.header.toggleClass("has-dropdown")
			}

		},
		functions = {
			bgCheck() {
				BackgroundCheck.init({
					targets: st.header,
					images: st.ftImg,
					maxDuration: 1000
				});
			}

		},
		initialize = () => {
			catchDom();
			subscribeEvents();
			functions.bgCheck();
		};
	return {
		init: initialize
	};
})();
App.init();
