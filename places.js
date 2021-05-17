places = {

	inventory: {
		things: {}
	},
	start: {
		name: 'White room',
		desc: 'You are in a large room. The walls, floor and ceiling are made of white panels. The room is lit with ambient light with no obvious source.',
		things: {white_room_floor: 1, white_room_ceiling: 1, white_room_walls: 1, white_room_panels: 1}
	}

}

for (var i in places) {
	
	for (var j in places[i].things) {
		
		things[j].where = i
		
	}
	
}

you = {place: 'start'}

