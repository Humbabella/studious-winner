things = {
	white_room_floor: {
		short_name: 'floor',
		desc: 'At first glance the floor is made of uniform white panels, but you notice that two of the panels near one end of the room are half-sized.',
		triggers: {
			examine: ['place white_room_small_panels start']
		},
		nouns: {floor:1},
		adjectives: {white:1},
		dont_list: true,
		immovable: 1
	},
	white_room_open_floor: {
		short_name: 'floor',
		desc: 'The floor is made of uniform white panels.',
		nouns: {floor: 1},
		adjectives: {white: 1},
		dont_list: true,
		immovable: 1
	},
	white_room_walls: {
		short_name: 'walls',
		desc: 'The walls are made of uniform white panels.',
		nouns: {wall:1, walls:1},
		adjectives: {white:1},
		dont_list: true,
		immovable: 1
	},
	white_room_ceiling: {
		short_name: 'ceiling',
		desc: 'The ceilling is made of uniform white panels.',
		nouns: {ceiling:1},
		adjectives: {white:1},
		dont_list: true,
		immovable: 1
	},
	white_room_panels: {
		short_name: 'panels',
		desc: 'The panels making up the walls, ceiling and floor of the room appear uniform at first, but you notice that two of the panels near one end of the room are half-sized.',
		triggers: {
			examine: ['place white_room_small_panels start']
		},
		nouns: {panel:1, panels:1},
		adjectives: {white:1, large:1},
		dont_list: true,
		immovable: 1
	},
	white_room_open_panels: {
		short_name: 'panels',
		desc: 'The panels making up the walls, ceiling and floor of the room are uniform and white.',
		nouns: {panel: 1, panels: 1},
		adjectives: {white: 1},
		dont_list: true,
		immovable :1
	},
	white_room_small_panels: {
		short_name: 'small panels',
		nouns: {panel: 1, panels: 1},
		adjectives: {white: 1, small:1, "half-sized": 1, half: 1},
		intro: 'Two of the panels in the floor are smaller than the others.',
		desc: 'The edges of the small panels seem to go into the surrounding panels as if they fit inside them.',
		triggers: {
			push: ['message white_room_small_panels open', 'replace white_room_small_panels sunken_pedestal', 'replace white_room_floor white_room_open_floor', 'replace white_room_panels white_room_open_panels'],
			slide: 'push',
			open: 'push',
			move: 'push'
		},
		messages: {
			open: 'The small panels slide open, revealing a sunken area with a pedestal.'
		},
		immovable: 1
	},
	sunken_pedestal: {
		short_name: 'pedestal',
		nouns: {pedestal: 1},
		adjectives: {white: 1, small: 1},
		intro: 'In a sunken area in the floor there is a pedestal.',
		desc: 'The pedestal rests on a platform a few feet below the floor. The ambient light does not extend to the sunken area and it is heavily shadowed. It looks like you could easily hold the side of the pedestal.',
		triggers: {
			pull: ['place loose_console start', 'message sunken_pedestal pull', 'replace sunken_pedestal pedestal'],
			lift: 'pull'
		},
		messages: {
			pull: 'The pedestal lifts easily as if the platform beneath it is on some kind of rollers. When the platform is level with the floor is clicks into place. You notice that beside the pedestal on the platform is a metal cosnole.',
		},
		immovable: 1
	},
	pedestal: {
		short_name: 'pedestal',
		nouns: {pedestal: 1},
		adjectives: {white: 1, small: 1},
		intro: 'A pedestal is near one of the walls.',
		desc: 'A waist-high pedestal with four metal connectors on it.',
		triggers: {
			examine: ['place pedestal_connectors start'],
			connect_to_console: ['message pedestal connect', 'destroy loose_console', 'replace pedestal console'],
		},
		messages: {
			pull: 'The pedestal lifts easily as if the platform beneath it is on some kind of rollers. When the platform is level with the floor is clicks into place. You notice that beside the pedestal on the platform is a metal cosnole.',
			connect: 'The console clicks into place on the top of the pedestal and a whirring sound comes from inside it.'
		},
		immovable: 1
	},
	pedestal_connectors: {
		part_of: 'loose_console',
		short_name: 'pedestal connectors',
		nouns: {connector: 1, connectors: 1},
		dont_list: true,
		desc: 'Four metal connectors look like they would click easily into matching ones on another object.',
		immovable: 1
	},
	dead_console_button: {
		part_of: 'loose_console',
		short_name: 'button',
		nouns: {button: 1},
		adjectives: {},
		dont_list: true,
		desc: 'A button on the top of the console.',
		triggers: {
			push: ['message dead_console_button push'],
			press: 'push'
		},
		messages: {
			push: 'Nothing happens when you push the button.'
		}
	},
	console_button: {
		part_of: 'console',
		short_name: 'button',
		nouns: {button: 1},
		adjectives: {},
		dont_list: true,
		desc: 'A button on top of the console.',
		triggers: {
			push: ['message console_button push'],
			press: 'push',
		},
		messages: {
			push: 'Examine the console instead.'
		}
	},
	console_counter: {
		part_of: 'loose_console',
		short_name: 'counter',
		nouns: {counter: 1},
		adjectives: {digital: 1},
		dont_list: true,
		desc: 'There is a counter on one face of the box. It is not displaying anything.',
	},
	loose_console: {
		short_name: 'metal box',
		nouns: {console: 1, rectangle: 1, box: 1},
		adjectives: {metal: 1, loose: 1},
		listing: 'There is a metal rectangle on the floor beside the pedestal.',
		desc: 'This is a metal rectangle a couple of feet wide and a foot and a half deep. On one face it has a button in one corner and a digital counter in the other. On the reverse there are four metal connectors.',
		triggers: {
			put_on_pedestal: ['message pedestal connect', 'destroy loose_console', 'replace pedestal console'],
			connect_to_pedestal: 'put_on_pedestal'
		}
	},
	console: {
		short_name: 'console',
		nouns: {console: 1},
		listing: 'There is a metal console on a pedestal at one end of the room.',
		desc: 'This is a metal console with controls on top of it. You can access the console by using the command "console" or "c".',
		triggers: {
			examine: ['console']
		}
	}
	
	
};


for (var i in things) {
	things[i].id = i;
	for (var j in things[i].nouns) {
		if (!parser.nouns[j]) parser.nouns[j] = [];
		parser.nouns[j].push(things[i]);
	}
	for (var j in things[i].adjectives) {
		parser.adjectives[j] = 1
	}
}
		
