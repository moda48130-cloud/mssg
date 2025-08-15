(function() {
  var interval = 10000;
  var timerOnline, timerJackpot;

  function updateStats() {
    fetchOnline();
    fetchJackpot();
  }

  function fetchOnline() {
    fetch('mock_online.json')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        document.getElementById('online-count').textContent = (typeof data.online !== "undefined") ? data.online : "N/A";
      })
      .catch(function() {
        document.getElementById('online-count').textContent = "N/A";
      });
  }

  function fetchJackpot() {
    fetch('mock_jackpot.json')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        document.getElementById('jackpot-amount').textContent = (typeof data.jackpot !== "undefined") ? data.jackpot : "N/A";
        // ใช้เวลาปัจจุบันแทน
        var now = new Date();
        var formatted = now.toLocaleString('th-TH', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        document.getElementById('jackpot-time').textContent = formatted;
      })
      .catch(function() {
        document.getElementById('jackpot-amount').textContent = "N/A";
        document.getElementById('jackpot-time').textContent = "N/A";
      });
  }

  var reviews = [];
  var reviewIndex = 0;

  function fetchReviews() {
    fetch('mock_review.json')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        reviews = Array.isArray(data.reviews) ? data.reviews : [];
        rotateReview();
      })
      .catch(function() {
        reviews = ["ไม่สามารถโหลดรีวิวได้"];
        rotateReview();
      });
  }

  function rotateReview() {
    var el = document.getElementById('user-review');
    if (el && reviews.length > 0) {
      el.textContent = reviews[reviewIndex];
      reviewIndex = (reviewIndex + 1) % reviews.length;
    }
  }

  function startAutoRefresh() {
    clearInterval(timerOnline);
    clearInterval(timerJackpot);
    timerOnline = setInterval(fetchOnline, interval);
    timerJackpot = setInterval(fetchJackpot, interval);
  }

  document.getElementById('apply-options').onclick = function() {
    var val = parseInt(document.getElementById('refresh-interval').value, 10);
    if (!isNaN(val) && val >= 5) {
      interval = val * 1000;
      startAutoRefresh();
    }
  };

  updateStats();
  startAutoRefresh();
  fetchReviews();
  setInterval(rotateReview, 7000);
  fetchOnline();
  fetchJackpot();
  setInterval(fetchOnline, 10000);
  setInterval(fetchJackpot, 10000);
})();
//function updateTime() {
  const now = new Date();
  const optionsDate = {
    timeZone: 'Asia/Bangkok',
      day: 'numeric',
        month: 'long',
          year: 'numeric'
          };
          const optionsTime = {
            timeZone: 'Asia/Bangkok',
              hour: '2-digit',
                minute: '2-digit',
                  second: '2-digit',
                    hour12: false
                    };

                    const dateThai = now.toLocaleDateString('th-TH', optionsDate);
                    const timeThai = now.toLocaleTimeString('th-TH', optionsTime);
                    document.getElementById('date').textContent = dateThai;
                    document.getElementById('time').textContent = timeThai;
                    fetch('assets/mock_online.json')
                      .then(response => response.json())
                        .then(data => {
                            const rawTime = new Date(data.last_updated);
                                const options = {
                                      timeZone: 'Asia/Bangkok',
                                            year: 'numeric',
                                                  month: 'long',
                                                        day: 'numeric',
                                                              hour: '2-digit',
                                                                    minute: '2-digit',
                                                                          second: '2-digit',
                                                                                hour12: false
                                                                                    };
                                                                                        const formattedTime = rawTime.toLocaleString('th-TH', options);
                                                                                            document.getElementById('lastUpdated').textContent = formattedTime + ' น.';
                                                                                              });
                                                                                              function updateLiveTimestamp() {
                                                                                                  const now = new Date();
                                                                                                    const options = {
                                                                                                        timeZone: 'Asia/Bangkok',
                                                                                                            year: 'numeric',
                                                                                                                month: 'long',
                                                                                                                    day: 'numeric',
                                                                                                                        hour: '2-digit',
                                                                                                                            minute: '2-digit',
                                                                                                                                second: '2-digit',
                                                                                                                                    hour12: false
                                                                                                                                      };
                                                                                                                                        const formatted = now.toLocaleString('th-TH', options);
                                                                                                                                          document.getElementById('lastUpdated').textContent = formatted + ' น.';
                                                                                                                                          }

                                                                                                                                          updateLiveTimestamp(); // โหลดครั้งแรก
                                                                                                                                          setInterval(updateLiveTimestamp, 1000); // อัปเดตทุกวินาที
                                                                                              }