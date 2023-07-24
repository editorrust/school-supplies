let targetDiv;
let supplies = {
   coins: 0,
   pencilPrice: 10,
   pencils: 2,
   erasers: 0,
   rulers: 0,
   paperclips: 0,
   staplers: 0,
   clipboards: 0,
}

function allowDrop(e) { e.preventDefault(); }
function drag(e) { targetDiv = e.target.id; }

function drop(e) {
   let targetId = e.target.id;
   if (e.target.tagName === "DIV") {
      if (e.target.hasChildNodes() && !e.target.classList.contains("pencil-holder")) { shiver("#" + targetDiv); }
      else {
         e.preventDefault();
         e.target.appendChild(document.getElementById(targetDiv));
      }
   }
   else if (e.target.tagName === "IMG") {
      if (e.target.classList.contains("pencil") && document.getElementById(targetDiv).classList.contains("pencil") && targetId != targetDiv) {
         explosion(`#${targetDiv}`)
         e.target.remove();
         setTimeout(() => addItem("pencil", "eraser", targetDiv), 500)
      }
      else if (e.target.classList.contains("eraser") && document.getElementById(targetDiv).classList.contains("eraser") && targetId != targetDiv) {
         explosion(`#${targetDiv}`)
         e.target.remove();
         setTimeout(addRuler, 500)
         function addRuler() {
            document.getElementById(targetDiv).remove()
            supplies.erasers -= 2;
            supplies.rulers++;
            let newRuler = document.querySelector("#motherRuler").cloneNode();
            newRuler.id = uniqueId();
            document.querySelector(".pencil-holder").appendChild(newRuler);
         }
      }
      else if (e.target.classList.contains("ruler") && document.getElementById(targetDiv).classList.contains("ruler") && targetId != targetDiv) {
         explosion(`#${targetDiv}`)
         e.target.remove();
         setTimeout(addPaperclip, 500)
         function addPaperclip() {
            document.getElementById(targetDiv).remove()
            supplies.rulers -= 2;
            supplies.paperclips++;
            let newPaperclip = document.querySelector("#motherPaperclip").cloneNode();
            newPaperclip.id = uniqueId();
            document.querySelector(".pencil-holder").appendChild(newPaperclip);
         }
      }
      else if (e.target.classList.contains("paperclip") && document.getElementById(targetDiv).classList.contains("paperclip") && targetId != targetDiv) {
         explosion(`#${targetDiv}`)
         e.target.remove();
         setTimeout(addStapler, 500)
         function addStapler() {
            document.getElementById(targetDiv).remove()
            supplies.paperclips -= 2;
            supplies.staplers++;
            let newStapler = document.querySelector("#motherStapler").cloneNode();
            newStapler.id = uniqueId();
            document.querySelector(".pencil-holder").appendChild(newStapler);
         }
      }
      else if (e.target.classList.contains("stapler") && document.getElementById(targetDiv).classList.contains("stapler") && targetId != targetDiv) {
         explosion(`#${targetDiv}`)
         e.target.remove();
         setTimeout(addClipboard, 500)
         function addClipboard() {
            document.getElementById(targetDiv).remove()
            supplies.staplers -= 2;
            supplies.clipboard++;
            let newClipboard = document.querySelector("#motherClipboard").cloneNode();
            newClipboard.id = uniqueId();
            document.querySelector(".pencil-holder").appendChild(newClipboard);
         }
      }
      else { shiver("#" + targetDiv); }
   }
}

function merge(obj) {
   explosion(`#${targetDiv}`)
   e.target.remove();
   setTimeout(addEraser, 500)
   function addEraser() {
      document.getElementById(targetDiv).remove()
      supplies.pencils -= 2;
      supplies.erasers++;
      let newEraser = document.querySelector("#motherEraser").cloneNode();
      newEraser.id = uniqueId();
      document.querySelector(".pencil-holder").appendChild(newEraser);
   }
}

function addItem(lastItem, item, target) {
   document.getElementById(target).remove()
   supplies[lastItem] -= 2;
   supplies[item]++;
   let newItem = document.querySelector(`#mother${cap(item)}`).cloneNode();
   newItem.id = uniqueId();
   document.querySelector(".pencil-holder").appendChild(newItem);
}

function addPencil() {
   if (supplies.coins >= supplies.pencilPrice) {
      supplies.coins -= supplies.pencilPrice;
      supplies.pencilPrice = (supplies.pencilPrice *= 1.2).toFixed(1);
      supplies.pencils++;
      let newPencil = document.querySelector("#motherPencil").cloneNode();
      newPencil.id = uniqueId();
      document.querySelector(".pencil-holder").appendChild(newPencil);
      document.querySelector(".pencilPrice").textContent = supplies.pencilPrice;
   }
}

let coinLoop = window.setInterval(function() {
   for (let i = 0; i < supplies.pencils; i++) { supplies.coins += .5; }
   for (let i = 0; i < supplies.erasers; i++) { supplies.coins += 1; }
   for (let i = 0; i < supplies.rulers; i++) { supplies.coins += 2.5; }
   for (let i = 0; i < supplies.paperclips; i++) { supplies.coins += 8; }
   for (let i = 0; i < supplies.staplers; i++) { supplies.coins += 20; }
   for (let i = 0; i < supplies.clipboards; i++) { supplies.coins += 50; }
   document.querySelector(".coins").textContent = (supplies.coins).toFixed(1);
}, 2000)

function shiver(obj) {
   document.querySelector(obj).classList.add("cold");
   setTimeout(warmUp, 250)
   function warmUp() { document.querySelector(obj).classList.remove("cold"); }
}

// function {
//    // Find random empty box to throw item into
// }

// Random change of sleeping or drawing

function explosion(query) { document.querySelector(query).classList.add("explosion"); }
let uniqueId = function () { return '_' + Math.random().toString(36).substr(2, 9); }
function cap(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
