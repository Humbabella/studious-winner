log_html = HL.new_html('div', document.body, 'game_log');

log = {};
	
log.lines = [];
	
log.max_lines = 50;

log.text = '';

log.add = function (text) {
	
	log.text += '<p class=\'log_line\'>' + text + '</p>';
	
	log_html.innerHTML = log.text;
	
	log_html.scrollTop = log_html.scrollHeight;
	
}