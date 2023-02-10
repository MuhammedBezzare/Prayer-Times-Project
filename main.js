const timeOptions = {
  timeZone: "Europe/Istanbul",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};
const hijri = document.querySelector(".date");
const today = new HijriDate();
hijri.innerHTML =
  "Hijri Date " + today.date + "." + today.month + "." + today._year;
const timeDate = new Date();
const timeTime = new Intl.DateTimeFormat("en-US", timeOptions).format(timeDate);
// const userTime = timeTime.slice(0, -2);
const userTime = moment(timeTime, "h:mm A").format("HH:mm"); //timeTime;

function getPrayersAuto() {
  axios.request("https://api.ipify.org?format=json").then(function (response) {
    new Promise((resolve, reject) => {
      let ip = response.data.ip;
      resolve(ip);
    }).then((ip) => {
      //let ip = ip;
      new Promise((resolve, reject) => {
        axios.get(`https://ipapi.co/${ip}/city/`).then(function (response) {
          // handle success
          let city = document.querySelector(".city");
          vars = response.data;
          city.innerHTML = response.data;
          resolve(response.data);
        });
      }).then((city) => {
        const options = {
          method: "GET",
          url: `https://muslimsalat.p.rapidapi.com/${city}.json`,
          headers: {
            "X-RapidAPI-Key":
              "c90809b9fdmsh7011922947316adp162699jsndf16126b7097",
            "X-RapidAPI-Host": "muslimsalat.p.rapidapi.com",
          },
        };

        // Geting the data

        // seting the tim
        //importent convert all the times tp number becose it is string

        axios
          .request(options)
          .then(function (response) {
            const data = response.data.items;
            data.forEach((index) => {
              let sunriseTime = document.querySelector("#sunrise-time");
              let sunsetTime = document.querySelector("#sunset-time");
              let nextTimeFajr = document.querySelector("#next-time-fajr");
              let nextTimeShurooq =
                document.querySelector("#next-time-shurooq");
              let nextTimeDhuhr = document.querySelector("#next-time-dhuhr");
              let nextTimeAsr = document.querySelector("#next-time-asr");
              let nextTimeMaghrib =
                document.querySelector("#next-time-maghrib");
              let nextTimeIsha = document.querySelector("#next-time-isha");
              let fajrTime = document.querySelector("#fajr-time");
              let shurooqTime = document.querySelector("#shurooq-time");
              let dhuhrTime = document.querySelector("#dhuhr-time");
              let asrTime = document.querySelector("#asr-time");
              let maghribTime = document.querySelector("#maghrib-time");
              let ishaTime = document.querySelector("#isha-time");
              let dayDate = document.querySelector("#day-date");
              let compare_fajr = moment(index.fajr, "HH:mm a");
              let compare_shurooq = moment(index.shurooq, "HH:mm a");
              let compare_dhuhr = moment(index.dhuhr, "HH:mm a");
              let compare_asr = moment(index.asr, "HH:mm a");
              let compare_maghrib = moment(index.maghrib, "HH:mm a");
              let compare_isha = moment(index.isha, "HH:mm a");
              let fajr = compare_fajr._i;
              let shurooq = compare_shurooq._i;
              let dhuhr = compare_dhuhr._i;
              let asr = compare_asr._i;
              let maghrib = compare_maghrib._i;
              let isha = compare_isha._i;
              let userSelectedTime = moment(userTime, "HH:mm a");
              // seting next time values
              sunriseTime.innerHTML = shurooq;
              nextTimeShurooq.innerHTML = shurooq;
              sunsetTime.innerHTML = maghrib;
              nextTimeFajr.innerHTML = fajr;
              nextTimeDhuhr.innerHTML = dhuhr;
              nextTimeAsr.innerHTML = asr;
              nextTimeMaghrib.innerHTML = maghrib;
              nextTimeIsha.innerHTML = isha;

              //seting now's value
              fajrTime.innerHTML = fajr;
              shurooqTime.innerHTML = shurooq;
              dhuhrTime.innerHTML = dhuhr;
              asrTime.innerHTML = asr;
              maghribTime.innerHTML = maghrib;
              ishaTime.innerHTML = isha;

              //seting date value
              dayDate.innerHTML = time;

              //seting active class
              if (
                userSelectedTime.isSameOrAfter(compare_asr) &&
                userSelectedTime < compare_maghrib
              ) {
                asrTime.parentElement.parentElement.classList.add("active");
              } else if (
                userSelectedTime.isSameOrAfter(compare_dhuhr) &&
                userSelectedTime < compare_asr
              ) {
                dhuhrTime.parentElement.parentElement.classList.add("active");
              } else if (
                userSelectedTime.isSameOrAfter(compare_fajr) &&
                userSelectedTime < compare_shurooq
              ) {
                fajrTime.parentElement.parentElement.classList.add("active");
              } else if (
                userSelectedTime.isSameOrAfter(compare_shurooq) &&
                userSelectedTime < compare_dhuhr
              ) {
                shurooqTime.parentElement.parentElement.classList.add("active");
              } else if (
                userSelectedTime.isSameOrAfter(compare_isha) &&
                userSelectedTime > compare_fajr
              ) {
                ishaTime.parentElement.parentElement.classList.add("active");
              } else if (
                userSelectedTime.isSameOrAfter(compare_maghrib) &&
                userSelectedTime < compare_isha
              ) {
                maghribTime.parentElement.parentElement.classList.add("active");
              } else if (
                userSelectedTime.isSameOrBefore(compare_isha) &&
                userSelectedTime < compare_fajr
              ) {
                ishaTime.parentElement.parentElement.classList.add("active");
              }
              timeout = false;
              let ss = setTimeout(() => {
                const prayers = document.querySelector(".time-carts");
                let activePrayer;
                let activePrayerNextSibling;
                for (const e of prayers.children) {
                  if (e.classList.contains("active")) {
                    activePrayer = e;
                    let activePrayerT = activePrayer.children[0].innerText; //.slice(0, -2)
                    let activePrayerTi = activePrayerT.slice(-7); //.slice(0, -2)
                    let activePrayerTime = moment(
                      activePrayerTi,
                      "h:mm A"
                    ).format("HH:mm");
                    activePrayerNextSibling = activePrayer.nextElementSibling;
                    if (!activePrayerNextSibling) {
                      activePrayerNextSibling =
                        activePrayer.parentNode.firstElementChild;
                    }
                    const nextTime = document.querySelector(".next-time");
                    const nextTimeData =
                      activePrayerNextSibling.getAttribute("data-prayer-name");
                    let nextPrayerD = activePrayerNextSibling.children;
                    let nextPrayerDa = nextPrayerD[0].innerText.slice(-7);
                    let nextPrayerDate = moment(nextPrayerDa, "h:mm A").format(
                      "HH:mm"
                    );
                    nextTime.textContent = nextTimeData;
                    const nextPrayers = document.querySelector(".prayer");
                    for (const i of nextPrayers.children) {
                      if (
                        i
                          .getAttribute("data-prayer-name")
                          .includes(nextTimeData)
                      ) {
                        i.classList.add("pr-active");
                        break;
                      }
                    }
                    // curent time
                    let currentTime = moment(`${userTime}`, "HH:mm a");
                    // next time
                    let nextPrayerTime = moment(`${nextPrayerDate}`, "HH:mm a");
                    let diff = nextPrayerTime.diff(currentTime); // diff is the difference in milliseconds
                    if (diff < 0) {
                      diff =
                        currentTime.diff(nextPrayerTime.add(1, "day")) * -1;
                    }
                    let diffInMinutes = diff / 60000; // convert milliseconds to minutes

                    let countdown = moment.duration(diffInMinutes, "minutes");
                    sss(countdown);
                    break;
                  }
                }
              }, 400);
            });
          })
          .catch(function (error) {
            makeError("Something Went Wrong");
          });
      });
    });
  });
}
getPrayersAuto();
function sss(countdown) {
  let search = document.querySelector("#requestBTN");
  let nextCounter = document.querySelector(".next");
  let input = document.querySelector("#city-input");
  input.addEventListener("input", () => {
    if (input.value === "") {
      console.log(input.value);
    } else {
      search.addEventListener("click", () => {
        nextCounter.innerHTML = "";
        clearInterval(intervalId);
        setTimeout(() => {
          input.value = "";
        }, 100);
      });
    }
  });
  const countdownDuration = countdown; // 3 hours in milliseconds
  let time = countdownDuration;

  const countdown1 = () => {
    time -= 1000;

    if (time <= 0) {
      clearInterval(intervalId);
      makeError("Countdown finished!");
      getPrayersAuto();
    } else {
      let hours = Math.floor(time / (60 * 60 * 1000));
      let minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
      let seconds = Math.floor((time % (60 * 1000)) / 1000);

      nextCounter.innerHTML =
        hours + "h" + " : " + minutes + "m" + " : " + seconds + "s";
    }
  };
  const intervalId = setInterval(countdown1, 1000);
}

