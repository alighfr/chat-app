function register() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || email === "" || password === "") {
        alert("Semua field wajib diisi");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            // SIMPAN USERNAME KE FIRESTORE
            return db.collection("users").doc(cred.user.uid).set({
                username: username,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            alert("Register berhasil");
            window.location.href = "index.html";
        })
        .catch(err => alert(err.message));
}

function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "home.html";
        })
        .catch(err => alert(err.message));
}