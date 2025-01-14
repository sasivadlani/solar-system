console.log('We are inside client.js');

window.onload = function() {
  fetch("/os")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Request failed');
    })
    .then(function(data) {
      document.getElementById('hostname').innerHTML = `Pod - ${data.os}`;
    })
    .catch(function(error) {
      console.log(error);
    });
};

const btn = document.getElementById('submit');
if (btn) {
  btn.addEventListener('click', func);
}

function func() {
  const planetId = document.getElementById("planetID").value;
  console.log("onClick Submit - Request Planet ID - " + planetId);
  
  fetch("/planet", {
    method: "POST",
    body: JSON.stringify({
      id: planetId
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(function(res2) {
    if (res2.ok) {
      return res2.json();
    }
    throw new Error('Request failed.');
  })
  .then(function(data) {
    document.getElementById('planetName').innerHTML = data.name;
    const element = document.getElementById("planetImage");
    element.style.backgroundImage = `url(${data.image})`;
    document.getElementById('planetDescription').innerHTML = data.description.replace(/(.{80})/g, "$1");
  })
  .catch(function(error) {
    alert("Ooops, We have 8 planets.\nSelect a number from 0 - 8");
    console.log(error);
  });
}
