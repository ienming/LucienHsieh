function splitText(){
    let arr = []
    document.querySelector(".web-title > h1").innerText.split("").forEach(el => {
        let temp = document.createElement("span")
        temp.classList.add("t-title-1")
        temp.innerText = el
        arr.push(temp)
    })

    document.querySelector(".web-title > h1").innerText = ""
    for (let i=0; i<arr.length; i++){
        document.querySelector(".web-title > h1").appendChild(arr[i])
    }
}