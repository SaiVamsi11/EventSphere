function animateValue(id, end, duration) {
    let start = 0;
    const element = document.getElementById(id);
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
  
    const timer = setInterval(() => {
      current += increment;
      element.textContent = current + '+';
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
  
  // Observer to detect when the stats section comes into view
  let hasAnimated = false;
  
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !hasAnimated) {
      hasAnimated = true;
  
      fetch('techclub-data-2025.json')
        .then(response => response.json())
        .then(data => {
          animateValue("members", data.members, 1000);
          animateValue("events", data.events, 1000);
          animateValue("talks", data.techTalks, 1000);
        });
    }
  }, {
    threshold: 0.5
  });
  
  // Start observing the section
  observer.observe(document.querySelector(".stats"));
  