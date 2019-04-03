// ============ Not Just the Men, But the Women and Children too =================

var character = {
    name: "",
    health: 0,
    attack: 0,
    defense: 0,
    faction: "",
    kills: 0,
    status: "pending",

    combat: function( defender ) {
        function attackChar (attacker, defender) {
            defender.health = defender.health - attacker.attack;
            attacker.attack = attacker.attack + Math.floor((Math.random()*12) + 0);
        }

        function defendChar ( attacker , defender ) {
            if (attacker.faction === defender.faction) {
                attacker.health = attacker.health - (defender.defense/2);
            }
            else {
                attacker.health = attacker.health - defender.defense;
            }
        }

        attackChar(this, defender);
        defendChar(this, defender);
        
        if (defender.health < 1) {
            this.kills++;
            defender.death();
        }
    },

    create: function () {
        var charBut = $("<button>");
            charBut.addClass("character-button character character-button-color");
            charBut.attr("char-name", this.name);
            charBut.append("<span>" + this.name+ "</span>");

            switch(this.name) {
                case "Obi-Wan Kenobi":
                charBut.css("background", "url(assets/images/kenobi.jpg)");
                break;

                case "Luke Skywalker":
                charBut.css("background", "url(assets/images/skywalker.jpg)");
                break;

                case "Darth Sidious":
                charBut.css("background", "url(assets/images/sidious.jpg)");
                break;

                case "Darth Maul":
                charBut.css("background", "url(assets/images/maul.jpg)");
                break;

                default:
                break;
            };

        charBut.css("background-size", "cover");
        $( "#char-selection" ).prepend(charBut);

        if ( this.fodder === true ) {
            charBut.addClass("defender");
        }
    },

    death: function () {
        console.log(this.name + "has passed away in a blaze of glory");

        $("#char-defender-stats").removeClass("food");
    
        $(".food").detach().appendTo("#graveyard");
        $(".food").removeClass("food");

        this.status = "banthaFodder"
        selectFood = false;
    }

};

function writeCombatStats ( hero, food ) {
    $("#char-attacker-stats").empty();
    $("#char-defender-stats").empty();

    if (selectHero) { 
        $("#char-attacker-stats").append("<p class= 'char-attacker-stats char-attacker-health'>Health   : " + hero.health + "</p>");
        $("#char-attacker-stats").append("<p class= 'char-attacker-stats char-attacker-Attack'>Attack   : " + hero.attack + "</p>");
        $("#char-attacker-stats").append("<p class= 'char-attacker-stats char-attacker-Defense'>Defense   : " + hero.defense + "</p>");
    }
    if (selectFood) {
        $("#char-defender-stats").append("<p class= 'char-defender-stats char-defender-health'>Health   : " + food.health + "</p>");
        $("#char-defender-stats").append("<p class= 'char-defender-stats char-defender-Attack'>Attack   : " + food.attack + "</p>");
        $("#char-defender-stats").append("<p class= 'char-defender-stats char-defender-Defense'>Defense   : " + food.defense + "</p>");
    }
}

function generateCharacter ( character , index ) {
    switch (index) {
        case 0: 
        character.name = "Obi-Wan Kenobi";
        character.faction = "jedi";
        break;

        case 1:
        character.name = "Luke Skywalker";
        character.faction = "jedi";
        break;
    
        case 2:
        sidious.name = "Darth Sidious";
        sidious.faction = "sith";
        break;

        case 3:
        maul.name = "Darth Maul";
        maul.faction = "sith";
        break;
        
        default:
        break;
    }

    character.health = 120;
    character.attack = 10;
    character.defense = 12;
    character.status = "pending";
    character.kills = 0;
}

// ============ Character Initialization =================
var kenobi = Object.assign({}, character);
var skywalker = Object.assign({}, character);
var sidious = Object.assign({}, character);
var maul = Object.assign({}, character);

var characters = [kenobi, skywalker, sidious, maul];

