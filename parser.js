parser = {}

parser.nouns = {}
parser.verbs = {}
parser.adjectives = {}
parser.prepositions = {at: 1, to: 1, on: 1}

input_html = HL.new_html('div', document.body, 'input_field');
draw_input = function () {
	input_html.innerHTML = "> " + input_line
}

input_line = "";
draw_input();

key_reader = function (e) {

	if (e.key == 'Backspace' && input_line.length > 0) input_line = input_line.slice(0,-1);
	if (e.key == 'Enter') parser.parse();
	if (e.key.length == 1) input_line += e.key;
	draw_input();
	
}

parser.parse = function () {

	var in_words = input_line.split(' ');
	input_line = '';
	
	var verb = '', f_prep = '', obj_verb = '', prep = '', obj_prep = '';
	
	verb = in_words.shift();
		
	if (parser.prepositions[in_words[0]]) {
		verb = verb + '_' + in_words.shift();
	}
	
	if (!parser.verbs[verb]) {
		log.add("I don't know that verb");
		return false
	}
	if (parser.verbs[verb].shortcut) verb = parser.verbs[verb].shortcut;
	
	if (in_words.length == 0) {
		parser.execute(verb);
		return;
	}
	
	var g = parser.get_noun(in_words);
	if (g.error) return false;
	
	in_words = g.line;
	obj_verb = g.thing;
	
	if (in_words.length == 0) {
		parser.execute(verb, obj_verb);
		return
	}
	
	prep = in_words.shift();
	if (!parser.prepositions[prep]) {
		log.add('I don\'t know that preposition')
	}
	
	g = parser.get_noun(in_words);
	if (g.error) return false;
	
	obj_prep = g.thing;

	if (in_words.length == 0) {
		parser.execute(verb, obj_verb, prep, obj_prep);
	}
	
}

parser.execute = function (verb, obj_verb, prep, obj_prep) {
	
	// Do default verb stuff
	
	if (parser.verbs[verb].default) parser.verbs[verb].default (obj_verb, prep, obj_prep);

	if (obj_verb && obj_verb.triggers) {
		if (obj_verb.triggers[verb]) parser.do_trigger(obj_verb.id, verb);
		if (prep) {
			var verb_prep = verb + '_' + prep + '_' + obj_prep.id;
			if (obj_verb.triggers[verb_prep]) parser.do_trigger(obj_verb.id, verb_prep);
		}
	}
	
}

parser.do_trigger = function (id, label) {
	
	var command = things[id].triggers[label];
	
	if (typeof(command) == 'string') command = things[id].triggers[command];
	
	for (var i = 0; i < command.length; i++) {
		
		words = command[i].split(' ');
		
		if (words[0] == 'message') log.add(things[words[1]].messages[words[2]]);
		if (words[0] == 'destroy') parser.remove(words[1]);
		if (words[0] == 'replace') parser.replace(words[1], words[2]);
		if (words[0] == 'unhide') parser.unhide(words[1]);
		if (words[0] == 'place') parser.put(words[1], words[2]);
		
	}
	
}

parser.remove = function (id) {
	
	delete places[things[id].where].things[id];
	things[id].where = false;
	
}

parser.put = function (id, where) {
	
	if (things[id].where) parser.remove (id);
	places[where].things[id] = 1;
	things[id].where = where;
	
}

parser.replace = function (id1, id2) {
	
	parser.put (id2, things[id1].where);
	parser.remove (id1)
	
}

parser.unhide = function (id) {
	
	things[id].hidden = false;
	things[id].next_intro = true

}

parser.get_noun = function (line) {
	
	var adjective_list = [];
	var noun = '';
	
	while (parser.adjectives[line[0]]) adjective_list.push(line.shift());
	
	noun = line.shift();
	
	if (!parser.nouns[noun]) {
		log.add('I didn\'t know that noun');
		return {thing: false, line: line, error: true};
	}
	
	var things_list = HL.d(parser.nouns[noun]);
	
	var i = 0;
	
	while (things_list[i]) {
		var remove = false;
		for (var j = 0; j < adjective_list.length; j++) if (!things_list[i].adjectives[adjective_list[j]]) remove = true;
		
		var present_test = things_list[i];
		if (present_test.part_of) present_test = things[present_test.part_of];
		if (present_test.inside) present_test = things[present_test.inside];
		
		if (present_test.where != 'inventory' && present_test.where != you.place) remove = true;
		
		if (things_list[i].hidden) remove = true;
		
		if (remove) things_list.splice(i, 1);
		else i++
	}
	
	if (things_list.length==0) {
		log.add('I didn\'t see that here');
		return {thing: false, line: line, error: true};
	} else if (things_list.length == 1) {
		return {thing: things_list[0], line: line, error: false};
	} else {
		log.add('Which '+noun+' do you mean?');
		return {thing: false, line: line, error: true};
	}
	
}	
			

document.addEventListener("keydown", key_reader)
