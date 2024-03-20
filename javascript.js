document.addEventListener("DOMContentLoaded", function() 
{
    var registrationForm = document.querySelector("form");
    if (registrationForm) 
    {
        registrationForm.addEventListener("submit", function(event) 
        {
            event.preventDefault();
            var email = registrationForm.querySelector('input[type="email"]').value;
            var password = registrationForm.querySelector('input[type="password"]').value;
            var passwordRepeat = registrationForm.querySelectorAll('input[type="password"]')[1].value;
            var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
            var errors = [];
            if (!emailRegex.test(email)) 
            {
                errors.push("Invalid email format.");
            }
            if (!passwordRegex.test(password)) 
            {
                errors.push("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.");
            }
            if (password !== passwordRepeat) 
            {
                errors.push("Passwords do not match.");
            }
            if (errors.length > 0) 
            {
                alert(errors.join("\n"));
            } 
            else 
            {
                var userData = 
                {
                    email: email,
                    password: password
                };
                document.cookie = "userData=" + JSON.stringify(userData) + "; max-age=" + (60 * 60);
                window.location.href = "userPage.html";
            }
        });
    }
    var detailPageForm = document.querySelector("#detail-page-form");
    if (detailPageForm) 
    {
        var userData = getCookie("userData");
        if (userData) 
        {
            userData = JSON.parse(userData);
            detailPageForm.querySelector('input[name="name"]').value = userData.name || "";
            detailPageForm.querySelector('input[name="surname"]').value = userData.surname || "";
            detailPageForm.querySelector('input[name="birth_year"]').value = userData.birth_year || "";
            detailPageForm.querySelector('select[name="gender"]').value = userData.gender || "";
            detailPageForm.querySelector('input[name="phone"]').value = userData.phone || "";
            detailPageForm.querySelector('input[name="skype"]').value = userData.skype || "";
        } 
        else 
        {
            window.location.href = "registration.html";
        }
    }
    function getCookie(name) 
    {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) 
        {
            var cookie = cookies[i].trim();
            if (cookie.startsWith(name + "=")) 
            {
                return cookie.substring(name.length + 1);
            }
        }
        return "";
    }
});
