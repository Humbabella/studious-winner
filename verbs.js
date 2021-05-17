parser.verbs = {

	connect: {},
	console: {}
	c: {shortcut: console
	examine: {
		default: function (thing) {
			if (typeof(thing)=='undefined') log.add('What should I look at?');
			else log.add(thing.desc)
		}
	},
	i: {shortcut: 'inventory'},
	inventory: {
		default: function () {
			var list = '';
			for (var i in places.inventory.things) list += things[i].short_name + '<br>';
			if (list.length == 0) list = 'Nothing';
			log.add('You are carrying:<br>' + list);
		}
	},
	l: {shortcut: 'look'},
	look: {
		default: function () {
			log.add(places[you.place].desc);
			var things_here = '';
			for (var i in places[you.place].things) if (!things[i].dont_list) things_here += things[i].short_name + '<br>';
			if (things_here.length > 0) log.add('Things you see: <br>' + things_here)
		}
	},
	look_at: {shortcut: 'examine'},
	lift: {},
	move: {},
	open: {},
	press: {},
	pull: {},
	push: {},
	put: {},
	slide: {},
	take: {
		default: function (thing) {
			if (thing.immovable) {
				log.add('You can\'t take that.')
			} else {
				parser.put(thing.id, 'inventory');
			}
		}
	},		
	x: {shortcut: 'examine'},
	wear: {
		default: function () { //Default wear function
		}
	}
}