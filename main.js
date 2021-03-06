$(document).ready(function() {
	$.getJSON('item.json', function(data){
		var items = '';
		$.each(data.data, function(key, val) {
			items += '<img class=draggable style=display:inline;float:left;z-index:100; height=48px width=48px src=Images/item/' + val.image.full +' id=' + key + ' />';
			var itemname = ('#' + key);
		});
		$('#items').html(items);
		$(function() {
			$(".draggable").draggable({ 
  				containment: '#MidSection',
  				scroll: false,
  				revert: 'invalid',
  				helper: 'clone'
			});
			$('.droppable').droppable({
				accept: '.draggable',
 				activeClass: "ui-state-highlight",
      			drop: function( event, ui ) {
      				var output = '<img height=48px width=48px class=clonedraggable src=' + $(ui.draggable).attr('src') + '>';
      		 	 	$(event.target).html(output);
      			}	
			});
			$('.droppable').click(function(event) {
				$(event.target).remove();
			});
		});
	});
	var userChampion;
	var user;
	$(".pop").hide();
	$(".ChampSelect").click(function() {
		$(".pop").show();
		$.getJSON("championFull.json", function(data) {
			var output = '<ul style=list-style:none;margin-left:-70>';
			$.each(data.data, function(key, val) {
				output += '<li style=display:inline;float:left;height:10%;width:10%;>';
				output += '<img src='+'Images/champion/'+val.image.full+' id=' + val.id + ' style=name:'+ val.name + ';>';
				output += '</li>';
			});
			output += '</ul>';
			$('.modal').html(output);
			$('ul').click(function(event) {
				var name = event.target.id;
				user = 'champion/' + event.target.id + '.json';
				$.getJSON(user, function(data) {

					$(".pop").hide();
					$('#ChampName').html(data.name);
					var path = 'Images/champion/' + name + '.png';
					$('#ChampImage').attr('src', path);
					$('#ChampMana').html(data.stats.mp);
					$('#ChampHealth').html(data.stats.hp);
					$('#ChampHPRegen').html(data.stats.hpregen);
					$('#ChampManaRegen').html(data.stats.mpregen);
					$('#ChampArmorPenetration').html('0 | 0%');
					$('#ChampMagicPenetration').html('0 | 0%');
					$('#ChampCriticalDamage').html(200);
					$('#ChampCriticalChance').html(0);
					$('#ChampSpellVamp').html(0);
					$('#ChampLifeSteal').html(0);
					$('#ChampCooldownReduction').html(0);
					$('#ChampAbilityPower').html(0);
					$('#ChampAttackDamage').html(data.stats.attackdamage);
					$('#ChampAttackSpeed').html(parseFloat(Math.round((0.625/(1 + parseFloat(data.stats.attackspeedoffset)))*1000)/1000).toFixed(3));
					$('#ChampArmor').html(data.stats.armor);
					$('#ChampMagicResist').html(data.stats.spellblock);
					$('#ChampRange').html(data.stats.attackrange);
					$('#ChampMovementSpeed').html(data.stats.movespeed);
					$('#userSlider').foundation('slider', 'set_value', 1);
				});
			}); 
		});
	});
	var oppChampion;
	var opp;	
	$(".OppSelect").click(function() {
		$(".pop").show();
		$.getJSON("championFull.json", function(data) {
			var output = '<ul style=list-style:none;>';
			$.each(data.data, function(key, val) {
				output += '<li style=display:inline;float:left;height:10%;width:10%;>';
				output += '<img src='+'Images/champion/'+val.image.full+' id=' + val.id + ' />';
				output += '</li>';
			});
			output += '</ul>';
			$('.modal').html(output);
			$('ul').click(function(event) {
				var name = event.target.id;
				opp = 'champion/' + event.target.id + '.json';
				$.getJSON(opp, function(data) {

					$(".pop").hide();
					$('#OppName').html(data.name);
					var path = 'Images/champion/' + name + '.png';
					$('#OppImage').attr('src', path);
					$('#OppMana').html(data.stats.mp);
					$('#OppHealth').html(data.stats.hp);
					$('#OppHPRegen').html(data.stats.hpregen);
					$('#OppManaRegen').html(data.stats.mpregen);
					$('#OppArmorPenetration').html('0 | 0%');
					$('#OppMagicPenetration').html('0 | 0%');
					$('#OppCriticalDamage').html(200);
					$('#OppCriticalChance').html(0);
					$('#OppSpellVamp').html(0);
					$('#OppLifeSteal').html(0);
					$('#OppCooldownReduction').html(0);
					$('#OppAbilityPower').html(0);
					$('#OppAttackDamage').html(data.stats.attackdamage);
					$('#OppAttackSpeed').html(parseFloat(Math.round((0.625/(1 + parseFloat(data.stats.attackspeedoffset)))*1000)/1000).toFixed(3));
					$('#OppArmor').html(data.stats.armor);
					$('#OppMagicResist').html(data.stats.spellblock);
					$('#OppRange').html(data.stats.attackrange);
					$('#OppMovementSpeed').html(data.stats.movespeed);
					$('#oppSlider').foundation('slider', 'set_value', 1);	
				});
			});
		});
	});
	$('#boxclose').click(function() {
		$('.pop').hide()
	});
	$('#userSlider').change(function(){
		var level = parseInt($('#userSlider input').val());
		var name = 'champion/' + $('#ChampName').html() + '.json';
		$.getJSON(name, function(data) {
			$('#ChampHealth').html((parseFloat(data.stats.hp) + (parseFloat(data.stats.hpperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
			$('#ChampMana').html((parseFloat(data.stats.mp) + (parseFloat(data.stats.mpperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
			$('#ChampHPRegen').html((parseFloat(data.stats.hpregen) + (parseFloat(data.stats.hpregenperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
			$('#ChampManaRegen').html((parseFloat(data.stats.mpregen) + (parseFloat(data.stats.mpregenperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
			$('#ChampAttackDamage').html((parseFloat(data.stats.attackdamage) + (parseFloat(data.stats.attackdamageperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
			$('#ChampAttackSpeed').html((parseFloat(Math.round((0.625/(1 + parseFloat(data.stats.attackspeedoffset)))*1000)/1000) * (1 + (((parseFloat(data.stats.attackspeedperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))) / 100))).toFixed(3));
			$('#ChampArmor').html((parseFloat(data.stats.armor) + (parseFloat(data.stats.armorperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
			$('#ChampMagicResist').html((parseFloat(data.stats.spellblock) + (parseFloat(data.stats.spellblockperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
		})
	});	
	$('#oppSlider').change(function(){
		var level = parseInt($('#oppSlider input').val());
		var name = 'champion/' + $('#OppName').html() + '.json';
		$.getJSON(name, function(data) {

			$('#OppHealth').html((parseFloat(data.stats.hp) + (parseFloat(data.stats.hpperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
			$('#OppMana').html((parseFloat(data.stats.mp) + (parseFloat(data.stats.mpperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
			$('#OppHPRegen').html((parseFloat(data.stats.hpregen) + (parseFloat(data.stats.hpregenperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
			$('#OppManaRegen').html((parseFloat(data.stats.mpregen) + (parseFloat(data.stats.mpregenperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
			$('#OppAttackDamage').html((parseFloat(data.stats.attackdamage) + (parseFloat(data.stats.attackdamageperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
			$('#OppAttackSpeed').html((parseFloat(Math.round((0.625/(1 + parseFloat(data.stats.attackspeedoffset)))*1000)/1000) * (1 + (((parseFloat(data.stats.attackspeedperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))) / 100))).toFixed(3));
			$('#OppArmor').html((parseFloat(data.stats.armor) + (parseFloat(data.stats.armorperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
			$('#OppMagicResist').html((parseFloat(data.stats.spellblock) + (parseFloat(data.stats.spellblockperlevel) * ((7/400) * ((Math.pow(level, 2))) + ((267 * level)/400) - (137/200)))).toFixed(2));
		});
	});
	$('#calculate').click(function() {
		if ($('#OppHealth').html().length > 0 && $('#ChampHealth').html().length > 0) {
			var damageReduction = (100.0 / (100.0 + parseFloat($('#OppArmor').html())));
			var rawDPS = parseFloat($('#ChampAttackDamage').html()) * parseFloat($('#ChampAttackSpeed').html());
			var DPS = rawDPS * damageReduction - (parseFloat($('#OppHPRegen').html())/5.0);
			var time = parseFloat($('#OppHealth').html()) / DPS;
			var hits = parseFloat(time) * parseFloat($('#ChampAttackSpeed').html());

			$('#dps').html(DPS.toFixed(2));
			$('#time').html(time.toFixed(2));
			$('#hits').html(Math.ceil(hits));	
		}
	});
	$(function() {

	})
});
