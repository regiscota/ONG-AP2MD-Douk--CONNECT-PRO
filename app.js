function showSection(id, btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active-page'));
  const target=document.getElementById(id);
  if(target) target.classList.add('active-page');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  if(btn) btn.classList.add('active');
  document.getElementById('sidebar').classList.remove('sidebar-open');
  window.scrollTo({top:0,behavior:'smooth'});
}
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('sidebar-open')}
document.getElementById('year').textContent=new Date().getFullYear();
