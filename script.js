<script>
  const onlineURL = "https://moda48130-cloud.github.io/mssg/mock_online.json";
  const jackpotURL = "https://moda48130-cloud.github.io/mssg/mock_jackpot.json";

  async function updateTicker() {
    try {
      const [onlineRes, jackpotRes] = await Promise.all([
        fetch(onlineURL).then(r => r.json()),
        fetch(jackpotURL).then(r => r.json())
      ]);

      // ✅ ตรวจสอบ key ที่ใช้ใน mock JSON
      const onlineList = onlineRes.list || onlineRes.online || ["Guest01", "Guest02"];
      const jackpotList = jackpotRes.list || jackpotRes.jackpot || ["฿1,000", "฿2,500"];

      // ✅ รวมข้อมูลเป็นข้อความ ticker
      const tickerItems = [
        ...onlineList.map(name => `🎮 ${name}`),
        ...jackpotList.map(prize => `💰 ${prize}`)
      ];

      // ✅ อัปเดต DOM
      document.getElementById("ticker-slide").textContent = tickerItems.join(" • ");
    } catch {
      document.getElementById("ticker-slide").textContent = "ไม่สามารถโหลดข้อมูลได้";
    }
  }

  // ✅ เรียกใช้งานครั้งแรก และตั้ง auto-refresh
  updateTicker();
  setInterval(updateTicker, 30000); // รีเฟรชทุก 30 วินาที
</script>
