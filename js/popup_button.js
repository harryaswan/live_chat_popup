var Req = {
	get: function(url, data, isJSON) {
		return this.raw('GET', url, data, isJSON);
	},
	post: function() {
		return this.raw('POST', url, data, isJSON);
	},
	delete: function() {
		return this.raw('DELETE', url, data, isJSON);
	},
	raw: function(_type, url, data, isJSON) {
		_type = _type.toUpperCase();
		var type;
		if (['GET', 'POST', 'DELETE'].indexOf(_type) !== -1) {
			type = _type;
		} else {
			type = 'GET';
		}
	
		if (!data) data = {};
		if (!isJSON) isJSON = false;
		return new Promise((resolve, reject) => {
			var r = new XMLHttpRequest();
			r.onload = () => {
				if (r.status === 200) {
					let t = r.responseText;
					if (t === '') {
						resolve(t);
					} else {
						if (isJSON) {
							resolve(JSON.parse(t));
						} else {
							resolve(t);
						}
					}
				} else {
					reject(r.status);
				}
			}
			r.open(type, url);
			if (type !== 'GET') {
				r.setRequestHeader('Content-Type', 'application/json');
			}
			if (data) {
				data = JSON.stringify(data);
			}
			r.send(data);
		});
	}
};


Function.prototype.clone = function() {
    var c = this;
    if(this.__isClone) {c = this.__clonedFrom;}
    var t = function() { return cloneObj.apply(this, arguments); };
    for(var key in this) {t[key] = this[key];}
    t.__isClone = true;
    t.__clonedFrom = c;
    return t;
};

if (window.onload !== null || window.onload !== undefined) {
	let win_load = window.onload.clone();
	window.onload = () => {
		setTimeout(win_load, 0);
		setTimeout(function() { (new PopupButton).setup() }, 0);
	}
} else {
	window.onload = startUp;
}

var PopupButton = function (text) {
	this.buttonText = text || "Click Me";
	this.container = null;
}

PopupButton.prototype = {
	setup: function() {
		let button_css = ".magic_button { position: absolute; right: 100px; bottom: 100px; } .magic_button button { position: absolute; right: 0px; bottom: 0px; } .popup_hidden { display: none; }";
		let body = document.querySelector('body');
		this.container = document.createElement('div');
		let button = document.createElement('button');
		let style = document.createElement('style');

		button.innerHTML = this.buttonText;

		button.onclick = this.toggle.bind(this);

		this.container.setAttribute('class', 'magic_button');

		style.type = 'text/css';
		if (style.styleSheet){
		  style.styleSheet.cssText = button_css;
		} else {
		  style.appendChild(document.createTextNode(button_css));
		}

		this.container.appendChild(button);

		body.appendChild(this.container);
		body.appendChild(style);
	},
	createButton: function() {
	
	},
	toggle: function() {
		var popup = this.container.querySelector('#popup_window') // Get the div 

		if (!popup) {
			Req.get('popup.html', null, null)
			.then((html) => {
				let h = document.createElement('div');
				h.setAttribute('id', 'popup_window');
				h.innerHTML = html;
				this.container.insertBefore(h, this.container.childNodes[0]);
			})
			.catch(console.warning);
		} else {
			popup.classList.toggle('popup_hidden');
		}
	}
}