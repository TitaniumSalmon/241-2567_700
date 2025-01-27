function submitData(){
    let firstNameDOMs = document.querySelector("input[name='firstname']");
    let lastNameDOMs = document.querySelector("input[name='lastname']");
    let ageDOMs = document.querySelector("input[name='age']");
    let genderDOMs = document.querySelector("input[name='gender']:checked");
    let interestDOMs = document.querySelectorAll("input[name='interest']:checked");
    let descriptionDOMs = document.querySelector("input[name='description']");

    let interest = '';
    for (let i = 0; i < interestDOMs.length; i++) {
            interest += interestDOMs[i].value;
            if (i != interestDOMs.length - 1) {
                interest += ',';
            }
    }

    let userData = {
        firstName: firstNameDOMs.value,
        lastName: lastNameDOMs.value,
        age: ageDOMs.value,
        gender: genderDOMs,
        interest: interest,
        description: descriptionDOMs
    }
    console.log("submitData", userData);
}