const optionss = { timeZone: "America/Los_Angeles" };
const date = new Date();
const time = new Intl.DateTimeFormat("en-US", optionss).format(date);

let mobilNavPart1 = document.querySelector(".links");
let mobilNavPart2 = document.querySelector(".download-btn");
let mobilIcone = document.querySelector(".mobil-icone");
mobilIcone.addEventListener("click", () => {
  mobilNavPart1.classList.toggle("on");
  mobilNavPart2.classList.toggle("on");
});

//
const sliderContainer = document.querySelector(".slider-tracker");
const sliderCheldern = Array.from(sliderContainer.children);
const rightCursser = document.querySelector(".fa-caret-right");
const leftCursser = document.querySelector(".fa-caret-left");
const mount = sliderCheldern[0].getBoundingClientRect().width;
// Loop on the array elements and add the
const addSpace = (slide, index) => {
  slide.style.left = `${mount}` * index + "px";
};
const movSlide = (slideer, currentElement, targetCibling) => {
  slideer.style.transform = "translateX(-" + targetCibling.style.left + ")";
  currentElement.classList.remove("current");
  targetCibling.classList.add("current");
};
sliderCheldern.forEach(addSpace);
//add event listiner to the curssers buttons
rightCursser.addEventListener("click", () => {
  const current = sliderContainer.querySelector(".current");
  const nextCiblings = current.nextElementSibling;
  movSlide(sliderContainer, current, nextCiblings);
});
leftCursser.addEventListener("click", () => {
  const current = sliderContainer.querySelector(".current");
  const prevestCiblings = current.previousElementSibling;
  movSlide(sliderContainer, current, prevestCiblings);
});

