$( document ).ready(function() {
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUeq2yE7ClGJu5xVodOK9oXBuC5jCLDlE",
    authDomain: "nexttrainrev.firebaseapp.com",
    databaseURL: "https://nexttrainrev.firebaseio.com",
    projectId: "nexttrainrev",
    storageBucket: "",
    messagingSenderId: "76401589587"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val();
  var Destination = $("#destination-input").val();
  var timeEntry = moment($("#time-input", "h:mm A").val()).format("HH:mm");
  // var timeEntry = moment($("#time-input", "h:mm A").val().trim().format("HH:mm");
  var frequency = $("#frequency-input").val();

  // Creates local "temporary" object for holding employee data
  var nexttrain = {
    name: trainName,
    Destination: Destination,
    FirstTrain: timeEntry,
    freq: frequency
  };

  console.log(trainName);
  
  // Uploads employee data to the database
  database.ref().push(nexttrain);

  // Logs everything to console
  // console.log(newEmp.name);
  // console.log(newEmp.role);
  // console.log(newEmp.start);
  // console.log(newEmp.rate);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");


});

  database.ref().on("child_added", function(childSnapshot) {
    //   console.log(childSnapshot.val());


  var trainName = childSnapshot.val().name;
  var Destination = childSnapshot.val().Destination;
  var timeEntry = childSnapshot.val().FirstTrain;
  var frequency = childSnapshot.val().freq;

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(Destination),
    $("<td>").text(timeEntry),
    $("<td>").text(frequency),
    $("<td>").text(trainComing)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);

  return trainName 
  return Destination 
  return timeEntry 
  // var timeEntry = moment($("#time-input", "h:mm A").val().trim().format("HH:mm");
  return frequency 
  
  });



 

// 3. Firebase event for converting train time entered, and calculating time left
// database.ref().on("child_added", function(childSnapshot) {
//   console.log(childSnapshot.val());

//   // Store everything into a variable.
//   var trainName = childSnapshot.val().name;
//   var Destination = childSnapshot.val().Destination;
//   var timeEntry = childSnapshot.val().FirstTrain;
//   var frequency = childSnapshot.val().freq;

//   //Train Info
//   // console.log(trainName);
//   // console.log(Destination);
//   // console.log(timeEntry);
//   // console.log(frequency);

//   // First Time (pushed back 1 year to make sure it comes before current time)
//     var trainTimeConverted = moment(timeEntry, "HH:mm").subtract(1, "years");
//     console.log(firstTimeConverted);

//     // Current Time
//     var currentTime = moment().format("hh:mm");
//     console.log("CURRENT TIME: " + currentTime);

//     // Difference between the times
//     var diffTime = currentTime.diff(moment(trainTimeConverted), "minutes");
//     console.log("DIFFERENCE IN TIME: " + diffTime);

//   //   // Time apart (remainder)
//     var tRemainder = diffTime % frequency;
//     console.log(tRemainder);

//   //   // Minute Until Train
//     var tMinutesTillTrain = frequency - tRemainder;
//     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//     // Next Train
//     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//     var trainComing = moment(nextTrain).format("hh:mm");

  // Create the new row
  // var newRow = $("<tr>").append(
  //   $("<td>").text(trainName),
  //   $("<td>").text(Destination),
  //   $("<td>").text(timeEntry),
  //   $("<td>").text(timeEntry),
  //   $("<td>").text(trainComing)
  // );

  // // Append the new row to the table
  // $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
