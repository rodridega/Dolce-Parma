const photoProyect = document.getElementsByClassName("photoProyect");
for (let i = 0; i < photoProyect.length; i++) {
    photoProyect[i].addEventListener("mouseover", () => photoProyect[i].classList.replace("shadow-sm", "shadow"))
    photoProyect[i].addEventListener("mouseout", () => photoProyect[i].classList.replace("shadow", "shadow-sm"))
}
