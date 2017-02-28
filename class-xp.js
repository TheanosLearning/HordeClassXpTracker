let gearsServiceURL = "https://gearsofwar.com/en-us/stats/gears-of-war-4/xbox-one/service-records/players";
if(window.location.href.includes(gearsServiceURL)) {

    var eXP        = localStorage.getItem("eXP")        != null ? localStorage.getItem("eXP").split(',')        : [];
    var soldierXP  = localStorage.getItem("soldierXP")  != null ? localStorage.getItem("soldierXP").split(',')  : [];
    var sniperXP   = localStorage.getItem("sniperXP")   != null ? localStorage.getItem("sniperXP").split(',')   : [];
    var scoutXP    = localStorage.getItem("scoutXP")    != null ? localStorage.getItem("scoutXP").split(',')    : [];
    var heavyXP    = localStorage.getItem("heavyXP")    != null ? localStorage.getItem("heavyXP").split(',')    : [];
    var engineerXP = localStorage.getItem("engineerXP") != null ? localStorage.getItem("engineerXP").split(',') : [];
    var credits    = localStorage.getItem("credits")    != null ? localStorage.getItem("credits").split(',')    : [];


    var hordeVersusXP = [soldierXP, sniperXP, scoutXP, heavyXP, engineerXP, eXP];

    var gow4Data = JSON.parse(document.getElementById('initialState').textContent);
    var hordeXP = gow4Data.horde.ExperienceStats.Stats.map(c => c.EXP);
    var versusXP = gow4Data.versus.ExperienceStats.Stats[0].EXP;
    var newXP = hordeXP.concat(versusXP);

    // only push values on if they are different than the last entry in local storage
    for(j = 0; j < hordeVersusXP.length; j++) {
        if(hordeVersusXP[j].length > 0) {
            if(newXP[j] > hordeVersusXP[j][hordeVersusXP[j].length - 1]) {
                hordeVersusXP[j].push(newXP[j]);
            }
        } else {
            hordeVersusXP[j].push(newXP[j]);
        }
    }

    // update local storage
    for(j = 0; j < hordeVersusXP.length; j++) {
        switch(j) {
            case 0:
                localStorage.setItem("soldierXP", soldierXP);
                break;
            case 1:
                localStorage.setItem("sniperXP", sniperXP);
                break;
            case 2:
                localStorage.setItem("scoutXP", scoutXP);
                break;
            case 3:
                localStorage.setItem("heavyXP", heavyXP);
                break;
            case 4:
                localStorage.setItem("engineerXP", engineerXP);
                break;
            case 5:
                localStorage.setItem("eXP", eXP);
                break;
            default:
                console.error("Failed to update XP.");
        }
    }

    // logic for updating credits
    // [90, 91, 92] -> [1000, 10000, 100000] -> x10 x100 x1000
    var totalCreditsEarned = 10 * gow4Data.achievements.Achievements.filter(a => a.Id === "90").pop().Progress;

    if(credits.length > 0) {
        if(totalCreditsEarned > credits[credits.length - 1]) {
            credits.push(totalCreditsEarned);
        }
    } else {
        credits.push(totalCreditsEarned);
    }

    localStorage.setItem("credits", credits);

}