const sidebarToggle = document.querySelectorAll(".sidebarToggle")[0];
if (sidebarToggle) {
 sidebarToggle.addEventListener("click", (event) => {
  console.log("clicked");
  event.preventDefault();
  document.body.classList.toggle("sb-sidenav-toggled");
  localStorage.setItem(
   "sb|sidebar-toggle",
   document.body.classList.contains("sb-sidenav-toggled")
  );
 });
}
