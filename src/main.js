import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import $ from "jquery";
import { DoctorLookup } from "./DoctorLookup.js";


$(document).ready(function(){

  $("#loveDoc").submit(function(event) {
    event.preventDefault();
    $('body').prepend('<img src="https://media1.tenor.com/images/6c694726c00d5b526790878676273aab/tenor.gif?itemid=13369215"></img>')
  });


  $("#doctorForm").submit(function(event) {
    event.preventDefault();
    $("#resultsArea").text("");
    $("#errorField").text("");
    let doctorName = $("#doctorSearch").val();
    let foundDoctor = new DoctorLookup();
    let promise = foundDoctor.lookupDoctor(doctorName);
    promise.then(function(response) {
      let body = JSON.parse(response);
      if (body.data.length ===0) {
        $("#errorField").text("No doctors match this search.");
      }
      body.data.forEach(function(doctor) {
        $("#resultsArea").append(`<li>${doctor.profile.first_name} ${doctor.profile.last_name} <br>
        ${doctor.practices[0].visit_address.street}, ${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state} ${doctor.practices[0].visit_address.zip} <br>
        Phone number: ${doctor.practices[0].phones[0].number} <br>
        Accept new patient: ${doctor.practices[0].accepts_new_patients} </li> <br>`)
      });
    }, function(error) {
      $('.showErrors').text(`ERROR: ${error.message}`);
    });
  });
});
