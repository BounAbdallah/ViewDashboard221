import { Chart } from "@/components/ui/chart"
// Variables globales
let currentModal = null
let currentSchool = "all"

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  initializeCharts()
  setupEventListeners()
  loadInitialData()
})

// Configuration des événements
function setupEventListeners() {
  // Menu mobile
  const menuToggle = document.getElementById("menu-toggle")
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleSidebar)
  }

  // Sélecteur d'école
  const schoolSelector = document.getElementById("schoolSelector")
  if (schoolSelector) {
    schoolSelector.addEventListener("change", handleSchoolChange)
  }

  // Fermeture des modals en cliquant à l'extérieur
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal()
    }
  })

  // Gestion responsive
  window.addEventListener("resize", handleResize)
}

// Gestion du menu mobile
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar")
  if (sidebar) {
    sidebar.classList.toggle("active")
  }
}

function handleResize() {
  const sidebar = document.getElementById("sidebar")
  if (window.innerWidth >= 768 && sidebar) {
    sidebar.classList.remove("active")
  }
}

// Gestion des écoles
function handleSchoolChange(event) {
  currentSchool = event.target.value
  updateDashboardData(currentSchool)
  showNotification("École sélectionnée mise à jour", "info")
}

function updateDashboardData(schoolId) {
  // Simulation de mise à jour des données
  console.log("Mise à jour des données pour l'école:", schoolId)

  // Ici, vous ajouteriez la logique pour filtrer les données
  // selon l'école sélectionnée
}

// Gestion des modals
function showModal(modalId) {
  closeModal() // Fermer tout modal ouvert
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("active")
    currentModal = modalId
    document.body.style.overflow = "hidden"
  }
}

function closeModal() {
  if (currentModal) {
    const modal = document.getElementById(currentModal)
    if (modal) {
      modal.classList.remove("active")
    }
    currentModal = null
    document.body.style.overflow = "auto"
  }
}

// Fonctions spécifiques aux modals
function showAddSchoolModal() {
  showModal("addSchoolModal")
}

function showAddTeacherModal() {
  showModal("addTeacherModal")
}

function showImportModal() {
  showModal("importModal")
}

function showNotifications() {
  showModal("notificationModal")
}

// Gestion des enseignants
function showTeacherProfile(teacherId) {
  console.log("Affichage du profil de l'enseignant:", teacherId)
  showNotification("Profil de l'enseignant chargé", "success")
}

function editTeacher(teacherId) {
  console.log("Modification de l'enseignant:", teacherId)
  showNotification("Mode édition activé", "info")
}

function exportTeachers() {
  console.log("Export des enseignants en cours...")
  showNotification("Export en cours...", "info")

  // Simulation d'export
  setTimeout(() => {
    showNotification("Export terminé avec succès", "success")
  }, 2000)
}

// Gestion des écoles
function showSchoolDetails(schoolId) {
  console.log("Affichage des détails de l'école:", schoolId)
  showNotification("Détails de l'école chargés", "success")
}

function editSchool(schoolId) {
  console.log("Modification de l'école:", schoolId)
  showNotification("Mode édition activé", "info")
}

// Système de notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `

  document.body.appendChild(notification)

  // Auto-suppression après 5 secondes
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Initialisation des graphiques
function initializeCharts() {
  // Graphique des inscriptions (page d'accueil)
  const inscriptionsCtx = document.getElementById("inscriptionsChart")
  if (inscriptionsCtx) {
    new Chart(inscriptionsCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
        datasets: [
          {
            label: "Inscriptions",
            data: [120, 150, 180, 220, 280, 320, 350, 380, 420, 450, 480, 520],
            borderColor: "#407CEE",
            backgroundColor: "rgba(64, 124, 238, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  }

  // Graphique de répartition par école
  const distributionCtx = document.getElementById("schoolDistributionChart")
  if (distributionCtx) {
    new Chart(distributionCtx, {
      type: "doughnut",
      data: {
        labels: ["École Les Palmiers", "Collège Excellence", "Lycée Moderne", "École Bilingue"],
        datasets: [
          {
            data: [856, 642, 789, 560],
            backgroundColor: ["#407CEE", "#F7B000", "#407CEE", "#F7B000"],
            borderWidth: 2,
            borderColor: "#ffffff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    })
  }

  // Graphique de performance des écoles (page écoles)
  const performanceCtx = document.getElementById("schoolPerformanceChart")
  if (performanceCtx) {
    new Chart(performanceCtx, {
      type: "bar",
      data: {
        labels: ["École Les Palmiers", "Collège Excellence", "Lycée Moderne", "École Bilingue"],
        datasets: [
          {
            label: "Taux de Réussite (%)",
            data: [94.5, 91.2, 88.7, 96.1],
            backgroundColor: "#407CEE",
          },
          {
            label: "Taux de Présence (%)",
            data: [96.2, 94.8, 92.1, 97.5],
            backgroundColor: "#F7B000",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    })
  }
}

// Chargement des données initiales
function loadInitialData() {
  console.log("Chargement des données initiales...")

  // Simulation de chargement
  setTimeout(() => {
    console.log("Données chargées avec succès")
  }, 1000)
}

// Fonctions utilitaires
function formatNumber(num) {
  return new Intl.NumberFormat("fr-FR").format(num)
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
  }).format(amount)
}

function formatDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

// Gestion des erreurs
window.addEventListener("error", (e) => {
  console.error("Erreur JavaScript:", e.error)
  showNotification("Une erreur est survenue", "error")
})

// Export des fonctions pour utilisation globale
window.MySchool = {
  showModal,
  closeModal,
  showNotification,
  showTeacherProfile,
  editTeacher,
  exportTeachers,
  showSchoolDetails,
  editSchool,
  showAddSchoolModal,
  showAddTeacherModal,
  showImportModal,
  showNotifications,
}