function makeError(error) {
  const pro = new Promise((resolve, reject) => {
    let body = document.querySelector("body");
    let div = document.createElement("div");
    div.classList.add("error");
    div.innerHTML = error;
    body.appendChild(div);
    resolve();
  }).then(() => {
    setTimeout(() => {
      let div = document.querySelector(".error");
      div.remove();
    }, 4000);
  });
}
function makeSuccess(success) {
  const pro = new Promise((resolve, reject) => {
    let body = document.querySelector("body");
    let div = document.createElement("div");
    div.classList.add("success");
    div.innerHTML = success;
    body.appendChild(div);
    resolve();
  }).then(() => {
    setTimeout(() => {
      let div = document.querySelector(".success");
      div.remove();
    }, 4000);
  });
}

let requestBTN = document.querySelector("#requestBTN");
let input = document.querySelector("#city-input");
new Promise((resolve, reject) => {
  input.addEventListener("input", () => {
    if (input.value === "") {
      resolve();
    } else {
      reject();
    }
  });
})
  .then(() => {
    requestBTN.classList.add("disabled");
  })
  .catch(() => {
    requestBTN.classList.remove("disabled");
    requestBTN.addEventListener("click", () => {
      let inputValue = input.value.toLowerCase();
      let city = document.querySelector(".city");
      new Promise((resolve, reject) => {
        prayersBycity(inputValue);
        resolve();
      }).then(() => {
        city.textContent = inputValue;
      });
      //input.value = "";
    });
  });

