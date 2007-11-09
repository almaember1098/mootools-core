/*
Script: Window.DomReady.js
	Contains the custom domready window event.

License:
	MIT-style license.

Credits:
	Dean Edwards, Matthias Miller, John Resig. Remastered for MooTools.
*/

Element.Events.domready = {

	onAdd: function(fn){
		if ($type(this) == 'element') return;
		if (Browser.loaded){
			fn.call(this);
			return;
		}
		var self = this;
		var domReady = function(){
			if (!arguments.callee.done){
				arguments.callee.done = true;
				fn.call(self);
			};
			return true;
		};
		var check = function(context){
			if ((Browser.Engine.webkit ? ['loaded', 'complete'] : 'complete').contains(context.readyState)) return domReady();
			return false;
		};
		if (this.document.readyState && Browser.Engine.webkit){
			(function(){
				if (!check(self.document)) arguments.callee.delay(50);
			})();
		} else if (this.document.readyState && Browser.Engine.trident){
			var script = $('ie_domready');
			if (!script){
				var src = (this.location.protocol == 'https:') ? '//:' : 'javascript:void(0)';
				this.document.write('<script id="ie_domready" defer src="' + src + '"><\/script>');
				script = $('ie_domready');
			}
			if (!check(script)) script.addEvent('readystatechange', check.pass(script));
		} else {
			this.addEvent('load', domReady);
			this.document.addEvent('DOMContentLoaded', domReady);
		}
	}

};

window.addEvent('domready', function(){
	Browser.loaded = true;
});
