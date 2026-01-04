// CEK LOGIN
auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html";
    } else {
        loadGroups();
    }
});

// BUAT GRUP
function createGroup() {
    const name = document.getElementById("groupName").value;

    if (name === "") {
        alert("Nama grup tidak boleh kosong");
        return;
    }

    db.collection("groups").add({
        name: name,
        createdBy: auth.currentUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            document.getElementById("groupName").value = "";
        });
}

// LOAD DAFTAR GRUP
function loadGroups() {
    db.collection("groups")
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
            const list = document.getElementById("groupList");
            list.innerHTML = "";

            snapshot.forEach(doc => {
                const group = doc.data();

                const li = document.createElement("li");
                li.className = "group-item";
                li.innerHTML = `
                <div class="group-text">
                <strong>${group.name}</strong>
                </div>
                <button class="btn-masuk" onclick="openChat('${doc.id}')">
                Masuk
                </button>`;

                list.appendChild(li);
            });
        });
}

// MASUK CHAT
function openChat(groupId) {
    window.location.href = `chat.html?id=${groupId}`;
}

// LOGOUT
function logout() {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
}