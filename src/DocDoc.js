export class DocDoc {
  Doctors(search) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let key = process.env.exports.apiKey
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${search}&location=wa-seattle&user_location=47.676507%2C122.386223&skip=0&limit=10&user_key=` + key
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}
