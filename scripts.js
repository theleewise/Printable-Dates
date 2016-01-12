function addFields(){
	this.fieldCount = 0;
	this.monthNames = ['January','Feburary','March','April','May','June','July','August','September','October','November','December'];
	this.yearMin = -100;
	this.yearMax = +5;
	this.today = new Date();
	this.vals = {};
	this.nameField = function(){
		return '<input type="text" class="name" id="input-name-'+this.fieldCount+'" />';
	}
	this.monthField = function(){
		var markup = '<select class="month" id="input-month-'+this.fieldCount+'">';
		for(var i = 0; i < 12; i++){
			markup += '<option value="'+i+'">'+this.monthNames[i]+'</option>';
		}
		markup += '</select>';
		return markup;
	}
	this.dayField = function(){
		var markup = '<select class="day" id="input-day-'+this.fieldCount+'">'
		for(var i = 1; i <= 31; i++){
			markup += '<option value="'+(i)+'">'+i+'</option>';
		}
		markup += '</select>';
		return markup;
	}
	this.yearField = function(){
		var todayYear = this.today.getFullYear();
		var start = this.today.getFullYear() + this.yearMin;
		var end = this.today.getFullYear() + this.yearMax;
		var markup = '<select class="year" id="input-year-'+this.fieldCount+'">'
		for(var i = start; i <= end; i++){
			var selected = (i === todayYear ) ? ' selected="selected"' : '';
			markup += '<option value="'+(i)+'"'+selected+'>'+i+'</option>';
		}
		markup += '</select>';
		return markup;
	}
	this.allFields = function(){
		return '' + this.nameField() + this.monthField() + this.dayField() + this.yearField();
	}
	this.updateVals = function(){
		this.vals.name = document.getElementById('input-name-'+this.fieldCount).value;
		this.vals.date = new Date(
			document.getElementById('input-year-'+this.fieldCount).value,
			document.getElementById('input-month-'+this.fieldCount).value,
			document.getElementById('input-day-'+this.fieldCount).value
		);
	}
}

function addRow(){
	var input = $('#input');	
	var ok = new addFields();
	ok.fieldCount = fieldCount;
	input.append( $('<div class="item-'+ok.fieldCount+'"">'+ok.allFields()+'</div>') );
	ok.updateVals();
	addDateToArea(ok);
	$('#input-name-'+ok.fieldCount).keyup(function(){ ok.updateVals(); addDateToArea(ok); });
	$('.month, .day, .year','.item-'+ok.fieldCount).change(function(){ ok.updateVals(); addDateToArea(ok); });

	fieldCount++;
	if(fieldCount>6){ $('#add-row').hide(); }
}

function addDateToArea(item){
	var area = $('#area');
	var $item = $('#display-item-'+item.fieldCount,area);
	var formatedDate = ("0" + (item.vals.date.getMonth() + 1)).slice(-2)+'/'+
		("0" + item.vals.date.getDate()).slice(-2)+'/'+
		item.vals.date.getFullYear()
	;
	var vals = '<div id="display-date-'+item.fieldCount+'" class="date">'+formatedDate+'</div><div id="display-name-'+item.fieldCount+'" class="name">'+item.vals.name+'</div>';
	if( $item.length ){
		$('.wrapper',$item).html(vals);
	}
	else {
		area.append('<div id="display-item-'+item.fieldCount+'" class="display-item"><div class="wrapper">'+vals+'</div></div>');
	}
	$('.display-item','#area').css({
		'padding':function(){
			var count = $('.display-item','#area').length;
			return ( ( ( ( $('#area').height() ) / count ) - 100 ) / 2 ) + 'px ' + 0 + 'px';
		}
	});
}

var fieldCount = 1;

$(window).ready(function(){
	addRow();
	$('#add-row').on('click',addRow);
	$('#print').on('click',function(){ window.print(); });
});

// Resize Wait
var rtime;
var timeout = false;
var delta = 200;
$(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});