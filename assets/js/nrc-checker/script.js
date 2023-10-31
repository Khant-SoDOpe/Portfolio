function searchNRC() {
    var input = document.getElementById("input").value;
    var output = document.getElementById("output");
  
    // Check if the input is empty or contains only whitespace
    if (input.trim() === "") {
      // Clear the output when there's no input
      output.innerHTML = "";
      return;
    }
  
    fetch('assets/data/nrc-data/data.json')
      .then(response => response.json())
      .then(data => {
        var entries = data.data;
        var matchingEntries = entries.filter(e => e.nrc_code === input || extractTextWithinParentheses(e.name_mm) === input || e.city_name === input);
        if (matchingEntries.length > 0) {
          var matchingInfo = matchingEntries.map(e => "<tr><td>" + e.nrc_code + "</td><td>" + extractTextWithinParentheses(e.name_mm) + "</td><td>" + e.city_name + "</td></tr>");
          output.innerHTML = "<div class='scrollable-table'><table><tr><th>NRC Code</th><th>NRC Name</th><th>City Name</th></tr>" + matchingInfo.join("") + "</table></div>";
        } else {
          // Clear the output when there are no matching entries
          output.innerHTML =  "No matching entry found.";
        }
      })
      .catch(error => {
        console.log('Error:', error);
        output.innerHTML = "Error fetching data.";
      });
  }
  
      function extractTextWithinParentheses(text) {
        var matches = text.match(/\((.*?)\)/);
        if (matches && matches.length > 0) {
          return matches[1];
        }
        return "";
      }