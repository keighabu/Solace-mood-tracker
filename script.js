function updateDate() {
    const now = new Date();

    // Use 'en-PH' to ensure Philippine date formatting
    // This automatically handles the GMT+8 time zone logic for users in PH
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    const phDate = now.toLocaleDateString('en-PH', options);

    // Put the date into our HTML element
    document.getElementById('current-date').innerText = phDate;
}

// Run the function as soon as the page loads
updateDate();

const nameInput = document.getElementById('userName');
const startBtn = document.getElementById('startBtn');

nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length > 0) {
        startBtn.disabled = false;
        startBtn.style.opacity = "1";
        startBtn.style.cursor = "pointer";
        startBtn.style.backgroundColor = "#b8a494"; // Slightly darker when ready
    } else {
        startBtn.disabled = true;
        startBtn.style.opacity = "0.6";
        startBtn.style.cursor = "not-allowed";
        startBtn.style.backgroundColor = "#d2c1b1";
    }
});

// 2. Handle the click to go to the dashboard
startBtn.addEventListener('click', function() {
    if (!startBtn.disabled) {
        // Optional: Save the name to show it on the dashboard later
        localStorage.setItem('user_name', nameInput.value);
        
        // Go to the dashboard
        window.location.href = "dashboard.html";
    }
});

    function updateDashboard() {
        try {
            const welcomeMsg = document.getElementById('welcome-msg');
            const dateElement = document.getElementById('dashboard-date');
            const now = new Date();
            const hour = now.getHours();

            // 1. Date Logic
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            if(dateElement) {
                dateElement.innerText = now.toLocaleDateString('en-US', options);
            }

            // 2. Greeting Logic
            let greeting = "Good evening"; // Default since it's 8:17 PM
            if (hour < 12) greeting = "Good morning";
            else if (hour < 18) greeting = "Good afternoon";

            // 3. Name Logic
            const savedName = localStorage.getItem('user_name') || "Friend";

            // 4. THE HEART (Using .innerHTML is mandatory for the class to work)
            if(welcomeMsg) {
                welcomeMsg.innerHTML = `${greeting}, ${savedName} <span class="heart-icon">🤍</span>`;
            }
            
            console.log("Dashboard updated successfully!");
        } catch (error) {
            console.error("Script Error:", error);
        }
    }

    // Run the function
    updateDashboard();

    // 1. Define the quotes
    const myQuotes = [
        "Your potential is endless.",
        "Mistakes are proof you are trying.",
        "Focus on the step, not the mountain.",
        "You are doing better than you think.",
        "Small progress is still progress.",
        "Breathe. You are in a safe space."
    ];

    // 2. Define the function and attach it to window immediately
    window.refreshAffirmation = function() {
        console.log("Button clicked! Function is running.");
        const quoteElement = document.getElementById('affirmation-quote');
        
        if (quoteElement) {
            const randomIndex = Math.floor(Math.random() * myQuotes.length);
            // We use .textContent to avoid issues with extra HTML tags
            quoteElement.textContent = myQuotes[randomIndex];
            console.log("New quote set: " + myQuotes[randomIndex]);
        } else {
            console.error("Critical Error: Could not find element with ID 'affirmation-quote'");
        }
    };

    // 3. Optional: Run it once on load so it's not empty
    window.onload = function() {
        console.log("Page loaded. Affirmation system ready.");
    };
    document.getElementById('saveMoodBtn').addEventListener('click', () => {
    if (!selectedMood) {
        alert("Please pick a mood first!");
        return;
    }

    // 1. Get the existing history or create a new empty list
    let moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];

    // 2. Create the new entry with a timestamp
    const newEntry = {
        mood: selectedMood,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // 3. Add to the list and save back to memory
    moodHistory.push(newEntry);
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));

    // 4. Also update your dashboard counter
    let currentCount = parseInt(localStorage.getItem('moodCount')) || 0;
    localStorage.setItem('moodCount', currentCount + 1);

    window.location.href = 'dashboard.html';
});

    let selectedMood = ""; // This starts empty

    // This part listens for the click on the emojis
    document.querySelectorAll('.mood-btn').forEach(button => {
        button.addEventListener('click', function() {
            // 1. Remove 'selected' look from all other buttons
            document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
            
            // 2. Add 'selected' look to THIS button
            this.classList.add('selected');
            
            // 3. IMPORTANT: Update the variable so the Save button knows what you picked
            selectedMood = this.getAttribute('data-mood');
            console.log("Selected mood is now:", selectedMood);
        });
    });

    // NOW your Save button script will work because selectedMood isn't empty anymore
    document.getElementById('saveMoodBtn').addEventListener('click', () => {
        if (!selectedMood) {
            alert("Please select a mood first!");
            return;
        }
        // ... rest of your save logic
    });

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the data
    const history = JSON.parse(localStorage.getItem('moodHistory')) || [];
    const counts = { 0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0 };
    const moodCounts = {};
    const emojiMap = { 
        "Joyful": "🤩", "Calm": "😌", "Okay": "🙂", 
        "Meh": "😐", "Sad": "😢", "Angry": "😡", "Anxious": "😰" 
    };

    const breakdownContainer = document.getElementById('moodBreakdownList');
    const weekCountElement = document.getElementById('weekCount');

    // 2. Update Total Entries Card
    if (weekCountElement) {
        weekCountElement.innerText = history.length;
    }

    if (history.length > 0) {
        // 3. Process data for both Chart and Breakdown
        history.forEach(entry => {
            const d = new Date(entry.date);
            if (!isNaN(d.getTime())) {
                counts[d.getDay()]++;
            }
            moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
        });

        // 4. Inject Mood Breakdown (The layout you copied)
        breakdownContainer.innerHTML = Object.keys(moodCounts).map(mood => {
            const count = moodCounts[mood];
            const percentage = Math.round((count / history.length) * 100);
            const emoji = emojiMap[mood] || (/\p{Emoji}/u.test(mood) ? mood : "✨");

            return `
                <div class="breakdown-item">
                    <div class="breakdown-info">
                        <div class="breakdown-label">
                            <span style="font-size: 1.2rem;">${emoji}</span>
                            <span style="font-weight: 500;">${mood}</span>
                        </div>
                        <div class="breakdown-stats">
                            ${count} - ${percentage}%
                        </div>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }).join('');

        // 5. Update the Weekly Bar Chart (Vertical Bars)
        const maxEntriesForChart = 5; 
        Object.keys(counts).forEach(dayIndex => {
            const wrapper = document.querySelector(`.bar-wrapper[data-day="${dayIndex}"]`);
            if (wrapper) {
                const bar = wrapper.querySelector('.bar');
                const height = Math.min((counts[dayIndex] / maxEntriesForChart) * 100, 100);
                bar.style.height = height + "%";
            }
        });

    } else {
        if (breakdownContainer) {
            breakdownContainer.innerHTML = "<p style='color: #999; text-align: center; margin-top: 20px;'>No mood logs yet.</p>";
        }
    }
});


const heart = document.getElementById('breathingHeart');
const btn = document.getElementById('startBreathe');
const text = document.getElementById('instruction-text');

const phases = [
  { label: 'Inhale...', duration: 4000 },
  { label: 'Hold...', duration: 4000 },
  { label: 'Exhale...', duration: 4000 },
];

let running = false;
let phaseIndex = 0;
let timer = null;

function runPhase() {
  const phase = phases[phaseIndex];
  text.textContent = phase.label;

  clearTimeout(timer);
  timer = setTimeout(() => {
    phaseIndex = (phaseIndex + 1) % phases.length;
    runPhase();
  }, phase.duration);
}

btn.addEventListener('click', () => {
  if (!running) {
    running = true;
    btn.textContent = 'Stop';
    heart.classList.add('heart-active');
    phaseIndex = 0;
    runPhase();
  } else {
    running = false;
    btn.textContent = '▶ Begin';
    heart.classList.remove('heart-active');
    text.textContent = 'Ready when you are';
    clearTimeout(timer);
  }
});
// your existing code stays here...

// BOTTOM NAV - paste this at the bottom
const bottomNavHTML = `
<nav class="bottom-nav">
    <a href="dashboard.html" class="nav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
        <span>Home</span>
    </a>
    <a href="mood.html" class="nav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M8.5 14s1.5 2 3.5 2 3.5-2 3.5-2"/><circle cx="9" cy="10" r="0.5" fill="currentColor"/><circle cx="15" cy="10" r="0.5" fill="currentColor"/></svg>
        <span>Mood</span>
    </a>
    <a href="journal.html" class="nav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
        <span>Journal</span>
    </a>
    <a href="insights.html" class="nav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 20h18M5 20V10m4 10V4m4 16v-7m4 7v-3"/></svg>
        <span>Insights</span>
    </a>
    <a href="breathe.html" class="nav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6 2 3 7 3 12s3 10 9 10 9-5 9-10S18 2 12 2z"/><path d="M8 12c0-2 1.5-4 4-4s4 2 4 4-1.5 4-4 4-4-2-4-4z"/></svg>
        <span>Breathe</span>
    </a>
    <a href="help.html" class="nav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></svg>
        <span>Help</span>
    </a>
    <a href="profile.html" class="nav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0116 0v1"/></svg>
        <span>Profile</span>
    </a>
</nav>
`;

document.body.insertAdjacentHTML('beforeend', bottomNavHTML);

const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-item').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
}); 
