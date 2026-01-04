// ============================
// AMBIL ID GRUP
// ============================
const params = new URLSearchParams(window.location.search);
const groupId = params.get("id");

if (!groupId) {
    alert("Group tidak ditemukan");
    window.location.href = "home.html";
}

// ============================
// ELEMENT
// ============================
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const groupTitle = document.getElementById("groupTitle");

// ============================
// VARIABEL GLOBAL USER
// ============================
let myUid = "";
let myUsername = "";

// ============================
// CEK LOGIN
// ============================
auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    myUid = user.uid;

    // AMBIL USERNAME DARI FIRESTORE
    db.collection("users").doc(user.uid).get()
        .then(doc => {
            if (!doc.exists) {
                alert("Data user tidak ditemukan");
                return;
            }

            myUsername = doc.data().username;

            loadGroupName();
            listenMessages();
        });
});

// ============================
// LOAD NAMA GRUP
// ============================
function loadGroupName() {
    db.collection("groups").doc(groupId).get()
        .then(doc => {
            if (doc.exists) {
                groupTitle.innerText = doc.data().name;
            } else {
                alert("Grup tidak ditemukan");
                window.location.href = "home.html";
            }
        });
}

// ============================
// REALTIME CHAT
// ============================
function listenMessages() {
    db.collection("groups")
        .doc(groupId)
        .collection("messages")
        .orderBy("createdAt")
        .onSnapshot(snapshot => {
            messagesDiv.innerHTML = "";

            snapshot.forEach(doc => {
                const msg = doc.data();

                const bubble = document.createElement("div");
                bubble.classList.add("message");

                bubble.classList.add(
                    msg.senderId === myUid ? "sent" : "received"
                );

                const time = msg.createdAt
                    ? msg.createdAt.toDate().toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit"
                    })
                    : "";

                bubble.innerHTML = `
                <div class="sender-name">${msg.senderName}</div>
                
                <div class="message-text">
                ${msg.text}
                </div>
                
                <div class="message-footer">
                <span></span>
                <span class="message-time">${time}</span>
                </div>
                `;

                messagesDiv.appendChild(bubble);
            });

            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });
}

// ============================
// KIRIM PESAN
// ============================
function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") return;

    db.collection("groups")
        .doc(groupId)
        .collection("messages")
        .add({
            text: text,
            senderId: myUid,
            senderName: myUsername, // ⬅️ USERNAME
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            messageInput.value = "";
        });
}

// ============================
// KEMBALI KE HOME
// ============================
function goHome() {
    window.location.href = "home.html";
}