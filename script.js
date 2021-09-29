const dateInput = document.querySelector("#date-input");
const checkBtn = document.querySelector("#check-btn");
const outputDiv = document.querySelector("#output");

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function showOutput(message) {
  outputDiv.firstElementChild.innerHTML = message;
  outputDiv.classList.add("show");
}

function reverseDate(dateString) {
  return dateString.split("").reverse().join("");
}

function isPalindrome(date) {
  return date === reverseDate(date);
}

function convertDateToString(date) {
  const dateString = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateString.day = "0" + date.day;
  } else {
    dateString.day = date.day.toString();
  }

  if (date.month < 10) {
    dateString.month = "0" + date.month;
  } else {
    dateString.month = date.month.toString();
  }

  dateString.year = date.year.toString();
  return dateString;
}

function formatDate(date) {
  let ddmmyyyy = date.day + date.month + date.year;
  let mmddyyyy = date.month + date.day + date.year;
  let yyyymmdd = date.year + date.month + date.day;
  let ddmmyy = date.day + date.month + date.year.slice(-2);
  let mmddyy = date.month + date.day + date.year.slice(-2);
  let yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function isPalindromeForAllFormats(date) {
  const formattedDates = formatDate(date);
  const palindromeList = [];
  for (let formatDate of formattedDates) {
    palindromeList.push(isPalindrome(formatDate));
  }
  return palindromeList;
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  let nextDate = getNextDate(date);
  let counter = 0;

  while (1) {
    counter++;
    let dateString = convertDateToString(nextDate);
    let resultList = isPalindromeForAllFormats(dateString);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [counter, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function getPreviousDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousPalindromeDate(date) {
  let previousDate = getPreviousDate(date);
  let counter = 0;

  while (1) {
    counter++;
    let dateString = convertDateToString(previousDate);
    const resultList = isPalindromeForAllFormats(dateString);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [counter, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
}

function palindromeClickHandler() {
  let birthday = dateInput.value;

  if (!birthday) {
    showOutput("Enter your birthday!!");
  } else {
    var date = birthday.split("-");
    let yyyy = date[0];
    let mm = date[1];
    let dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    };

    let dateString = convertDateToString(date);
    let palindromeList = isPalindromeForAllFormats(dateString);
    let isPalindrome = false;

    for (let i = 0; i < palindromeList.length; i++) {
      if (palindromeList[i]) {
        isPalindrome = true;
        break;
      }
    }

    if (!isPalindrome) {
      const [counter1, nextDate] = getNextPalindromeDate(date);
      const [counter2, prevDate] = getPreviousPalindromeDate(date);
      const formattedNextDate = convertDateToString(nextDate);
      const formattedPrevDate = convertDateToString(prevDate);

      if (counter1 > counter2) {
        showOutput(
          `Oops! you missed by ${counter2} days. The nearest palindrome day is <em>${formattedPrevDate.day}-${formattedPrevDate.month}-${formattedPrevDate.year}</em>.`
        );
      } else {
        showOutput(
          `Oops! you missed by ${counter1} days. The nearest palindrome day is <em>${formattedNextDate.day}-${formattedNextDate.month}-${formattedNextDate.year}</em>.`
        );
      }
    } else {
      showOutput("Yay! Your birthday is palindrome!");
    }
  }
}

checkBtn.addEventListener("click", palindromeClickHandler);