const prayersBycity = (city) => {
  const getPrayerByCity = {
    method: "GET",
    url: `https://muslimsalat.p.rapidapi.com/${city}.json`,
    headers: {
      "X-RapidAPI-Key": "c90809b9fdmsh7011922947316adp162699jsndf16126b7097",
      "X-RapidAPI-Host": "muslimsalat.p.rapidapi.com",
    },
  };
  axios
    .request(getPrayerByCity)
    .then(function (response) {
      const data = response.data.items;
      data.forEach((index) => {
        let sunriseTime = document.querySelector("#sunrise-time");
        let sunsetTime = document.querySelector("#sunset-time");
        let nextTimeFajr = document.querySelector("#next-time-fajr");
        let nextTimeShurooq = document.querySelector("#next-time-shurooq");
        let nextTimeDhuhr = document.querySelector("#next-time-dhuhr");
        let nextTimeAsr = document.querySelector("#next-time-asr");
        let nextTimeMaghrib = document.querySelector("#next-time-maghrib");
        let nextTimeIsha = document.querySelector("#next-time-isha");
        let fajrTime = document.querySelector("#fajr-time");
        let shurooqTime = document.querySelector("#shurooq-time");
        let dhuhrTime = document.querySelector("#dhuhr-time");
        let asrTime = document.querySelector("#asr-time");
        let maghribTime = document.querySelector("#maghrib-time");
        let ishaTime = document.querySelector("#isha-time");
        let dayDate = document.querySelector("#day-date");
        let compare_fajr = moment(index.fajr, "HH:mm a");
        let compare_shurooq = moment(index.shurooq, "HH:mm a");
        let compare_dhuhr = moment(index.dhuhr, "HH:mm a");
        let compare_asr = moment(index.asr, "HH:mm a");
        let compare_maghrib = moment(index.maghrib, "HH:mm a");
        let compare_isha = moment(index.isha, "HH:mm a");
        let fajr = compare_fajr._i;
        let shurooq = compare_shurooq._i;
        let dhuhr = compare_dhuhr._i;
        let asr = compare_asr._i;
        let maghrib = compare_maghrib._i;
        let isha = compare_isha._i;
        let userSelectedTime = moment(userTime, "HH:mm a");
        // seting next time values
        sunriseTime.innerHTML = shurooq;
        nextTimeShurooq.innerHTML = shurooq;
        sunsetTime.innerHTML = maghrib;
        nextTimeFajr.innerHTML = fajr;
        nextTimeDhuhr.innerHTML = dhuhr;
        nextTimeAsr.innerHTML = asr;
        nextTimeMaghrib.innerHTML = maghrib;
        nextTimeIsha.innerHTML = isha;

        //seting now's value
        fajrTime.innerHTML = fajr;
        shurooqTime.innerHTML = shurooq;
        dhuhrTime.innerHTML = dhuhr;
        asrTime.innerHTML = asr;
        maghribTime.innerHTML = maghrib;
        ishaTime.innerHTML = isha;

        //seting date value
        dayDate.innerHTML = time;

        //seting active class
        if (
          userSelectedTime.isSameOrAfter(compare_asr) &&
          userSelectedTime < compare_maghrib
        ) {
          asrTime.parentElement.parentElement.classList.add("active");
        } else if (
          userSelectedTime.isSameOrAfter(compare_dhuhr) &&
          userSelectedTime < compare_asr
        ) {
          dhuhrTime.parentElement.parentElement.classList.add("active");
        } else if (
          userSelectedTime.isSameOrAfter(compare_fajr) &&
          userSelectedTime < compare_shurooq
        ) {
          fajrTime.parentElement.parentElement.classList.add("active");
        } else if (
          userSelectedTime.isSameOrAfter(compare_shurooq) &&
          userSelectedTime < compare_dhuhr
        ) {
          shurooqTime.parentElement.parentElement.classList.add("active");
        } else if (
          userSelectedTime.isSameOrAfter(compare_isha) &&
          userSelectedTime > compare_fajr
        ) {
          ishaTime.parentElement.parentElement.classList.add("active");
        } else if (
          userSelectedTime.isSameOrAfter(compare_maghrib) &&
          userSelectedTime < compare_isha
        ) {
          maghribTime.parentElement.parentElement.classList.add("active");
        } else if (
          userSelectedTime.isSameOrBefore(compare_isha) &&
          userSelectedTime < compare_fajr
        ) {
          ishaTime.parentElement.parentElement.classList.add("active");
        }
      });
      timeout = true;
      let nextCounter = document.querySelector(".next");
      nextCounter.innerHTML = "";
      ff = setTimeout(() => {
        const prayers = document.querySelector(".time-carts");
        let activePrayer;
        let activePrayerNextSibling;
        for (const e of prayers.children) {
          if (e.classList.contains("active")) {
            activePrayer = e;
            let activePrayerT = activePrayer.children[0].innerText; //.slice(0, -2)
            let activePrayerTi = activePrayerT.slice(-7); //.slice(0, -2)
            let activePrayerTime = moment(activePrayerTi, "h:mm A").format(
              "HH:mm"
            );
            activePrayerNextSibling = activePrayer.nextElementSibling;
            if (!activePrayerNextSibling) {
              activePrayerNextSibling =
                activePrayer.parentNode.firstElementChild;
            }
            const nextTime = document.querySelector(".next-time");
            const nextTimeData =
              activePrayerNextSibling.getAttribute("data-prayer-name");
            let nextPrayerD = activePrayerNextSibling.children;
            let nextPrayerDa = nextPrayerD[0].innerText.slice(-7);
            let nextPrayerDate = moment(nextPrayerDa, "h:mm A").format("HH:mm");
            nextTime.textContent = nextTimeData;
            const nextPrayers = document.querySelector(".prayer");
            for (const i of nextPrayers.children) {
              if (i.getAttribute("data-prayer-name").includes(nextTimeData)) {
                i.classList.add("pr-active");
                break;
              }
            }
            // // curent time
            let currentTime = moment(`${userTime}`, "HH:mm a");
            // // next time
            let nextPrayerTime = moment(`${nextPrayerDate}`, "HH:mm a");
            let diff = nextPrayerTime.diff(currentTime);
            if (diff < 0) {
              diff = currentTime.diff(nextPrayerTime.add(1, "day")) * -1;
            }
            let diffInMinutes = diff / 60000; // convert milliseconds to minutes
            let span = document.createElement("span");
            let countdown = moment.duration(diffInMinutes, "minutes");
            sss(countdown);
            makeSuccess("Success");
            break;
          }
        }
      }, 400);
    })
    .catch(function (error) {
      console.log(error);
      makeError("Please Enter A Valid City");
      getPrayersAuto();
    });
};
