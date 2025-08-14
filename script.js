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
  fetchOnline();
  fetchJackpot();
  setInterval(fetchOnline, 10000);
  setInterval(fetchJackpot, 10000);
})();
//(function () {
  let refreshInterval = 10000; // ค่าเริ่มต้น 10 วินาที
    let refreshTimer;
    
      function fetchMockData() {
          fetch('mock_online.json')
                .then(res => res.json())
                      .then(data => {
                              document.getElementById('online-count').textContent = data.online;
                                    })
                                          .catch(() => {
                                                  document.getElementById('online-count').textContent = 'ไม่สามารถโหลดข้อมูลได้';
                                                        });

                                                            fetch('mock_jackpot.json')
                                                                  .then(res => res.json())
                                                                        .then(data => {
                                                                                document.getElementById('jackpot-amount').textContent = data.jackpot;
                                                                                        document.getElementById('jackpot-time').textContent = new Date().toLocaleString('th-TH');
                                                                                              })
                                                                                                    .catch(() => {
                                                                                                            document.getElementById('jackpot-amount').textContent = 'ไม่สามารถโหลดข้อมูลได้';
                                                                                                                  });
                                                                                                                    }

                                                                                                                      function startAutoRefresh() {
                                                                                                                          clearInterval(refreshTimer);
                                                                                                                              fetchMockData(); // โหลดทันที
                                                                                                                                  refreshTimer = setInterval(fetchMockData, refreshInterval);
                                                                                                                                    }

                                                                                                                                      document.getElementById('apply-options').addEventListener('click', () => {
                                                                                                                                          const selected = document.getElementById('refresh-interval').value;
                                                                                                                                              refreshInterval = parseInt(selected, 10);
                                                                                                                                                  startAutoRefresh();
                                                                                                                                                    });

                                                                                                                                                      // เริ่มต้นเมื่อโหลดหน้า
                                                                                                                                                        startAutoRefresh();
                                                                                                                                                        })();