const API = 'http://localhost:5000/api/blogs';
let allPosts = [];

async function loadPosts() {
    try {
        const res = await fetch(API);
        if(!res.ok) throw new Error("API Error");
        allPosts = await res.json();
        updateStats();
        renderPosts(allPosts);
    } catch (e) {
        console.error("Failed to load:", e);
    }
}

function updateStats() {
    const stats = {
        totalCount: allPosts.length,
        jobCount: allPosts.filter(p => p.category === 'Latest Jobs').length,
        admitCount: allPosts.filter(p => p.category === 'Admit Card').length,
        resultCount: allPosts.filter(p => p.category === 'Results').length
    };
    for (let id in stats) {
        const el = document.getElementById(id);
        if(el) el.textContent = stats[id];
    }
}

function renderPosts(posts) {
    const grid = document.getElementById('postsGrid');
    if(!grid) return;
    grid.innerHTML = posts.map(post => `
        <div class="post-card">
            <div class="card-top">
                <span class="cat-tag">${post.category}</span>
                <h3>${post.title}</h3>
            </div>
            <div class="card-footer">
                <button onclick="openModal('${post._id}')">Read More</button>
            </div>
        </div>
    `).join('');
}

function openModal(id) {
    const post = allPosts.find(p => p._id === id);
    if(!post) return;
    document.getElementById('modalTitle').textContent = post.title;
    document.getElementById('modalBody').innerHTML = post.content || '';
    document.getElementById('modalBg').style.display = 'flex';
}

function closeModalBtn() {
    document.getElementById('modalBg').style.display = 'none';
}

// Start
loadPosts();