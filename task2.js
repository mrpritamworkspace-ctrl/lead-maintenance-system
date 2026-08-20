// DOM Elements
const leadForm = document.getElementById("leadForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const courseInput = document.getElementById("course_services");
const timeInput = document.getElementById("preferredTime");
const statusInput = document.getElementById("status");

const totalLeadsList = document.getElementById("totalLeadsList");
const newLeadsList = document.getElementById("newLeadsList");
const contactedLeadsList = document.getElementById("contactedLeadsList");

const searchName = document.getElementById("searchName");
const filterStatus = document.getElementById("filterStatus");

// LocalStorage Helper
function getLeads() {
  const data = localStorage.getItem("leads");
  return data ? JSON.parse(data) : [];
}

function saveLeads(leads) {
  localStorage.setItem("leads", JSON.stringify(leads));
}

// Add New Lead
leadForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newLead = {
    id: Date.now(), // Unique ID delete/update ke liye
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    course_services: courseInput.value,
    preferredTime: timeInput.value,
    status: statusInput.value,
  };

  const leads = getLeads();
  leads.push(newLead);
  saveLeads(leads);

  leadForm.reset();
  displayLeads();
});

// Delete Lead Function
function deleteLead(id) {
  let leads = getLeads();
  leads = leads.filter((item) => item.id !== id);
  saveLeads(leads);
  displayLeads();
}

// Status Change Function
function updateStatus(id, newStatus) {
  let leads = getLeads();
  leads = leads.map((item) => {
    if (item.id === id) item.status = newStatus;
    return item;
  });
  saveLeads(leads);
  displayLeads();
}

// Render Single Card HTML
function createLeadCardHTML(item, showBadge = false) {
  return `
    <div class="lead-item">
      <div class="lead-info">
        <h4>${item.name}</h4>
        <p><i class="fa-solid fa-phone"></i> +91 ${item.phone}</p>
        <p><i class="fa-solid fa-book"></i> ${item.course_services}</p>
        <p><i class="fa-regular fa-clock"></i> ${item.preferredTime}</p>
      </div>
      <div class="lead-actions">
        <select class="status-select" onchange="updateStatus(${item.id}, this.value)">
          <option value="new" ${item.status === "new" ? "selected" : ""}>New</option>
          <option value="contacted" ${item.status === "contacted" ? "selected" : ""}>Contacted</option>
        </select>
        <button class="btn-delete" title="Delete Lead" onclick="deleteLead(${item.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `;
}

// Display/Render Leads
function displayLeads() {
  const leads = getLeads();
  const searchVal = searchName.value.toLowerCase().trim();
  const statusVal = filterStatus.value;

  // Filter based on Search and Status Filter controls
  const filteredLeads = leads.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(searchVal);
    const matchesStatus = statusVal === "all" || item.status === statusVal;
    return matchesName && matchesStatus;
  });

  // Dynamic Counter Update
  document.querySelector(".border-total .count-tag").innerText = filteredLeads.length;
  document.querySelector(".border-new .count-tag").innerText = filteredLeads.filter(i => i.status === "new").length;
  document.querySelector(".border-contacted .count-tag").innerText = filteredLeads.filter(i => i.status === "contacted").length;

  // Clear lists
  totalLeadsList.innerHTML = "";
  newLeadsList.innerHTML = "";
  contactedLeadsList.innerHTML = "";

  // Render Total Leads
  if (filteredLeads.length === 0) {
    totalLeadsList.innerHTML = `<p class="empty-msg">No leads found</p>`;
  } else {
    filteredLeads.forEach((item) => {
      totalLeadsList.innerHTML += createLeadCardHTML(item);
    });
  }

  // Render New Leads
  const newLeads = filteredLeads.filter((item) => item.status === "new");
  if (newLeads.length === 0) {
    newLeadsList.innerHTML = `<p class="empty-msg">No new leads</p>`;
  } else {
    newLeads.forEach((item) => {
      newLeadsList.innerHTML += createLeadCardHTML(item);
    });
  }

  // Render Contacted Leads
  const contactedLeads = filteredLeads.filter((item) => item.status === "contacted");
  if (contactedLeads.length === 0) {
    contactedLeadsList.innerHTML = `<p class="empty-msg">No contacted leads</p>`;
  } else {
    contactedLeadsList.forEach((item) => {
      contactedLeadsList.innerHTML += createLeadCardHTML(item);
    });
  }
}

// Search & Filter Input Listeners
searchName.addEventListener("input", displayLeads);
filterStatus.addEventListener("change", displayLeads);

// Initial Load
displayLeads();
