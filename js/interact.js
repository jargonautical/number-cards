var element = document.getElementById('number1');
var element2 = document.getElementById('number2');
var element3 = document.getElementById('number3');
var element4 = document.getElementById('number4');
var element5 = document.getElementById('number5');
var element6 = document.getElementById('number6');
var element7 = document.getElementById('number7');
makeInteractive(element,0,0);
makeInteractive(element2,180,0);
makeInteractive(element3,360,0);
makeInteractive(element4,540,0);
makeInteractive(element5,720,0);
makeInteractive(element6,900,0);
makeInteractive(element7,0,100);

$("#button").click(function(){
    putBack('number1',0,0);
    putBack('number2',180,0);
    putBack('number3',360,0);
    putBack('number4',540,0);
    putBack('number5',720,0);
    putBack('number6',900,0);
    putBack('number7',0,100);
});

function putBack(element,x,y) {
    var transitionEvent = whichTransitionEvent();
    $("#"+element).css('transition','all 0.3s linear');
    $("#"+element).css('transform','translate(' + x + 'px, ' + y + 'px)');
    $("#"+element).one(transitionEvent, function(event) {
      console.log('transition complete');
      var topass = document.getElementById(element);
      makeInteractive(topass,x,y);
    });
}

function whichTransitionEvent(){
  var t,
      el = document.createElement("fakeelement");

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

function makeInteractive(element,x,y) {
  element.style.transition = '';
  element.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  interact(element)
    .draggable({
      modifiers: [
        interact.modifiers.snap({
          targets: [
            interact.createSnapGrid({ x: 10, y: 10 })
          ],
        range: Infinity,
        restrictlativePoints: [ { x: 0, y: 0 } ]
        }),
        /*interact.modifiers.restrict({
          restriction: element.parentNode,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: true
        })*/
      ],
    inertia: true
  })
  .on('dragmove', function (event) {
    x += event.dx
    y += event.dy

    event.target.style.webkitTransform =
    event.target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'
  })

}