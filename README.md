# Doctor Finder
#### This project will find Doctors in the designated search area, June/10/2019


#### By _**Brendan Hellar**_

## Description


#### This project will practice pulling API's and displaying them based on the search criteria.  Using the Better Doctor API this program will let you search doctors by name.

## Specs
| Spec | Input | Output | Reasoning |
| :-------------     | :------------- | :------------- | :----------- |
| **Search doctor by name** | User input: "Bob" | Output: "Bob Johnson" | Reasoning: Users will input a name and receive a list of doctors and information |

## Breakdown
###### Here is our function that allow us to pull from the designated API.
```
export class DoctorLookup {
  lookupDoctor(name) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=wa-seattle&skip=0&limit=10&user_key=${process.env.API_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
==============
```
###### Here we find the doctors using the previous function search and append on a list of doctors that fall under the search criteria.
```
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
==============
```


## Setup/Installation Requirements

1. Clone this repository: $ git clone >repo name here<
2. Change into the work directory: $ cd DoctorLookup
3. In console type: npm install
4. In console type: npm run start



## Known Bugs

None

## Support and contact details

If you have any issues please contact Brendan Hellar at bwhellar@gmail.com

## Technologies Used

Node.js

### License

MIT

Copyright (c) 2019 **Brendan Hellar**
