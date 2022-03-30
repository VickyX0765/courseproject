function findSkills() {
    const map = new Map();

    map.set("APS502H", [ "excel","matlab"]);
    map.set("APS1005H", [ "excel","ampl"]);
    map.set("APS1022H", [ "excel","matlab"]);
    map.set("APS1040H", [ "excel","minitab","python"]);
    map.set("APS1050H", [ "javascript","truffle framework"]);
    map.set("APS1051H", [ "python","matlab"]);
    map.set("APS1052H", [ "python","keras","tensorflow"]);
    map.set("APS1080H", [ "python"]);
    map.set("CHE507H", [ "matlab"]);
    map.set("CHE1148H", [ "python","spark"]);
    map.set("CHE1434H", [ "minitab"]);
    map.set("CEM1002H", [ "rapidminer"]);
    map.set("ECE1778H", [ "android","ios"]);
    map.set("ECE1779H", [ "aws", "cloud platform"]);
    map.set("MIE1413H", [ "r","sas"]);
    map.set("MIE1501H", [ "rdf","sparql"]);
    map.set("MIE1512H", [ "sql"]);
    map.set("MIE1513H", [ "python"]);
    map.set("MIE1517H", [ "python","tensorflow"]);
    map.set("MIE1621H", [ "python"]);
    map.set("MIE1622H", [ "excel","matlab","vba","r","c","c++","python"]);
    map.set("MIE1628H", [ "python","hadoop","spark","azure","aws","cloud platform"]);
    map.set("MSE1063H", [ "python","r"]);
    var input, option, courses, skills, skillbox, remaining, des, toUpdate;
    skills = new Set();
    input = document.getElementById("multiselect_to");
    option = input.getElementsByTagName("option");
    if (option.length <= 0) {
        return;
    }

    for (var i=0; i<option.length; i++) {
        var courseVal = option[i].value;
        var courseSkill = map.get(courseVal);
        courseSkill.forEach(skills.add, skills);
    }
    skillbox = document.getElementById("multiselect2");
    remaining = skillbox.getElementsByTagName("option");
    toUpdate = []
    for (var i=0; i<remaining.length; i++){
        var skillName = remaining[i].value;
        if (skills.has(skillName)){
            toUpdate.push(remaining[i])
        }
    }

    toUpdate.forEach(update)
}
function update(item){
   $("#multiselect2_to").append(item);
}