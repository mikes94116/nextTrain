// 1. Initialize Firebase
   var config = {
    apiKey: "AIzaSyAT084A2M5eZsLREkq1ahMqQwYlCkjXjT4",
    authDomain: "nexttrain2-67694.firebaseapp.com",
    databaseURL: "https://nexttrain2-67694.firebaseio.com",
    projectId: "nexttrain2-67694",
    storageBucket: "",
    messagingSenderId: "69918999041"
  };
  firebase.initializeApp(config);
  
var database = firebase.database();

var myTimer = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    $("#current-time").text(d.toLocaleTimeString());
}

var frequency = 0; 
var firstTrain = 0;
// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("HH:mm");
  frequency = parseInt($("#frequency").val().trim());
  // console.log(typeof firstTrain);
  // Creates local "temporary" object for holding employee data
  console.log(firstTrain);
  console.log(typeof firstTrain);
  var firstTrainConverted = moment(firstTrain, "hh:mm");
  console.log(firstTrainConverted);
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log(diffTime);
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);
   var minutesTillTrain = frequency - tRemainder;
  console.log(minutesTillTrain);
  // var nextTrain = firstTrainConverted.add(diffTime + minutesTillTrain).minutes();
  var nextTrain = moment().add(minutesTillTrain, "minutes");
  var nextTrain2 = moment().add(2, "minutes")
  console.log("num1" + nextTrain);
  console.log("num2" + nextTrain2);
  nextTrain = moment(nextTrain).format("HH:mm");
  console.log("num1" + nextTrain);
  
//   
  
  
   // var currentTime = moment().format("HH:mm");
    // console.log(currentTime);

  
//   fix to make next train not a function
  
  
  
//   
  
  // // var diffTime = moment().diff(firstTrain, "minutes");
  
      // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);
    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);
    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    nextTrain: nextTrain,
    minutesTillTrain: minutesTillTrain
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  // console.log(newTrain.name);
  // console.log(newTrain.destination);
  // console.log(newTrain.firstTrain);
  // console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");
    // console.log(firstTrain);
    // console.log("Look here");
    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;
  var nextTrain = childSnapshot.val().nextTrain;
  var minutesTillTrain = childSnapshot.val().minutesTillTrain;


  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</td></tr>");
});