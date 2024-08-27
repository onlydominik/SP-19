

document.querySelector("button").addEventListener("click", () => {
    
    let inputDay = document.querySelector("#day").value;
    let inputMonth = document.querySelector("#month").value;
    let inputYear = document.querySelector("#year").value;
    let error = false;
 let labels = document.querySelectorAll("label");
 labels.forEach(elem => {
    if(!elem.querySelector("input").value) elem.querySelector("p").textContent = "This field is required"
    else elem.querySelector("p").textContent = ""

 })



    if(inputDay, inputMonth, inputYear) {


        let inputDate = moment([inputYear, inputMonth, inputDay]);
        let diff = moment.preciseDiff(inputDate, moment(), true);
        document.querySelector(".calculator__results p:nth-child(1) strong").textContent = diff["years"];
        document.querySelector(".calculator__results p:nth-child(2) strong").textContent = diff["months"];
        document.querySelector(".calculator__results p:nth-child(3) strong").textContent = diff["days"];
    }
})






