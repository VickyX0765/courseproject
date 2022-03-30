function searchByTitles() {
    var raw, keywords, regexFormat, table, tbody, tr, td, i, txtValue, txtValues, display;
    keywords = []
    raw = document.getElementById('res').innerText;

    if (raw.includes('Database Engineer')){
        keywords.push("database");
        keywords.push("dba");
    }
    if (raw.includes('Data Engineer')){
        keywords.push("data engineer");
    }
    if (raw.includes('Software Engineer')){
        keywords.push("software");
    }
    if (raw.includes('Machine Learning')){
        keywords.push("machine learning");
        keywords.push("research");
    }
    if (raw.includes('Product Manager')){
        keywords.push("product");
        keywords.push("program manager");
        keywords.push("project manager");
        keywords.push("advocacy");
        keywords.push("support");
    }
    if(raw.includes('Statistician')){
        keywords.push("statistic");
    }
    if(raw.includes('Data Analyst')){
        keywords.push("data analyst");
    }
    if(raw.includes('Business Analyst')){
        keywords.push("business");
    }

    if (keywords.size == 0){
        return
    }
    regexFormat = "^.*(" + keywords.join("|") + ")+.*$"
    table = document.getElementById("table-container-table");
    tbody = table.getElementsByTagName("tbody")[0];
    tr = tbody.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      display = "none";
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = (td.textContent || td.innerText).toLowerCase();
        if (txtValue.match(regexFormat)){
            display = ""
        }
        tr[i].style.display = display;
        if (display == "none"){
            tr[i].style.color = "black";
            $(tr[i]).hide()
        }
      }
    }
    $(document).ready(()=>{
        $("#maxRows").val('1000');
    });
}

function searchBySkills() {
    var box, option, skills, regexFormat, table, tbody, tr, td, i, txtValue, txtValues, display;
    skills = []
    table = document.getElementById("table-container-table");
    tbody = table.getElementsByTagName("tbody")[0];
    tr = tbody.getElementsByTagName("tr");
    box = document.getElementById("multiselect2_to");
    option = box.getElementsByTagName("option")
    if (option.length <= 0) {
        return
    }

    for (var i=0; i<option.length; i++) {
        skills.push(option[i].value);
    }

    regexFormat = "^.*(" + skills.join("|") + ")+.*$"


    for (i = 0; i < tr.length; i++) {
      display = "none";
      td = tr[i].getElementsByTagName("td")[5];
      if (td) {
        txtValue = (td.textContent || td.innerText).toLowerCase();
        if (txtValue.match(regexFormat)){
            display = ""
        }
        tr[i].style.display = display;
        if (display == "none"){
            tr[i].style.color = "black";
            $(tr[i]).hide()
        }
      }
    }
    $(document).ready(()=>{
        $("#maxRows").val('1000');
    });
}

function clearFilter(){
    var table, tbody, tr;
    table = document.getElementById("table-container-table");
    tbody = table.getElementsByTagName("tbody")[0];
    tr = tbody.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "display";
        $(tr[i]).show()
     }
    $(document).ready(()=>{
        $("#maxRows").val('1000');
    });
}