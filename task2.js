let leadForm = document.getElementById("leadForm");
let name = document.getElementById("name");
let phone = document.getElementById("phone");
let course_services = document.getElementById("course_services");
let preferredTime = document.getElementById("preferredTime");
let status = document.getElementById("status");
let submit = document.getElementById("submit");
let totalLeadsList = document.getElementById("totalLeadsList");
let newLeadsList = document.getElementById("newLeadsList");
let contactedLeadsList = document.getElementById("contactedLeadsList");
let searchName =document.getElementById("searchName");
//    setItem in localstorage
leadForm.addEventListener("submit", formInputs);
function formInputs(event) {
  event.preventDefault();
  let lead = {
    name: name.value,
    phone: phone.value,
    course_services: course_services.value,
    preferredTime: preferredTime.value,
    status: status.value,
  };
  let getDataFromLs = localStorage.getItem("leads");
  let leads = getDataFromLs ? JSON.parse(getDataFromLs) : [];
  leads.push(lead);
  localStorage.setItem("leads", JSON.stringify(leads));
  leadForm.reset();
  displayLeads();
};
  function displayLeads() {
    let dataForTotalLead = localStorage.getItem("leads");
    let arr = dataForTotalLead ? JSON.parse(dataForTotalLead) : [];

    // Important:
    // Purana HTML clear karo
    totalLeadsList.innerHTML = "";
    newLeadsList.innerHTML = "";
    contactedLeadsList.innerHTML = "";

   
   

    // store data in total lead table
    arr.forEach((item) => {
      totalLeadsList.innerHTML += `
            <div class="lead-item">
              <div class="lead-info">
                <h4>${item.name}</h4>
                <p><i class="fa-solid fa-phone"></i> +91 ${item.phone}</p>
                <p><i class="fa-solid fa-book"></i> ${item.course_services}</p>
                <p><i class="fa-regular fa-clock"></i> ${item.preferredTime}</p>
                <p><i class="fa-regular fa-clock"></i>${item.status}</p>
              </div>
               <div class="lead-actions">                
                 <button class="btn-delete" title="Delete Lead">
                   <i class="fa-solid fa-trash"></i>
                 </button>
               </div>
            </div>
        `;
    });
    // new list
    let newarr = arr.filter((item) => item.status === "new");
    newarr.forEach((item) => {
      newLeadsList.innerHTML += `
            <div class="lead-item">
              <div class="lead-info">
                <h4>${item.name}</h4>
                <p><i class="fa-solid fa-phone"></i> +91 ${item.phone}</p>
                <p><i class="fa-solid fa-book"></i> ${item.course_services}</p>
                <p><i class="fa-regular fa-clock"></i>${item.preferredTime}</p>
                <p><i class="fa-regular fa-clock"></i>${item.status}</p>
                
              </div>
              <div class="lead-actions">
                <span class="badge badge-yellow">Pending Call</span>
                <button class="btn-delete" title="Delete Lead">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>`;
    });
    // connected lead
    let connected = arr.filter((item) => item.status === "contacted");
    connected.forEach((item) => {
      contactedLeadsList.innerHTML += `
            <div class="lead-item">
              <div class="lead-info">
                <h4>${item.name}</h4>
                <p><i class="fa-solid fa-phone"></i> +91 ${item.phone}</p>
                <p><i class="fa-solid fa-book"></i> ${item.course_services}</p>
                <p><i class="fa-regular fa-clock"></i>${item.preferredTime}</p>
                <p><i class="fa-regular fa-clock"></i>${item.status}</p>
                
              </div>
              <div class="lead-actions">
                <span class="badge badge-yellow">Pending Call</span>
                <button class="btn-delete" title="Delete Lead">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>`;
    });
  }
displayLeads()
