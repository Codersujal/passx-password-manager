function maskPassword(pass) {
    return "*".repeat(pass.length);
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(() => {
        document.getElementById("alert").style.display = "inline";
        setTimeout(() => {
            document.getElementById("alert").style.display = "none";
        }, 2000);
    }).catch(() => {
        alert("Failed to copy to clipboard");
    });
}

const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let passwords = data ? JSON.parse(data) : [];

    let updatedPasswords = passwords.filter(item => item.website !== website);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));

    alert(`Password for ${website} deleted successfully.`);
    showPasswords();
}

const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    
    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = `<tr><th>Website</th><th>Username</th><th>Password</th><th>Delete</th></tr>
                        <tr><td colspan="4">No Data Available</td></tr>`;
    } else {
        tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`;
        
        let passwords = JSON.parse(data);
        passwords.forEach(({ website, username, password }) => {
            tb.innerHTML += `<tr>
                <td>${website} <img onclick="copyText('${website}')" src="./copy.svg" alt="Copy"></td>
                <td>${username} <img onclick="copyText('${username}')" src="./copy.svg" alt="Copy"></td>
                <td>${maskPassword(password)} <img onclick="copyText('${password}')" src="./copy.svg" alt="Copy"></td>
                <td><button class="btnsm" onclick="deletePassword('${website}')">Delete</button></td>
            </tr>`;
        });
    }

    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();

    let website = document.getElementById("website").value.trim();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!website || !username || !password) {
        alert("All fields are required.");
        return;
    }

    let storedData = localStorage.getItem("passwords");
    let passwords = storedData ? JSON.parse(storedData) : [];

    passwords.push({ website, username, password });
    localStorage.setItem("passwords", JSON.stringify(passwords));

    alert("Password saved successfully.");
    showPasswords();
});

showPasswords();
