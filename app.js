function getData() {

    const gitHubId = document.querySelector("#githubId").value.trim();
    const detailsDiv = document.querySelector("#details");

    if (!gitHubId) {
        detailsDiv.innerHTML =
            "<p>Please enter a valid GitHub username</p>";
        return;
    }

    
    let endPoint = `https://api.github.com/users/${gitHubId}`;

    let pr = fetch(endPoint);

    pr.then((response) => {

        console.log("first then running...");

        if (!response.ok) {
            throw new Error("GitHub user not found");
        }

        return response.json();

    }).then((user) => {

        console.log("User data:", user);

        let name = user.name;
        let company = user.company;
        let website = user.blog;
        let imgUrl = user.avatar_url;

     
        let img = document.createElement("img");
        img.src = imgUrl;
        img.width = 150;

    
        let pusername = document.createElement("p");
        pusername.innerHTML =
            `<strong>Username:</strong> ${name || user.login}`;

      
        let pcompany = document.createElement("p");
        pcompany.innerHTML =
            `<strong>Company:</strong> ${company || "Not available"}`;

      
        let pwebsite = document.createElement("p");

        if (website) {
            pwebsite.innerHTML =
                `<strong>Website:</strong>
                <a href="${website}" target="_blank">
                    ${website}
                </a>`;
        } else {
            pwebsite.innerHTML =
                `<strong>Website:</strong> Not available`;
        }

     
        detailsDiv.innerHTML = "";

      
        detailsDiv.appendChild(img);
        detailsDiv.appendChild(pusername);
        detailsDiv.appendChild(pcompany);
        detailsDiv.appendChild(pwebsite);

    }).catch((error) => {

        detailsDiv.innerHTML =
            `<p style="color:red;">❌ ${error.message}</p>`;

        console.log(error);
    });
}