for (var i = 0; i < characters.length; i++) {
    generateCharacter( characters[i], i )
    characters[i].create();
}

// ============ Setting Global Variables =================
var lockGame = false;
var selectHero = false;
var selectFood = false;

var charHero = 0;
var charFood = 0;



$(document).ready(function() {

// ============ When Character Button Selected =================
    $(".character-button").on("click", function() {
    if (lockGame != true) {

// ============ When Selecting Your Hero =================

        if (selectHero === false){
            console.log("Hero : " + $(this).attr("char-name"));
            switch($(this).attr("char-name")) {
                case "Obi-Wan Kenobi":
                charHero = 0;
                kenobi.status = "hero";
                $(this).addClass("hero");
                break;

                case "Luke Skywalker":
                charHero = 1;
                skywalker.status = "hero";
                $(this).addClass("hero");
                break;

                case "Darth Sidious":
                charHero = 2;
                sidious.status = "hero";
                $(this).addClass("hero");
                break;

                case "Darth Maul":
                charHero = 3;
                maul.status = "hero";
                $(this).addClass("hero");
                break;

                default:
                break;
            };

            $(".hero").detach().prependTo( "#char-attacker"); 
            selectHero = true;
        }

// ============ When Selecting Your Opponent =================

        else if (selectFood === false){
            console.log("Defender: " + $(this).attr("char-name"));

            switch($(this).attr("char-name")) {
                case "Obi-Wan Kenobi":
                if ((kenobi.status != "hero") && (kenobi.status != "banthaFodder")) {
                    charFood = 0;
                    $(this).addClass("food");
                    $(".food").detach().prependTo("#char-defender");
                    selectFood = true;        
                };
                break;

                case "Luke Skywalker":
                if ((skywalker.status != "hero") && (skywalker.status != "banthaFodder")) {
                    charFood = 1;
                    $(this).addClass("food");
                    $(".food").detach().prependTo("#char-defender");
                    selectFood = true;
                }
                break;

                case "Darth Sidious":
                if ((sidious.status != "hero") && (sidious.status != "banthaFodder")) {
                    charFood = 2;
                    $(this).addClass("food");
                    $(".food").detach().prependTo("#char-defender");
                    selectFood = true;
                }
                break;

                case "Darth Maul":
                if ((maul.status != "hero") && (maul.status != "banthaFodder")) {
                    charFood = 3;
                    $(this).addClass("food");
                    $(".food").detach().prependTo("#char-defender");
                    selectFood = true;
                }
                break;

                default:
                break;
            };

        };

// ============ When Both Hero and Opponent Selected =================

        if ((selectHero) && (selectFood)) {
            $("#char-defender-stats").addClass("food");
            $("#char-attacker-stats").addClass("hero");

            writeCombatStats( characters[charHero], characters[charFood]);
        }    
    
    };
    });

// ============ Aggressive Negotiations  =================

    $("#aggressiveNegotiations").on("click", function() {
    if (lockGame != true) {
        if ((selectHero) && (selectFood)) {

            console.log("FIGHT!");

            characters[charHero].combat(characters[charFood]);
            writeCombatStats( characters[charHero], characters[charFood]);

            if (characters[charHero].health < 1) {
                lockGame = true;
                console.log("LOSER");
                $("#end-message").text("You've failed your mission.");
            };
            if (characters[charHero].kills === (characters.length -1)) {
                lockGame = true;
                console.log("WINNER");
                $("#end-message").text("You've completed your mission.");
            }
        }
    };
    });

// ============ Running Away to Degobah b/c Bad RNG =================

    $("#reset").on("click", function() {
        for(var i = 0; i < characters.length; i++) {
            generateCharacter( characters[i], i );
        };

        $(".character-button").detach().prependTo("#char-selection");
        $(".character-button").removeClass("food hero");

        $("#char-attacker-stats").removeClass("hero");
        $("#char-defender-stats").removeClass("food");

        selectHero = false;
        selectFood = false;
        
        lockGame = false;

        writeCombatStats();
    })




});

