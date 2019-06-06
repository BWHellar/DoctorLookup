import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { DocDoc } from "./DocDoc.js";

$(document).ready(function() {
  $("#form").submit(function(event) {
    event.preventDefault();
    $("#results").empty();

    let doctor = $('')
